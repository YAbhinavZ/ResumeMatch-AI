import multer from "multer";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.memoryStorage();

const resumeMimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const isPdf = (file) => {
  return (
    file.mimetype === "application/pdf" ||
    file.originalname.toLowerCase().endsWith(".pdf")
  );
};

const isDocx = (file) => {
  return (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.originalname.toLowerCase().endsWith(".docx")
  );
};

const fileFilter = (req, file, callback) => {
  if (file.fieldname === "resume") {
    const isValidResume =
      resumeMimeTypes.includes(file.mimetype) ||
      isPdf(file) ||
      isDocx(file);

    if (!isValidResume) {
      return callback(
        new Error("Resume must be uploaded as a PDF or DOCX file.")
      );
    }
  }

  if (file.fieldname === "jobDescriptionFile") {
    if (!isPdf(file)) {
      return callback(
        new Error("Job description must be uploaded as a PDF file.")
      );
    }
  }

  callback(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

export default upload;