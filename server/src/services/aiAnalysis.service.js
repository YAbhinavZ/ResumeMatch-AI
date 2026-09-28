import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analysisSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },

    summary: {
      type: "string",
    },

    matchedSkills: {
      type: "array",
      items: {
        type: "string",
      },
    },

    missingSkills: {
      type: "array",
      items: {
        type: "string",
      },
    },

    strengths: {
      type: "array",
      items: {
        type: "string",
      },
    },

    suggestions: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },

  required: [
    "matchScore",
    "summary",
    "matchedSkills",
    "missingSkills",
    "strengths",
    "suggestions",
  ],

  additionalProperties: false,
};
export const analyzeResumeWithAI = async (
  resumeText,
  jobDescriptionText
) => {
  try {
    console.log("🤖 Sending resume to Groq GPT-OSS 120B...");

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are an expert technical recruiter and resume analysis system.

Your task is to compare a candidate's resume against a specific job description.

Analyze the candidate ONLY based on information present in the resume.
Do not assume skills, technologies, experience, certifications, or qualifications
that are not supported by the resume.

Evaluate semantic relevance, not just exact keyword matches.

Consider:
- Required technical skills
- Programming languages
- Frameworks and libraries
- Databases
- Cloud technologies
- Development tools
- Relevant project experience
- Work experience
- Responsibilities
- Domain knowledge
- Certifications when relevant

IMPORTANT OUTPUT RULES:

1. Return EXACTLY ONE JSON OBJECT.
2. The root JSON value MUST be an object starting with { and ending with }.
3. NEVER return an array.
4. NEVER wrap the result inside [ ].
5. Do not return markdown.
6. Do not return \`\`\`json.
7. Do not add any explanation outside the JSON object.
8. matchScore must be an integer between 0 and 100.
9. Do not inflate the score simply because some keywords match.
10. A skill should be considered matched only when the resume provides reasonable evidence.
11. missingSkills should contain important requirements not sufficiently demonstrated.
12. Suggestions must be practical and specific.
13. Do not invent experience or qualifications.
14. Keep the response concise.

The required root structure is:

{
  "matchScore": 0,
  "summary": "string",
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "suggestions": []
}

Again: return ONE OBJECT, NOT AN ARRAY.
`,
        },

        {
          role: "user",
          content: `
RESUME:
----------------
${resumeText}
----------------

JOB DESCRIPTION:
----------------
${jobDescriptionText}
----------------

Compare the resume against the job description and return the analysis
according to the provided JSON schema.
          `,
        },
      ],

      response_format: {
        type: "json_schema",

        json_schema: {
          name: "resume_analysis",
          strict: true,
          schema: analysisSchema,
        },
      },
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response.");
    }

    const result = JSON.parse(content);

    console.log("✅ Groq AI analysis completed.");
    console.log("🤖 AI match score:", result.matchScore);

    return result;
  } catch (error) {
    console.error("❌ Groq analysis failed:", error);

    throw new Error("AI resume analysis failed.");
  }
};