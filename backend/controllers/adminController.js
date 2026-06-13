import About from "../models/About.js";
import Hero from "../models/Hero.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Resume from "../models/Resume.js";
import Contact from "../models/Contact.js";
import Navbar from "../models/Navbar.js";
import Footer from "../models/Footer.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const updateAbout = async (req, res) => {
    try {
        const data = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        return successResponse(res, 200, data, "About updated");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const updateHero = async (req, res) => {
    try {
        const data = await Hero.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        return successResponse(res, 200, data, "Hero updated");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const createProject = async (req, res) => {
    try {
        const data = await Project.create(req.body);
        return successResponse(res, 201, data, "Project created");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const updateProject = async (req, res) => {
    try {
        const data = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return successResponse(res, 200, data, "Project updated");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        return successResponse(res, 200, null, "Project deleted");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const updateSkills = async (req, res) => {
    try {
        // Since the frontend sends an array of categories, we replace the entire skills collection
        await Skill.deleteMany({});
        const data = await Skill.insertMany(req.body);
        return successResponse(res, 200, data, "Skills updated");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const updateContact = async (req, res) => {
    try {
        const data = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        return successResponse(res, 200, data, "Contact updated");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const updateFooter = async (req, res) => {
    try {
        const data = await Footer.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        return successResponse(res, 200, data, "Footer updated");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const updateNavbar = async (req, res) => {
    try {
        const data = await Navbar.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        return successResponse(res, 200, data, "Navbar updated");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const updateResume = async (req, res) => {
    try {
        const data = await Resume.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        return successResponse(res, 200, data, "Resume updated");
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const uploadImage = async (req, res) => {
    if (!req.file) return errorResponse(res, 400, "No image uploaded");
    return successResponse(res, 200, { imageUrl: req.file.path }, "Image uploaded");
};

export const uploadResume = async (req, res) => {
    if (!req.file) return errorResponse(res, 400, "No resume uploaded");
    return successResponse(res, 200, { resumeUrl: req.file.path }, "Resume uploaded");
};

