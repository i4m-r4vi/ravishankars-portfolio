import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    resumeUrl: { type: String, required: true },
    version: { type: String },
    experiences: [{
        year: { type: String, required: true },
        role: { type: String, required: true },
        company: { type: String, required: true },
        desc: { type: String, required: true }
    }],
    courses: [{
        year: { type: String, required: true },
        title: { type: String, required: true },
        platform: { type: String, required: true },
        desc: { type: String },
        certificateUrl: { type: String }
    }]
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
