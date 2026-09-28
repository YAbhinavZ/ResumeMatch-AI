import "dotenv/config";
import { analyzeResumeWithAI } from "../services/aiAnalysis.service.js";

const resumeText = `
Abhinav Sharma
Computer Science Student

Skills:
JavaScript, React.js, Node.js, Express.js, MongoDB, SQL, Git, GitHub,
AWS, REST APIs

Projects:
Built a MERN stack event booking application with authentication,
REST APIs, MongoDB, and React.js.

Built a resume builder using HTML, CSS and JavaScript.

Education:
B.Tech in Computer Science Engineering.
`;

const jobDescriptionText = `
We are looking for a Backend Developer Intern.

Requirements:
- Strong knowledge of Node.js and Express.js
- Experience building REST APIs
- Knowledge of MongoDB and SQL
- Understanding of Git and GitHub
- Familiarity with Docker
- Basic knowledge of AWS
- Knowledge of Redis is a plus
- Good problem solving skills
`;

try {
  console.log("🤖 Starting Gemini AI analysis...\n");

  const result = await analyzeResumeWithAI(
    resumeText,
    jobDescriptionText
  );

  console.log("✅ Gemini response received!\n");

  console.log(
    JSON.stringify(result, null, 2)
  );
} catch (error) {
  console.error("\n❌ AI test failed:");
  console.error(error.message);
}