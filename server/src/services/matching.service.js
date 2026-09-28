const STOP_WORDS = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "your",
    "you",
    "are",
    "will",
    "our",
    "have",
    "has",
    "was",
    "were",
    "can",
    "job",
    "role",
    "work",
    "about",
    "into",
    "their",
    "they",
    "using",
    "use",
    "must",
    "should",
    "also",
    "than",
    "then",
    "who",
    "what",
    "where",
    "when",
    "how",
    "all",
    "any",
    "not",
    "but",
    "we",
    "is",
    "in",
    "of",
    "to",
    "a",
    "an",
    "on",
    "as",
    "at",
    "by",
    "be",
    "or",
    "it",
    "its",
    "their",
    "these",
    "those",
    "which",
    "within",
    "through",
    "including",
    "based",
    "related",
    "responsibilities",
    "requirements",
    "description",
    "candidate",
    "candidates",
    "experience",
    "knowledge",
    "ability",
    "strong",
    "good",
    "excellent",
    "looking",
    "provide",
    "provided",
    "develop",
    "development",
    "working",
    "team",
    "teams",
    "company",
    "organization",
    "program",
    "programs",
    "project",
    "projects",
    "solution",
    "solutions",
  ]);
  
  const TECHNICAL_SKILLS = [
    "java",
    "python",
    "javascript",
    "typescript",
    "react",
    "node",
    "node.js",
    "express",
    "express.js",
    "spring",
    "spring boot",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "redis",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "git",
    "github",
    "rest",
    "rest api",
    "api",
    "microservices",
    "html",
    "css",
    "tailwind",
    "linux",
    "terraform",
    "jenkins",
    "kafka",
    "spark",
    "hadoop",
    "airflow",
    "etl",
    "data engineering",
    "data pipeline",
    "machine learning",
    "artificial intelligence",
    "ai",
    "pandas",
    "numpy",
    "scikit-learn",
    "c++",
    "c#",
    "go",
    "rust",
    "php",
    "next.js",
    "angular",
    "vue",
    "graphql",
    "jwt",
    "oauth",
    "ci/cd",
  ];
  
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[()[\]{}:,;!?/\\|"'"]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };
  
  const extractKeywords = (text) => {
    const normalizedText = normalizeText(text);
  
    const words = normalizedText
      .split(/\s+/)
      .map((word) => word.replace(/[.#]+$/g, "").trim())
      .filter(
        (word) =>
          word.length >= 3 &&
          !STOP_WORDS.has(word) &&
          !/^\d+$/.test(word)
      );
  
    return new Set(words);
  };
  
  const extractSkills = (text) => {
    const normalizedText = normalizeText(text);
  
    return TECHNICAL_SKILLS.filter((skill) => {
      const normalizedSkill = skill.toLowerCase();
  
      if (normalizedSkill.includes(" ")) {
        return normalizedText.includes(normalizedSkill);
      }
  
      return extractKeywords(normalizedText).has(normalizedSkill);
    });
  };
  
  export const calculateMatchScore = (resumeText, jdText) => {
    const resumeSkills = extractSkills(resumeText);
    const jdSkills = extractSkills(jdText);
  
    // If technical skills are found in the JD, compare those skills.
    if (jdSkills.length > 0) {
      const matchedSkills = jdSkills.filter((skill) =>
        resumeSkills.includes(skill)
      );
  
      const missingSkills = jdSkills.filter(
        (skill) => !resumeSkills.includes(skill)
      );
  
      const score = Math.round(
        (matchedSkills.length / jdSkills.length) * 100
      );
  
      return {
        score,
        matchedKeywords: matchedSkills,
        missingKeywords: missingSkills,
        totalJobDescriptionKeywords: jdSkills.length,
      };
    }
  
    // Fallback for a JD that does not contain recognized technical skills.
    const resumeKeywords = extractKeywords(resumeText);
    const jdKeywords = extractKeywords(jdText);
  
    const matchedKeywords = [...jdKeywords].filter((keyword) =>
      resumeKeywords.has(keyword)
    );
  
    const missingKeywords = [...jdKeywords].filter(
      (keyword) => !resumeKeywords.has(keyword)
    );
  
    const score =
      jdKeywords.size === 0
        ? 0
        : Math.round((matchedKeywords.length / jdKeywords.size) * 100);
  
    return {
      score,
      matchedKeywords,
      missingKeywords,
      totalJobDescriptionKeywords: jdKeywords.size,
    };
  };