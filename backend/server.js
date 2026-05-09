import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { upload } from "./config/cloudinary.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Route for Contact Form
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received message from ${name} (${email}): ${message}`);
  // In a real app, you might send an email or save to a database.
  res.json({ success: true, message: "Thank you for reaching out! I'll get back to you soon." });
});

// Example Image Upload Route
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image uploaded" });
  }
  res.json({ success: true, imageUrl: req.file.path });
});

app.get("/", (req, res) => {
  res.send("API is running1...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
