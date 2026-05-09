import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    category: { type: String, required: true },
    skills: [{
        name: { type: String, required: true },
        level: { type: Number, required: true }
    }]
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
