import { createRequire } from "node:module";
import mammoth from "mammoth";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const extractTextFromFile = async (file) => {
  if (!file || !file.buffer) {
    throw new Error("No file was provided for text extraction.");
  }

  const fileName = file.originalname.toLowerCase();
  const mimeType = file.mimetype;

  // Extract text from PDF
  if (mimeType === "application/pdf" || fileName.endsWith(".pdf")) {
    const pdfData = await pdfParse(file.buffer);

    return pdfData.text.trim();
  }

  // Extract text from DOCX
  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const docxData = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    return docxData.value.trim();
  }

  throw new Error("Unsupported file format. Use PDF or DOCX.");
};