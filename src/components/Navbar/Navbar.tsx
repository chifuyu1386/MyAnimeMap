import { useState } from "react"
import { Link, useLocation } from "react-router"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const linkClass = (path: string) =>
    `block rounded-xl px-4 py-3 text-sm transition-colors ${
      location.pathname === path
        ? "bg-blue-400/10 text-blue-300"
        : "text-slate-300 hover:bg-white/5 hover:text-blue-400"
    }`

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2">
      <div className="rounded-2xl border border-white/10 bg-[#0A1120]/90 shadow-lg shadow-black/10 backdrop-blur-xl">
        {/* Navbar Header */}
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold tracking-tight text-white"
          >
            My<span className="text-blue-400">Anime</span>Map
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 text-sm md:flex">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/"
                  ? "text-blue-300"
                  : "text-slate-300 hover:text-blue-400"
              }`}
            >
              Home
            </Link>

            <Link
              to="/explore"
              className={`transition-colors ${
                location.pathname === "/explore"
                  ? "text-blue-300"
                  : "text-slate-300 hover:text-blue-400"
              }`}
            >
              Explore
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-400/10 md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 px-3 py-3 md:hidden"
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={linkClass("/")}
            >
              Home
            </Link>

            <Link
              to="/explore"
              onClick={() => setMenuOpen(false)}
              className={linkClass("/explore")}
            >
              Explore
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar