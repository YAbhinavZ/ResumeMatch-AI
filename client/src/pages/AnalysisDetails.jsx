import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";



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

function AnalysisDetails() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login to view this analysis.");
        }

        const response = await fetch(
          `${API_BASE_URL}/analyzer/history/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load analysis."
          );
        }

        setAnalysis(data.analysis);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
            <span className="text-sm font-medium">
              Loading analysis...
            </span>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              !
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              Unable to load analysis
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <Link
              to="/history"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to history
            </Link>
          </div>
        </main>
      </>
    );
  }

  const score =
    Number(analysis?.finalMatchScore) ||
    Number(analysis?.matchScore) ||
    0;

  const aiAnalysis = analysis?.aiAnalysis || {};

  const matchedSkills = aiAnalysis.matchedSkills || [];
  const missingSkills = aiAnalysis.missingSkills || [];
  const strengths = aiAnalysis.strengths || [];
  const suggestions = aiAnalysis.suggestions || [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
            <Link
              to="/history"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              ← Back to history
            </Link>

            <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Analysis #{analysis.analysisId}
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Resume Analysis
                </h1>

                <p className="mt-3 text-sm text-slate-500">
                  {analysis.resume?.fileName}
                  {analysis.createdAt &&
                    ` • ${new Date(
                      analysis.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-400">
                    Final match score
                  </p>

                  <p className="mt-1 text-4xl font-bold text-slate-900">
                    {score}
                    <span className="text-lg text-slate-400">
                      /100
                    </span>
                  </p>
                </div>

                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  {getScoreLabel(score)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          <div className="space-y-6">
            {/* Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Overall assessment
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {getScoreLabel(score)}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {aiAnalysis.summary ||
                  getScoreDescription(score)}
              </p>
            </section>

            {/* Skills */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Matched */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Matched skills
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Skills and technologies that align with the role.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {matchedSkills.length > 0 ? (
                    matchedSkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      No matched skills available.
                    </p>
                  )}
                </div>
              </section>

              {/* Missing */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Skills to improve
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Skills mentioned in the role that could strengthen your resume.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {missingSkills.length > 0 ? (
                    missingSkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      No missing skills identified.
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Strengths */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Your strengths
              </h2>

              <div className="mt-5 space-y-3">
                {strengths.length > 0 ? (
                  strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <span className="mt-0.5 text-emerald-600">
                        ✓
                      </span>

                      <p className="text-sm leading-6 text-slate-600">
                        {strength}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No strengths available.
                  </p>
                )}
              </div>
            </section>

            {/* Suggestions */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Suggestions
              </h2>

              <div className="mt-5 space-y-3">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl bg-blue-50 p-4"
                    >
                      <span className="mt-0.5 font-bold text-blue-600">
                        {index + 1}.
                      </span>

                      <p className="text-sm leading-6 text-slate-600">
                        {suggestion}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No suggestions available.
                  </p>
                )}
              </div>
            </section>

            {/* Inputs */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Analysis inputs
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Resume
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {analysis.resume?.fileName}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Job description
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {analysis.jobDescription?.fileName ||
                      "Pasted job description"}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

export default AnalysisDetails;