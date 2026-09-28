function PreviewCard() {
  return (
    <div className="relative w-full max-w-[540px]">
      {/* Ambient glow */}
      <div className="absolute -inset-12 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_35px_90px_-35px_rgba(37,99,235,0.35)] sm:p-7">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">
                ✦
              </span>

              <p className="text-xs font-bold tracking-tight text-slate-900">
                ResumeMatch AI
              </p>
            </div>

            <p className="mt-2 text-[11px] font-medium text-slate-400">
              AI-powered resume matching
            </p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-semibold text-emerald-700">
              Analysis ready
            </span>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-7 grid grid-cols-2 gap-3">
          {/* Resume */}
          <div className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-blue-200 hover:bg-blue-50/40">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-blue-600"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8" />
                  <path d="M8 17h6" />
                </svg>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
                PDF
              </span>
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Resume
            </p>

            <p className="mt-1 truncate text-xs font-semibold text-slate-800">
              Software_Engineer.pdf
            </p>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[88%] rounded-full bg-blue-500" />
              </div>

              <span className="text-[9px] font-semibold text-slate-400">
                88%
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-indigo-600"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M8 8h8" />
                  <path d="M8 12h8" />
                  <path d="M8 16h5" />
                </svg>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600">
                ROLE
              </span>
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Job description
            </p>

            <p className="mt-1 truncate text-xs font-semibold text-slate-800">
              Backend Developer
            </p>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[94%] rounded-full bg-indigo-500" />
              </div>

              <span className="text-[9px] font-semibold text-slate-400">
                94%
              </span>
            </div>
          </div>
        </div>

        {/* AI connector */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-slate-200" />

          <div className="relative flex items-center gap-2 bg-white px-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              AI analysis
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          </div>
        </div>

        {/* Main result */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-6 text-white shadow-[0_18px_40px_-18px_rgba(37,99,235,0.65)]">
          {/* Decorative glow */}
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            {/* Result header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-100">
                  Overall compatibility
                </p>

                <p className="mt-1 text-sm font-medium text-white/80">
                  Resume ↔ Backend Developer
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm">
                ✦
              </div>
            </div>

            {/* Score */}
            <div className="mt-6 flex items-end justify-between">
              <div className="flex items-baseline">
                <span className="text-6xl font-bold tracking-[-0.07em]">
                  92
                </span>

                <span className="ml-1 text-xl font-semibold text-blue-100">
                  %
                </span>
              </div>

              <span className="mb-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white">
                Strong match
              </span>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[92%] rounded-full bg-white shadow-sm" />
              </div>
            </div>

            {/* Skill chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white">
                ✓ Node.js
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white">
                ✓ PostgreSQL
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white">
                ✓ REST APIs
              </span>

              <span className="rounded-full bg-amber-300/15 px-3 py-1.5 text-[10px] font-semibold text-amber-100">
                + CI/CD
              </span>
            </div>

            {/* Bottom metrics */}
            <div className="mt-5 grid grid-cols-3 border-t border-white/10 pt-4">
              <div>
                <p className="text-[10px] text-blue-100">Skills matched</p>

                <p className="mt-1 text-sm font-bold">13</p>
              </div>

              <div className="border-l border-white/10 pl-4">
                <p className="text-[10px] text-blue-100">Skill gaps</p>

                <p className="mt-1 text-sm font-bold">2</p>
              </div>

              <div className="border-l border-white/10 pl-4">
                <p className="text-[10px] text-blue-100">Analysis</p>

                <p className="mt-1 text-sm font-bold">Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom workflow */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="text-[10px] font-semibold text-slate-400">
            Upload
          </span>

          <span className="text-slate-300">→</span>

          <span className="text-[10px] font-semibold text-slate-500">
            Compare
          </span>

          <span className="text-slate-300">→</span>

          <span className="text-[10px] font-bold text-blue-600">Improve</span>
        </div>
      </div>
    </div>
  );
}

export default PreviewCard;
