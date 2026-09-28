import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = Boolean(token && user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3v18" />
              <path d="M3 12h18" />
              <path d="M5.5 5.5l13 13" />
              <path d="M18.5 5.5l-13 13" />
            </svg>
          </div>

          <div>
            <p className="text-base font-bold tracking-tight text-slate-900">
              ResumeMatch
              <span className="text-blue-600"> AI</span>
            </p>

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Resume Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/#features"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Features
          </a>

          {isLoggedIn && (
            <a
              href="/#analyzer"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Analyzer
            </a>
          )}

          {isLoggedIn && (
            <Link
              to="/history"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              History
            </Link>
          )}

          <a
            href="/#about"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            About
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              {/* User */}
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="max-w-[120px] truncate text-sm font-medium text-slate-700">
                  {user.name?.split(" ")[0]}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Sign in
              </Link>

              {/* Get Started */}
              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-2">
            <a
              href="/#features"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Features
            </a>

            {isLoggedIn && (
              <a
                href="/#analyzer"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Analyzer
              </a>
            )}

            {isLoggedIn && (
              <Link
                to="/history"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                History
              </Link>
            )}

            <a
              href="/#about"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              About
            </a>

            <div className="my-2 h-px bg-slate-200" />

            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;