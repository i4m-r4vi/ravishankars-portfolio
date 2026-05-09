import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
    text: { type: String, required: true },
    socialLinks: [{
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String }
    }]
}, { timestamps: true });

export default mongoose.model("Footer", footerSchema);
