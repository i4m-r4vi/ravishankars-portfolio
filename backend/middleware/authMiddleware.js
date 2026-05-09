import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";
import Admin from "../models/Admin.js";
import { safeLog } from "../utils/logger.js";

export const protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.id).select("-password");
            if (!req.admin) {
                return errorResponse(res, 401, "Not authorized, user not found");
            }
            next();
        } else {
            return errorResponse(res, 401, "Not authorized, no token");
        }
    } catch (error) {
        const errorLog = String(error.stack || error.message);
        safeLog(errorLog);
        return errorResponse(res, 401, "Not authorized, token failed");
    }
};
