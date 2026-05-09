import About from "../models/About.js";
import Hero from "../models/Hero.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Resume from "../models/Resume.js";
import Contact from "../models/Contact.js";
import Navbar from "../models/Navbar.js";
import Footer from "../models/Footer.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Public APIs
export const getAbout = async (req, res) => {
    try {
        const data = await About.findOne() || {};
        return successResponse(res, 200, data);
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const getHero = async (req, res) => {
    try {
        const data = await Hero.findOne() || {};
        return successResponse(res, 200, data);
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const getProjects = async (req, res) => {
    try {
        const data = await Project.find();
        return successResponse(res, 200, data);
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const getSkills = async (req, res) => {
    try {
        const data = await Skill.find();
        return successResponse(res, 200, data);
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const getResume = async (req, res) => {
    try {
        const data = await Resume.findOne() || {};
        return successResponse(res, 200, data);
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const getContact = async (req, res) => {
    try {
        const data = await Contact.findOne() || {};
        return successResponse(res, 200, data);
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const getNavbar = async (req, res) => {
    try {
        const data = await Navbar.findOne() || {};
        return successResponse(res, 200, data);
    } catch (error) { return errorResponse(res, 500, error.message); }
};

export const getFooter = async (req, res) => {
    try {
        const data = await Footer.findOne() || {};
        return successResponse(res, 200, data);
    } catch (error) { return errorResponse(res, 500, error.message); }
};
