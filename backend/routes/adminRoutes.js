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
    updateResume,
    uploadImage,
    uploadResume
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

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

router.post("/upload/image", upload.single("image"), uploadImage);
router.post("/upload/resume", upload.single("resume"), uploadResume);

export default router;
