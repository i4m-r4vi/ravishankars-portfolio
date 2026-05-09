import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Included for initial setup if needed

export default router;
