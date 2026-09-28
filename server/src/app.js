import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import analyzerRoutes from "./routes/analyzer.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// ─────────────────────────────────────────────
// Global middleware
// ─────────────────────────────────────────────

const allowedOrigins = [
  "https://resume-match-ai-one.vercel.app",
  "https://resume-match-4pkf57vql-abhinav-sharmas-projects-7df32fa8.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// Basic routes
// ─────────────────────────────────────────────

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to ResumeMatch AI API",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ResumeMatch AI server is running",
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
// Application routes
// ─────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/analyzer", analyzerRoutes);

// ─────────────────────────────────────────────
// Multer and application error handling
// ─────────────────────────────────────────────

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Uploaded file must be smaller than 5 MB.",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error) {
    console.error("Server error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "File upload failed.",
    });
  }

  next();
});

// ─────────────────────────────────────────────
// 404 handler
// ─────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ─────────────────────────────────────────────
// Start server
// ─────────────────────────────────────────────

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});