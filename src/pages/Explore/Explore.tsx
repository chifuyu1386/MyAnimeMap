import { useEffect, useState } from "react"
import { getExploreAnime } from "../../api/animeApi"
import type { Anime } from "../../types/anime"
import AnimeCard from "../../components/AnimeCard/AnimeCard"
import useDebounce from "../../hooks/useDebounce"

type Status = "current" | "finished" | "upcoming" | ""

function Explore() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 400)
  const [anime, setAnime] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [status, setStatus] = useState<Status>("")
  const [sort, setSort] = useState("-userCount")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const totalPages = Math.ceil(total / 10)

  const visiblePages = Array.from(
    {
      length: Math.min(5, totalPages)
    },
    (_, index) => {
      const startPage = Math.max(
        1, 
        Math.min(page-2, totalPages - 4)
      )
      return startPage + index
    }
  )

  useEffect(() => {
    async function fetchAnime() {
      try {
        setLoading(true)
        setError("")

        const result = await getExploreAnime({
          search: debouncedSearch,
          page,
          limit: 10,
          status,
          sort,
        })

        setAnime(result.anime)
        setTotal(result.total)
      } catch (err) {
        console.error(err)
        setError("We couldn't load anime. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [debouncedSearch, status, sort, page])

  return (
    <main className="min-h-screen px-4 pb-20 pt-32">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            Find your next favorite
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Explore <span className="text-blue-400">Anime</span>
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            Search through anime and discover your next adventure.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:p-4">
          <label
            htmlFor="anime-search"
            className="mb-3 block text-sm font-medium text-slate-300"
          >
            Search anime
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="anime-search"
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Try Naruto, One Piece, Attack on Titan..."
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#050B18]/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Status Filter */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <label
              htmlFor="anime-status"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              Airing Status
            </label>

            <select
              id="anime-status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value as Status)
                setPage(1)
              }}
              className="w-full rounded-xl border border-white/10 bg-[#050B18] px-4 py-3 text-white outline-none transition focus:border-blue-400/50"
            >
              <option value="">All statuses</option>
              <option value="current">Currently Airing</option>
              <option value="finished">Finished</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <label
              htmlFor="anime-sort"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              Sort By
            </label>

            <select
              id="anime-sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value)
                setPage(1)
              }}
              className="w-full rounded-xl border border-white/10 bg-[#050B18] px-4 py-3 text-white outline-none transition focus:border-blue-400/50"
            >
              <option value="-userCount">Most Popular</option>
              <option value="-averageRating">Highest Rated</option>
              <option value="averageRating">Lowest Rated</option>
              <option value="-startDate">Newest First</option>
            </select>
          </div>
        </div>

        {/* Results heading */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            {search.trim() ? `Results for "${search.trim()}"` : "Discover Anime"}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {loading ? "Searching anime..." : ""}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-xl">
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-blue-400/20 border-t-blue-400" />

            <p className="font-medium text-white">Finding anime...</p>

            <p className="mt-2 text-sm text-slate-400">
              Please wait while we fetch the results.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 px-6 py-12 text-center">
            <h2 className="font-semibold text-white">Something went wrong</h2>

            <p className="mt-2 text-sm text-slate-400">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && anime.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-xl">
            <div className="mb-4 text-4xl">⌕</div>

            <h2 className="font-semibold text-white">No anime found</h2>

            <p className="mt-2 text-sm text-slate-400">
              Try another title or a different search term.
            </p>
          </div>
        )}

        {/* Anime Grid */}
        {!loading && !error && anime.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {anime.map((item) => (
              <AnimeCard
                key={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                episodes={item.episodes}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <nav
            aria-label="Anime results pages"
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => setPage((current) => current - 1)}
              disabled={page === 1}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            {visiblePages.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={page === pageNumber ? "page" : undefined}
                className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-semibold transition ${
                  page === pageNumber
                    ? "border-blue-400/50 bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-white"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              disabled={page === totalPages}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </nav>
        )}
      </section>
    </main>
  )
}

export default Explore