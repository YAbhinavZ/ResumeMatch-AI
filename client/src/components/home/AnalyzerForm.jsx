import { useState } from "react";
import { analyzeResume } from "../../services/api";
import AnalysisResult from "./AnalysisResult";

function AnalyzerForm() {
  const [resume, setResume] = useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setError("Please upload your resume as a PDF or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume file must be smaller than 5MB.");
      return;
    }

    setResume(file);
    setError("");
  };

  const handleJDFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Job description must be a PDF file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Job description file must be smaller than 5MB.");
      return;
    }

    setJobDescriptionFile(file);
    setJobDescription("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescriptionFile && !jobDescription.trim()) {
      setError("Please upload a job description or paste the job description.");
      return;
    }

    try {
      setLoading(true);
      setAnalysisResult(null);

      const response = await analyzeResume({
        resume,
        jobDescriptionFile,
        jobDescription,
      });

      const result = response.data || response;

      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResume(null);
    setJobDescriptionFile(null);
    setJobDescription("");
    setError("");
    setAnalysisResult(null);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_70px_-35px_rgba(15,23,42,0.2)]"
      >
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                Start analysis
              </p>

              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
                Compare your resume with a job
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Upload your resume and provide the job description.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Files stay in your session
            </div>
          </div>
        </div>

        {/* Main inputs */}
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
          {/* Resume */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  01. Your resume
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PDF or DOCX · Max 5MB
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Required
              </span>
            </div>

            <label
              htmlFor="resume-upload"
              className={`group flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                resume
                  ? "border-blue-300 bg-blue-50/50"
                  : "border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/30"
              }`}
            >
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={handleResumeChange}
                className="hidden"
              />

              {resume ? (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white shadow-lg shadow-blue-600/20">
                    ✓
                  </div>

                  <p className="mt-4 max-w-full truncate px-4 text-sm font-bold text-slate-900">
                    {resume.name}
                  </p>

                  <p className="mt-1 text-xs text-blue-600">
                    Resume selected · Click to replace
                  </p>
                </>
              ) : (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-slate-200 transition-transform group-hover:-translate-y-1">
                    ↑
                  </div>

                  <p className="mt-4 text-sm font-bold text-slate-800">
                    Drop your resume here
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    or click to browse your files
                  </p>
                </>
              )}
            </label>
          </div>

          {/* Job Description */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  02. Job description
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Upload PDF or paste text
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Required
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50">
              {/* JD upload */}
              <label
                htmlFor="jd-upload"
                className={`group flex cursor-pointer items-center gap-4 border-b border-slate-200 p-5 transition-colors ${
                  jobDescriptionFile
                    ? "bg-blue-50/50"
                    : "hover:bg-blue-50/30"
                }`}
              >
                <input
                  id="jd-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleJDFileChange}
                  className="hidden"
                />

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-slate-200">
                  {jobDescriptionFile ? "✓" : "↑"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {jobDescriptionFile
                      ? jobDescriptionFile.name
                      : "Upload job description PDF"}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    {jobDescriptionFile
                      ? "Click to replace"
                      : "PDF · Max 5MB"}
                  </p>
                </div>
              </label>

              {/* Divider */}
              <div className="flex items-center gap-3 px-5 py-2">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  or
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* JD textarea */}
              <textarea
                value={jobDescription}
                onChange={(event) => {
                  setJobDescription(event.target.value);
                  setJobDescriptionFile(null);
                  setError("");
                }}
                placeholder="Paste the job description here..."
                rows={5}
                className="block w-full resize-none border-0 bg-transparent px-5 pb-5 pt-2 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 sm:mx-8">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-red-500">!</span>

              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold text-slate-600">
              Ready to analyze?
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              We'll compare your resume against the provided role.
            </p>
          </div>

          <div className="flex gap-3">
            {(resume || jobDescriptionFile || jobDescription) && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
              >
                Clear
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze resume
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Analysis result */}
      {analysisResult && (
        <div className="mt-10">
          <AnalysisResult result={analysisResult} />
        </div>
      )}
    </div>
  );
}

export default AnalyzerForm;