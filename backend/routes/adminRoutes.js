import express from "express";
import {
    updateAbout,
    updateHero,
    createProject,
    updateProject,
    deleteProject,
    updateSkills,
    updateContact,
    updateFooter,
    updateNavbar,
    updateResume
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";
import { successResponse, errorResponse } from "../utils/response.js";

const router = express.Router();

router.use(protect); // Protect all admin routes

router.put("/about", updateAbout);
router.put("/hero", updateHero);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);
router.put("/skills", updateSkills);
router.put("/contact", updateContact);
router.put("/footer", updateFooter);
router.put("/navbar", updateNavbar);
router.put("/resume", updateResume);

router.post("/upload/image", upload.single("image"), (req, res) => {
    if (!req.file) return errorResponse(res, 400, "No image uploaded");
    return successResponse(res, 200, { imageUrl: req.file.path }, "Image uploaded");
});

router.post("/upload/resume", upload.single("resume"), (req, res) => {
    if (!req.file) return errorResponse(res, 400, "No resume uploaded");
    return successResponse(res, 200, { resumeUrl: req.file.path }, "Resume uploaded");
});

export default router;
