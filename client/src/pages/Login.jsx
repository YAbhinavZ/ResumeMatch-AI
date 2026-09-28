import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      // Save JWT
      localStorage.setItem("token", data.token);

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go back to application
      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left */}
        <section className="relative hidden overflow-hidden bg-blue-600 lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            <a href="/" className="flex w-fit items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-blue-600 shadow-lg">
                R
              </div>

              <span className="text-lg font-bold text-white">
                ResumeMatch{" "}
                <span className="text-blue-200">AI</span>
              </span>
            </a>

            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                Welcome back
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                Build a resume
                <span className="block text-blue-200">
                  that gets noticed.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                Sign in to continue analyzing your resume, discovering skill
                gaps, and preparing for your next opportunity.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "AI-powered resume analysis",
                  "Job-specific skill gap detection",
                  "Actionable resume suggestions",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-blue-50"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-blue-200">
              © 2026 ResumeMatch AI
            </p>
          </div>
        </section>

        {/* Right */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <a
              href="/"
              className="mb-10 flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
                R
              </div>

              <span className="text-lg font-bold text-slate-900">
                ResumeMatch{" "}
                <span className="text-blue-600">AI</span>
              </span>
            </a>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue where you left off and analyze your next job
                opportunity.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-3 text-xs text-slate-500">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                Remember me
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? "Signing in..." : "Sign in"}

                {!loading && (
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create account
              </a>
            </p>

            <div className="mt-8 border-t border-slate-200 pt-6 text-center">
              <a
                href="/"
                className="text-xs font-medium text-slate-400 transition hover:text-blue-600"
              >
                ← Back to ResumeMatch AI
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;