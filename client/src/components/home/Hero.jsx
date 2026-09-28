import PreviewCard from "./PreviewCard";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

const handleAnalyzeClick = () => {
  const token = localStorage.getItem("token");

  if (token) {
    document
      .getElementById("analyzer")
      ?.scrollIntoView({ behavior: "smooth" });
  } else {
    navigate("/login");
  }
};
  const scrollToAnalyzer = () => {
    document.getElementById("analyzer")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-250px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">

          {/* LEFT */}
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                ✦
              </span>

              <span className="text-xs font-semibold tracking-wide text-blue-700">
                AI-powered resume analysis
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[70px]">
              Your resume.
              <span className="block text-blue-600">
                Made relevant.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Compare your resume with a job description and quickly
              understand your match, skill gaps, and opportunities to
              improve.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={handleAnalyzeClick}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25"
              >
                Analyze my resume

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <a
                href="#features"
                className="px-5 py-3.5 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
              >
                Learn how it works
              </a>
            </div>

            {/* Trust */}
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                PDF & DOCX
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span>Fast analysis</span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span>Skill gap detection</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <PreviewCard />
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-24 border-t border-slate-200 pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">
              Understand your resume before the recruiter does.
            </p>

            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Resume → Job → Match → Improve
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;