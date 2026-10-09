import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { getAnimeById } from "../../api/animeApi"
import type { Anime } from "../../types/anime"

function AnimeDetails() {
  const { id } = useParams()

  const [anime, setAnime] = useState<Anime | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) {
      setAnime(null)
      setError("Anime ID is missing.")
      setLoading(false)
      return
    }

    async function fetchAnime() {
      try {
        setLoading(true)
        setError("")
        setAnime(null)

        const data = await getAnimeById(id!)

        setAnime(data)
      } catch {
        setError("Failed to load anime details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-400/20 border-t-blue-400" />

          <p className="text-sm text-slate-400">
            Discovering anime...
          </p>
        </div>
      </div>
    )
  }

  if (error || !anime) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
          🎬
        </div>

        <h1 className="text-2xl font-bold text-white">
          Anime not found
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
          {error || "We couldn't find this anime."}
        </p>

        <Link
          to="/explore"
          className="mt-6 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
        >
          Back to Explore
        </Link>
      </div>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">

      {/* Cinematic Hero */}
      <section className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#0A1120]">

        {/* Cover background */}
        {anime.coverImage && (
          <>
            <div className="absolute inset-0 -z-20">
              <img
                src={anime.coverImage}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-center opacity-30"
              />
            </div>

            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050B18] via-[#050B18]/90 to-[#050B18]/60" />

            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050B18] via-transparent to-[#050B18]/20" />
          </>
        )}

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 lg:p-10">

          {/* Poster */}
          <div className="mx-auto w-full max-w-[240px] md:mx-0">
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl shadow-black/40">

              {anime.image ? (
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center text-sm text-slate-400">
                  No poster available
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
            </div>

            {/* Poster caption */}
            <p className="mt-3 text-center text-xs tracking-wide text-slate-500">
              ANIME DISCOVERY
            </p>
          </div>

          {/* Main information */}
          <div className="flex min-w-0 flex-col justify-center py-1">

            {/* Breadcrumb */}
            <Link
              to="/explore"
              className="inline-flex w-fit items-center gap-2 text-sm text-slate-400 transition hover:text-blue-300"
            >
              <span aria-hidden="true">←</span>
              Back to Explore
            </Link>

            {/* Title */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                Anime Details
              </p>

              <h1 className="mt-3 break-words text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {anime.title}
              </h1>
            </div>

            {/* Ratings and status */}
            <div className="mt-6 flex flex-wrap items-center gap-3">

              {anime.rating && (
                <div className="flex items-center gap-2 rounded-xl border border-blue-400/25 bg-blue-400/10 px-4 py-2.5">
                  <span className="text-lg text-blue-300">★</span>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-blue-200/60">
                      Rating
                    </p>

                    <p className="text-sm font-bold text-blue-300">
                      {anime.rating}
                      <span className="ml-1 font-normal text-blue-200/60">
                        / 100
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {anime.status && (
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {anime.status}
                </span>
              )}

              {anime.ageRating && (
                <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                  {anime.ageRating}
                </span>
              )}

            </div>

            {/* Metadata */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-blue-400/20">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Episodes
                </p>

                <p className="mt-2 text-2xl font-semibold text-white">
                  {anime.episodes ?? "—"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Total episodes
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-blue-400/20">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Start Date
                </p>

                <p className="mt-3 break-words text-sm font-semibold text-white">
                  {anime.startDate ?? "Unknown"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  First aired
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-blue-400/20 sm:col-span-1">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  End Date
                </p>

                <p className="mt-3 break-words text-sm font-semibold text-white">
                  {anime.endDate ?? "Unknown"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Last aired
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Synopsis */}
      <section className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:p-10">

        <div className="flex items-start gap-4">

          <div className="hidden h-12 w-1 shrink-0 rounded-full bg-gradient-to-b from-blue-400 to-indigo-500 sm:block" />

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  The Story
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Synopsis
                </h2>
              </div>

              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                Overview
              </span>
            </div>

            <p className="mt-6 whitespace-pre-line text-sm leading-8 text-slate-300 sm:text-base sm:leading-9">
              {anime.synopsis ||
                "No synopsis is available for this anime yet."}
            </p>

          </div>
        </div>
      </section>

      {/* Footer navigation */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">

        <p className="text-sm text-slate-500">
          Exploring the world of anime, one story at a time.
        </p>

        <Link
          to="/explore"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-300"
        >
          Explore More Anime
          <span aria-hidden="true">→</span>
        </Link>

      </div>

    </main>
  )
}

export default AnimeDetails