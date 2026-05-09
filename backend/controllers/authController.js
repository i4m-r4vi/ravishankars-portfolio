import Admin from "../models/Admin.js";
import { successResponse, errorResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "30d",
    });
};

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (admin && (await admin.matchPassword(password))) {
            return successResponse(res, 200, {
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id),
            }, "Login successful");
        } else {
            return errorResponse(res, 401, "Invalid credentials");
        }
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

export const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminExists = await Admin.findOne({ username });

        if (adminExists) {
            return errorResponse(res, 400, "Admin already exists");
        }

        const admin = await Admin.create({ username, password });

        if (admin) {
            return successResponse(res, 201, {
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id),
            }, "Admin created successfully");
        } else {
            return errorResponse(res, 400, "Invalid admin data");
        }
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};
