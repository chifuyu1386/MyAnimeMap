import { useEffect, useState } from "react"

import { getTrendingAnime, getPopularAnime } from "../../api/animeApi"
import type { Anime } from "../../types/anime"
import AnimeSection from "../../components/AnimeSection/AnimeSection"

function Home() {
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([])
  const [popularAnime, setPopularAnime] = useState<Anime[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchAnime() {
      try {
        setLoading(true)
        setError("")

        const [trending, popular] = await Promise.all([
          getTrendingAnime(),
          getPopularAnime(),
        ])

        setTrendingAnime(trending)
        setPopularAnime(popular)
      } catch (error) {
        console.error(error)
        setError("Something went wrong while loading anime.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [])

  return (
    <main className="min-h-screen px-4 pb-20 pt-32">

      {/* Hero */}
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
            Discover your next favorite anime
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Explore the world of{" "}
            <span className="text-blue-400">
              Anime
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Discover trending anime, explore detailed information,
            find new favorites, and build your personal anime collection.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="/explore"
              className="rounded-xl bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-400"
            >
              Explore Anime
            </a>

            <a
              href="/favorites"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-slate-200 backdrop-blur-md transition hover:bg-white/10"
            >
              View Favorites
            </a>

          </div>

        </div>
      </section>

      {loading && (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">

            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-blue-400/20 border-t-blue-400" />

            <h2 className="text-lg font-semibold text-white">
              Discovering anime...
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              We're fetching the latest anime for you.
            </p>

          </div>
        </section>
      )}

      {!loading && error && (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-10 text-center backdrop-blur-xl">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10 text-xl text-red-400">
              !
            </div>

            <h2 className="text-lg font-semibold text-white">
              Unable to load anime
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              {error}
            </p>

          </div>
        </section>
      )}

      {!loading && !error && (
        <>
          <AnimeSection
            title="Trending Anime"
            anime={trendingAnime}
          />

          <AnimeSection
            title="Popular Anime"
            anime={popularAnime}
          />
        </>
      )}

    </main>
  )
}

export default Home