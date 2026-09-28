import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import AnalyzerForm from "../components/home/AnalyzerForm";
import FeatureCard from "../components/home/FeatureCard";
import Footer from "../components/layout/Footer";

function Home() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div id="top" className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />

        {/* Analyzer */}
        {isLoggedIn && (
          <section
            id="analyzer"
            className="scroll-mt-24 border-t border-slate-200 bg-white"
          >
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                  Resume Analyzer
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  See how your resume matches the role
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Upload your resume and job description to identify matched
                  skills, missing skills, and your overall compatibility.
                </p>
              </div>

              <div className="mx-auto mt-12 max-w-5xl">
                <AnalyzerForm />
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-24 border-t border-slate-200 bg-[#F8FAFC]"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            {/* Heading */}
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                What it analyzes
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Turn a resume into
                <span className="text-blue-600"> useful insight.</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                ResumeMatch looks beyond simply reading your resume. It compares
                your experience with the requirements of a specific role and
                highlights where you align and where you can improve.
              </p>
            </div>

            {/* Feature cards */}
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              <FeatureCard
                number="01"
                icon="⌕"
                title="Resume parsing"
                description="Extract relevant information from your uploaded resume so it can be compared against the target role."
              >
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                      📄
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="h-2 w-24 rounded-full bg-slate-200" />
                      <div className="mt-2 h-1.5 w-16 rounded-full bg-slate-200" />
                    </div>

                    <span className="text-xs font-semibold text-blue-600">
                      Parsed
                    </span>
                  </div>
                </div>
              </FeatureCard>

              <FeatureCard
                number="02"
                icon="↔"
                title="Skill matching"
                description="Compare the skills and keywords in your resume with those requested in the job description."
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    ✓ React
                  </span>

                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    ✓ Node.js
                  </span>

                  <span className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    + AWS
                  </span>
                </div>
              </FeatureCard>

              <FeatureCard
                number="03"
                icon="↗"
                title="Actionable gaps"
                description="See which important skills are missing so you know what to improve before applying."
              >
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-800">
                      Skills to improve
                    </span>

                    <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-amber-600">
                      3 gaps
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-amber-100">
                    <div className="h-full w-[65%] rounded-full bg-amber-400" />
                  </div>
                </div>
              </FeatureCard>
            </div>

            {/* Workflow */}
            <div className="mt-8 rounded-[28px] border border-blue-100 bg-blue-50/60 p-7 sm:p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                    Simple workflow
                  </p>

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                    From documents to direction in seconds.
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600 shadow-sm">
                      1
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      Upload
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600 shadow-sm">
                      2
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      Compare
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm">
                      3
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      Improve
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-24 overflow-hidden border-t border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
              {/* Left visual */}
              <div className="relative">
                <div className="absolute -inset-10 rounded-full bg-blue-100/50 blur-3xl" />

                <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 p-7 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.4)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      ResumeMatch AI
                    </span>

                    <span className="flex items-center gap-2 text-[10px] font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Analysis engine
                    </span>
                  </div>

                  <div className="mt-10">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-800" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        Resume
                      </span>

                      <div className="h-px flex-1 bg-slate-800" />
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="h-2 w-[85%] rounded-full bg-slate-800" />
                      <div className="h-2 w-[65%] rounded-full bg-slate-800" />
                      <div className="h-2 w-[75%] rounded-full bg-blue-500/70" />
                      <div className="h-2 w-[50%] rounded-full bg-slate-800" />
                    </div>
                  </div>

                  <div className="my-8 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                      ✦
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-800" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        Job description
                      </span>

                      <div className="h-px flex-1 bg-slate-800" />
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="h-2 w-[72%] rounded-full bg-slate-800" />
                      <div className="h-2 w-[90%] rounded-full bg-slate-800" />
                      <div className="h-2 w-[60%] rounded-full bg-blue-500/70" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                  About ResumeMatch
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  Stop guessing whether your resume fits the role.
                </h2>

                <p className="mt-6 text-base leading-7 text-slate-600">
                  ResumeMatch is designed around a simple idea: a resume should
                  be evaluated in the context of the job you're applying for.
                </p>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Instead of relying on a generic resume score, the platform
                  compares your resume with a specific job description and
                  surfaces the skills you already demonstrate and the areas that
                  may need attention.
                </p>

                {/* Points */}
                <div className="mt-8 space-y-4">
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      01
                    </span>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Role-specific analysis
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Analyze your resume against the role you're actually
                        targeting.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      02
                    </span>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Clear skill gaps
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Quickly identify important requirements that aren't
                        represented in your resume.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      03
                    </span>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Built for improvement
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Turn analysis into concrete changes before submitting
                        your application.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById("analyzer")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Try ResumeMatch
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
