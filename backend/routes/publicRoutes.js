import express from "express";
import {
    getAbout,
    getHero,
    getProjects,
    getSkills,
    getResume,
    getContact,
    getNavbar,
    getFooter
} from "../controllers/publicController.js";

const router = express.Router();

router.get("/about", getAbout);
router.get("/hero", getHero);
router.get("/projects", getProjects);
router.get("/skills", getSkills);
router.get("/resume", getResume);
router.get("/contact", getContact);
router.get("/navbar", getNavbar);
router.get("/footer", getFooter);

export default router;
