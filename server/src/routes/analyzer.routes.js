import express from "express";
import upload from "../middlewares/upload.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis

} from "../controllers/analyzer.controller.js";

const router = express.Router();

router.post(
  "/analyze",
  authMiddleware,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jobDescriptionFile", maxCount: 1 },
  ]),
  analyzeResume
);
router.get("/history", authMiddleware, getAnalysisHistory);
router.get("/history/:id", authMiddleware, getAnalysisById);
router.delete(
  "/history/:id",
  authMiddleware,
  deleteAnalysis
);

export default router;
