export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
export const analyzeResume = async ({
  resume,
  jobDescriptionFile,
  jobDescription,
}) => {
  const formData = new FormData();

  formData.append("resume", resume);

  if (jobDescriptionFile) {
    formData.append("jobDescriptionFile", jobDescriptionFile);
  }

  if (jobDescription?.trim()) {
    formData.append("jobDescription", jobDescription.trim());
  }

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login before analyzing your resume.");
  }

  const response = await fetch(`${API_BASE_URL}/analyzer/analyze`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Analysis failed.");
  }

  return data;
};
