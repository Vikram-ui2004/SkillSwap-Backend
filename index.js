// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import testimonialRoutes from "./routes/testimonialRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Enable CORS
app.use(morgan("dev"));  // Logger

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit if DB connection fails
  });

// Example route
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

app.use("/api/testimonials", testimonialRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
