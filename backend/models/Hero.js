import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subheading: { type: String, required: true },
    typingTexts: [{ type: String }],
    imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Hero", heroSchema);
