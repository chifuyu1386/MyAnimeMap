import { useEffect, useState } from "react"

import { getTrendingAnime } from "../../api/animeApi"
import type { Anime } from "../../types/anime"
import AnimeSection from "../../components/AnimeSection/AnimeSection"

function Home() {
  const [anime, setAnime] = useState<Anime[]>([])

  
  useEffect(() => {
  async function fetchAnime() {
    try {
      const data = await getTrendingAnime()
      setAnime(data)
    } catch (error) {
      console.log(error)
    }
  }

  fetchAnime()
  }, [])

  return (
    <main className="min-h-screen px-4 pb-20 pt-32">
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

      <AnimeSection title="Trending Anime" anime={anime}/>

    </main>
  )
}

export default Home