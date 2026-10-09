import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          My<span className="text-blue-400">Anime</span>Map
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link
            to="/"
            className="transition-colors hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="transition-colors hover:text-blue-400"
          >
            Explore
          </Link>

        </div>

      </div>
    </nav>
  )
}

export default Navbar