import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
const API_BASE_URL = "http://localhost:3000/api";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getScoreStyle(score) {
  if (score >= 80) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (score >= 65) {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  if (score >= 50) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-red-50 text-red-700 border-red-200";
}

function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/analyzer/history/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete analysis.");
      }

      setAnalyses((current) =>
        current.filter((analysis) => analysis.id !== id)
      );
    } catch (error) {
      setError(error.message || "Failed to delete analysis.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view your analysis history.");
          return;
        }

        const response = await fetch(`${API_BASE_URL}/analyzer/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load analysis history.");
        }

        setAnalyses(data.analyses || []);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Your workspace
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Analysis History
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Review your previous resume and job description analyses in one
                place.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
                <span className="text-sm font-medium">
                  Loading your analyses...
                </span>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm font-medium text-red-700">{error}</p>

              <Link
                to="/login"
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Go to Login
              </Link>
            </div>
          )}

          {!loading && !error && analyses.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8" />
                  <path d="M8 17h5" />
                </svg>
              </div>

              <h2 className="mt-6 text-xl font-bold text-slate-900">
                No analyses yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Analyze your resume against a job description and your results
                will appear here.
              </p>

              <Link
                to="/"
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Analyze your resume
              </Link>
            </div>
          )}

          {!loading && !error && analyses.length > 0 && (
            <div className="space-y-4">
            {analyses.map((analysis) => {
  const score =
    analysis.finalMatchScore ?? analysis.matchScore ?? 0;

  return (
    <Link
      key={analysis.id}
      to={`/history/${analysis.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="min-w-0 flex-1">

          <div className="flex items-start gap-4">

            {/* File icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M8 13h8" />
                <path d="M8 17h5" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-base font-semibold text-slate-900">
                  {analysis.resumeFileName}
                </h2>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  #{analysis.id}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Analyzed on {formatDate(analysis.createdAt)}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Job Description
              </p>

              <p className="mt-1 truncate text-sm font-medium text-slate-700">
                {analysis.jobDescriptionFileName ||
                  "Pasted job description"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Analysis
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                AI-powered resume matching
              </p>
            </div>

          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-between gap-6 border-t border-slate-100 pt-5 lg:min-w-[230px] lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">

          <div>
            <p className="text-xs font-medium text-slate-400">
              Match score
            </p>

            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {score}
              </span>

              <span className="text-sm font-medium text-slate-400">
                /100
              </span>
            </div>

            <span
              className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getScoreStyle(
                score
              )}`}
            >
              {score >= 80
                ? "Excellent"
                : score >= 65
                ? "Good"
                : score >= 50
                ? "Moderate"
                : "Needs work"}
            </span>
          </div>

          <div className="flex flex-col items-end gap-3">

            <span className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600">
              →
            </span>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleDelete(analysis.id);
              }}
              disabled={deletingId === analysis.id}
              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deletingId === analysis.id
                ? "Deleting..."
                : "Delete"}
            </button>

          </div>
        </div>
      </div>
    </Link>
  );
})}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default History;
