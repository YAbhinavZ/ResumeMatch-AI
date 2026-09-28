import { extractTextFromFile } from "../services/textExtraction.service.js";
import { calculateMatchScore } from "../services/matching.service.js";
import { analyzeResumeWithAI } from "../services/aiAnalysis.service.js";

import prisma from "../lib/prisma.js";

export const analyzeResume = async (req, res, next) => {
  try {
    console.log("📥 Analysis request received");

    const resumeFile = req.files?.resume?.[0];
    const jobDescriptionFile = req.files?.jobDescriptionFile?.[0];
    const jobDescriptionText = req.body.jobDescription?.trim();

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    if (!jobDescriptionFile && !jobDescriptionText) {
      return res.status(400).json({
        success: false,
        message: "Upload a JD PDF or provide job description text.",
      });
    }

    console.log("📄 Resume received:", resumeFile.originalname);

    if (jobDescriptionFile) {
      console.log(
        "📄 Job description PDF received:",
        jobDescriptionFile.originalname
      );
    } else {
      console.log("📝 Job description text received");
    }

    // Extract resume text
    const resumeText = await extractTextFromFile(resumeFile);

    // Extract or use job description text
    let jdText = jobDescriptionText || "";

    if (jobDescriptionFile) {
      jdText = await extractTextFromFile(jobDescriptionFile);
    }

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from the resume.",
      });
    }

    if (!jdText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from the job description.",
      });
    }

    console.log("📄 Resume text length:", resumeText.length);
    console.log("📄 JD text length:", jdText.length);

    // --------------------------------------------------
    // 1. Keyword-based analysis
    // --------------------------------------------------

    const matchResult = calculateMatchScore(resumeText, jdText);

    console.log("📊 Keyword match score:", matchResult.score);
    console.log("✅ Matched keywords:", matchResult.matchedKeywords);
    console.log("❌ Missing keywords:", matchResult.missingKeywords);

    // --------------------------------------------------
    // 2. AI semantic analysis
    // --------------------------------------------------

    console.log("🤖 Starting Gemini AI analysis...");

    const aiResult = await analyzeResumeWithAI(resumeText, jdText);
    const finalMatchScore = Math.round(
      matchResult.score * 0.3 + aiResult.matchScore * 0.7
    );
    console.log("🎯 Final match score:", finalMatchScore);

    console.log("🤖 AI match score:", aiResult.matchScore);
    console.log("✅ AI matched skills:", aiResult.matchedSkills);
    console.log("❌ AI missing skills:", aiResult.missingSkills);

    // --------------------------------------------------
    // 3. Save analysis to PostgreSQL
    // --------------------------------------------------

    const analysis = await prisma.analysis.create({
      data: {
        resumeFileName: resumeFile.originalname,
        jobDescriptionFileName: jobDescriptionFile?.originalname || null,
        jobDescriptionSource: jobDescriptionFile ? "pdf" : "text",

        matchScore: matchResult.score,
        finalMatchScore,
        matchedSkills: matchResult.matchedKeywords,
        missingSkills: matchResult.missingKeywords,

        aiMatchScore: aiResult.matchScore,
        aiSummary: aiResult.summary,
        aiMatchedSkills: aiResult.matchedSkills,
        aiMissingSkills: aiResult.missingSkills,
        aiStrengths: aiResult.strengths,
        aiSuggestions: aiResult.suggestions,

        resumeTextLength: resumeText.length,
        jobDescriptionTextLength: jdText.length,

        // Associate analysis with logged-in user
        userId: req.user.userId,
      },
    });

    console.log("💾 Analysis saved with ID:", analysis.id);

    // --------------------------------------------------
    // 4. Return result to frontend
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",

      data: {
        analysisId: analysis.id,

        keywordAnalysis: {
          matchScore: matchResult.score,
          matchedKeywords: matchResult.matchedKeywords,
          missingKeywords: matchResult.missingKeywords,
          totalJobDescriptionKeywords: matchResult.totalJobDescriptionKeywords,
        },

        aiAnalysis: {
          matchScore: aiResult.matchScore,
          summary: aiResult.summary,
          matchedSkills: aiResult.matchedSkills,
          missingSkills: aiResult.missingSkills,
          strengths: aiResult.strengths,
          suggestions: aiResult.suggestions,
        },

        resume: {
          fileName: resumeFile.originalname,
          textLength: resumeText.length,
        },

        jobDescription: {
          source: jobDescriptionFile ? "pdf" : "text",
          fileName: jobDescriptionFile?.originalname || null,
          textLength: jdText.length,
        },
      },
    });
  } catch (error) {
    console.error("❌ Analysis error:", error.message);

    next(error);
  }
};
export const getAnalysisById = async (req, res) => {
  try {
    const analysisId = Number(req.params.id);

    if (!Number.isInteger(analysisId)) {
      return res.status(400).json({
        message: "Invalid analysis ID.",
      });
    }

    const analysis = await prisma.analysis.findFirst({
      where: {
        id: analysisId,
        userId: req.user.userId,
      },
    });

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found.",
      });
    }

    return res.status(200).json({
      analysis: {
        analysisId: analysis.id,

        finalMatchScore: analysis.finalMatchScore,
        matchScore: analysis.matchScore,

        aiAnalysis: {
          matchScore: analysis.aiMatchScore,
          summary: analysis.aiSummary,
          matchedSkills: analysis.aiMatchedSkills || [],
          missingSkills: analysis.aiMissingSkills || [],
          strengths: analysis.aiStrengths || [],
          suggestions: analysis.aiSuggestions || [],
        },

        resume: {
          fileName: analysis.resumeFileName,
        },

        jobDescription: {
          fileName: analysis.jobDescriptionFileName,
          source: analysis.jobDescriptionSource,
        },

        createdAt: analysis.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Failed to fetch analysis:", error);

    return res.status(500).json({
      message: "Failed to fetch analysis.",
    });
  }
};
export const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await prisma.analysis.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      analyses,
    });
  } catch (error) {
    console.error("❌ Failed to fetch analysis history:", error);

    return res.status(500).json({
      message: "Failed to fetch analysis history.",
    });
  }
};

export const deleteAnalysis = async (req, res) => {
  try {
    const analysisId = Number(req.params.id);

    if (!Number.isInteger(analysisId)) {
      return res.status(400).json({
        message: "Invalid analysis ID.",
      });
    }

    const analysis = await prisma.analysis.findFirst({
      where: {
        id: analysisId,
        userId: req.user.userId,
      },
    });

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found.",
      });
    }

    await prisma.analysis.delete({
      where: {
        id: analysisId,
      },
    });

    return res.status(200).json({
      message: "Analysis deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Failed to delete analysis:", error);

    return res.status(500).json({
      message: "Failed to delete analysis.",
    });
  }
};