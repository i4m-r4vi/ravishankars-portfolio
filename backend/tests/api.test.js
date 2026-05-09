import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

describe("Backend API Integration Tests", () => {
    
    // Close DB connection after tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Health Check: GET / should return 200", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe("API is running...");
    });

    test("Public API: GET /api/about should return 200 and data object", async () => {
        const res = await request(app).get("/api/about");
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(typeof res.body.data).toBe("object");
    });

    test("Auth API: POST /api/auth/login with invalid data should return 401 or 400", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ username: "wrong", password: "wrong" });
        
        // Should be 401 (Unauthorized) or potentially 400 if validation fails
        expect([401, 400]).toContain(res.statusCode);
        expect(res.body.success).toBe(false);
    });
});
