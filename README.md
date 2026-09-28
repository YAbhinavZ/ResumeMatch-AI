# ResumeMatch AI 🚀

> AI-powered resume and job description matching platform that helps candidates understand how well their resume aligns with a target role and what they can improve before applying.

ResumeMatch AI combines **technical skill matching** with **AI-powered semantic analysis** to generate an overall compatibility score, identify matched skills, highlight missing requirements, and provide actionable suggestions for improving a resume.

---

## ✨ Overview

Applying to jobs often requires tailoring a resume to each job description.

ResumeMatch AI simplifies this process by allowing users to:

- Upload their resume
- Upload a job description or paste it as text
- Analyze the compatibility between both documents
- View an overall match score
- Identify matched technical skills
- Discover missing or weakly demonstrated skills
- Understand resume strengths
- Receive AI-generated improvement suggestions
- Save and revisit previous analyses

The application combines deterministic skill matching with AI analysis to provide a more useful assessment than simple keyword matching alone.

---

# 🎯 Key Features

## 📄 Resume & Job Description Upload

Users can provide:

- Resume in **PDF**
- Resume in **DOCX**
- Job description in **PDF**
- Job description as **pasted text**

The application extracts the document text before sending it through the analysis pipeline.

---

## 🤖 AI-Powered Resume Analysis

ResumeMatch AI uses the **Groq API with GPT-OSS 120B** to analyze the semantic relationship between the resume and the job description.

The AI generates:

- AI match score
- Analysis summary
- Matched skills
- Missing skills
- Candidate strengths
- Improvement suggestions

This allows the system to identify contextual similarities rather than relying only on exact keyword matches.

---

## 🎯 Combined Match Score

ResumeMatch AI combines two analysis signals:

```text
Keyword Match      → 30%
AI Semantic Match  → 70%
