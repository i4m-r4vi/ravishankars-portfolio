#!/bin/bash

# Configuration
SOURCE_DIR="/home/ravi/ravishankars-portfolio"
BACKEND_DIR="$SOURCE_DIR/backend"
TARGET_DIR="/root/ravishankars-portfolio/backend"
PM2_MAIN_NAME="portfolio-api"
PM2_TEST_NAME="portfolio-api-test"
PROD_PORT=5000
TEST_PORT=5001

echo "--- Starting Pre-flight Deployment Check ---"

# 1. Pull latest changes
cd "$SOURCE_DIR" || { echo "Failed to enter source directory"; exit 1; }
echo "Pulling latest changes from main..."
git pull origin main

# 2. Install dependencies
cd "$BACKEND_DIR" || { echo "Failed to enter backend directory"; exit 1; }
echo "Installing dependencies..."
npm install --legacy-peer-deps

# 3. Start temporary instance on alternate port (TEST_PORT)
echo "Starting temporary test instance on port $TEST_PORT (DB connection skipped)..."
SKIP_DB=true PORT=$TEST_PORT pm2 start server.js --name "$PM2_TEST_NAME"

# 4. Health Check on alternate port
echo "Waiting for test instance to start (10 seconds)..."
sleep 10

echo "Performing health check on http://localhost:$TEST_PORT..."
HEALTH_CHECK_PASSED=false
if curl -s -f "http://localhost:$TEST_PORT/" > /dev/null; then
    echo "SUCCESS: Test instance is healthy on port $TEST_PORT."
    HEALTH_CHECK_PASSED=true
else
    echo "ERROR: Test instance failed health check on port $TEST_PORT."
fi

# 5. Turn off the test instance (as requested)
echo "Shutting down temporary test instance..."
pm2 delete "$PM2_TEST_NAME"

# 6. Proceed only if health check passed
if [ "$HEALTH_CHECK_PASSED" = true ]; then
    echo "--- Proceeding with Production Update ---"
    
    # Sync to root
    echo "Syncing updated files to root directory: $TARGET_DIR..."
    sudo rsync -avz --delete "$BACKEND_DIR/" "$TARGET_DIR/"
    
    # Restart Main Production Instance
    echo "Restarting main production server..."
    cd "$BACKEND_DIR" # Or TARGET_DIR if you run production from root
    pm2 restart "$PM2_MAIN_NAME" || pm2 start server.js --name "$PM2_MAIN_NAME"
    pm2 save
    
    echo "Deployment and sync to root completed successfully!"
else
    echo "CRITICAL: Deployment aborted because the new code failed health checks."
    exit 1
fi
