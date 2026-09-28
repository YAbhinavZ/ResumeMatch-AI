function getScoreLabel(score) {
  if (score >= 80) return "Excellent match";
  if (score >= 65) return "Good match";
  if (score >= 50) return "Moderate match";
  return "Needs improvement";
}

function getScoreDescription(score) {
  if (score >= 80) {
    return "Your resume aligns strongly with the requirements of this role.";
  }

  if (score >= 65) {
    return "Your resume shows good alignment with this role, with some areas to strengthen.";
  }

  if (score >= 50) {
    return "Your resume has some relevant experience, but several areas could be improved.";
  }

  return "There are significant skill gaps between your resume and this role.";
}

function AnalysisResult({ result }) {
  console.log("📦 Frontend analysis result:", result);
console.log("🎯 Backend final score:", result?.aiAnalysis?.matchScore);
console.log("📊 Keyword score:", result?.keywordAnalysis?.matchScore);
console.log("🤖 AI score:", result?.aiAnalysis?.matchScore);
  const aiAnalysis = result?.aiAnalysis;

  if (!aiAnalysis) {
    return null;
  }

  // Final score from backend.
  // Fallback calculation is used if finalMatchScore is unavailable.
  const score =
  Number(result?.keywordAnalysis?.MatchScore) ||
  Math.round(
    (Number(result?.keywordAnalysis.matchScore) || 0) * 0.2 +
      (Number(aiAnalysis.matchScore) || 0) * 0.8
  );
  const matchedSkills = aiAnalysis.matchedSkills || [];
  const missingSkills = aiAnalysis.missingSkills || [];
  const strengths = aiAnalysis.strengths || [];
  const suggestions = aiAnalysis.suggestions || [];

  return (
    <section className="border-t border-slate-200 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            Analysis complete
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Your resume match
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Here's how your resume compares with the job description.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Analysis successful
        </div>
      </div>

      {/* Score */}
      <div className="grid gap-8 border-b border-slate-200 px-6 py-8 sm:px-8 lg:grid-cols-[220px_1fr] lg:items-center">
        <div className="flex justify-center">
          <div
            className="relative flex h-48 w-48 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#2563eb ${
                score * 3.6
              }deg, #e8eef8 0deg)`,
            }}
          >
            <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold tracking-[-0.05em] text-slate-950">
                  {score}
                </span>

                <span className="text-lg font-semibold text-slate-400">
                  %
                </span>
              </div>

              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Match score
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Overall compatibility
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {getScoreLabel(score)}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
            {getScoreDescription(score)}
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">Match strength</span>

              <span className="text-blue-600">{score}%</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-700"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {aiAnalysis.summary && (
        <div className="border-b border-slate-200 px-6 py-7 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            AI assessment
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
            {aiAnalysis.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      <div className="grid gap-5 border-b border-slate-200 px-6 py-7 sm:px-8 lg:grid-cols-2">
        {/* Matched skills */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm text-emerald-600">
                ✓
              </div>

              <h3 className="text-sm font-bold text-slate-900">
                Matched skills
              </h3>
            </div>

            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
              {matchedSkills.length}
            </span>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            Skills and technologies from the job description supported by your
            resume.
          </p>

          {matchedSkills.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {matchedSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-xs font-medium text-slate-400">
              No matching skills were detected.
            </p>
          )}
        </div>

        {/* Missing skills */}
        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-sm text-amber-600">
                +
              </div>

              <h3 className="text-sm font-bold text-slate-900">
                Skills to improve
              </h3>
            </div>

            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
              {missingSkills.length}
            </span>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            Important requirements from the job description not clearly
            demonstrated in your resume.
          </p>

          {missingSkills.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {missingSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-semibold text-amber-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-xs font-medium text-slate-400">
              No significant skill gaps were detected.
            </p>
          )}
        </div>
      </div>

      {/* Strengths & Suggestions */}
      <div className="grid gap-5 border-b border-slate-200 px-6 py-7 sm:px-8 lg:grid-cols-2">
        {/* Strengths */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Strengths
          </p>

          <div className="mt-4 space-y-3">
            {strengths.length > 0 ? (
              strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="mt-0.5 text-emerald-500">✓</span>

                  <p className="text-sm leading-6 text-slate-600">
                    {strength}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                No strengths were provided.
              </p>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Suggestions
          </p>

          <div className="mt-4 space-y-3">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="mt-0.5 text-blue-500">→</span>

                  <p className="text-sm leading-6 text-slate-600">
                    {suggestion}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                No suggestions were provided.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Analysis inputs */}
      <div className="px-6 py-7 sm:px-8">
        <p className="text-sm font-bold text-slate-900">
          Analysis inputs
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Documents used to generate this analysis.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Resume
            </p>

            <p className="mt-2 truncate text-sm font-semibold text-slate-800">
              {result.resume?.fileName || "Resume"}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {result.resume?.textLength || 0} characters analyzed
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Job description
            </p>

            <p className="mt-2 truncate text-sm font-semibold text-slate-800">
              {result.jobDescription?.fileName || "Job description text"}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {result.jobDescription?.textLength || 0} characters analyzed
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Analysis complete
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Use the AI suggestions to tailor your resume for this role.
            </p>
          </div>

          <p className="text-xs font-medium text-slate-400">
            Analysis #{result.analysisId}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AnalysisResult;