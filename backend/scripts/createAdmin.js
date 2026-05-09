import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env
dotenv.config({ path: path.join(__dirname, "../.env") });

const createAdmin = async () => {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("Usage: node createAdmin.js <username> <password>");
        process.exit(1);
    }

    const [username, password] = args;

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            console.log(`Admin with username "${username}" already exists.`);
            process.exit(0);
        }

        await Admin.create({ username, password });
        console.log(`Admin "${username}" created successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();
