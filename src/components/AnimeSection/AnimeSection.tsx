import { Link } from "react-router"
import type { Anime } from "../../types/anime"
import AnimeCard from "../AnimeCard/AnimeCard"

type AnimeSectionProps = {
  title: string
  description?: string
  anime: Anime[]
}

function AnimeSection({
  title,
  description,
  anime,
}: AnimeSectionProps) {
  if (anime.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-7 w-1 rounded-full bg-blue-400" />

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
          </div>

          {description && (
            <p className="max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              {description}
            </p>
          )}
        </div>

        <Link
          to="/explore"
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition duration-300 hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-300"
        >
          View All

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
        {anime.map((item) => (
          <AnimeCard
            id={item.id}
            key={item.id}
            title={item.title}
            image={item.image}
            rating={item.rating}
            episodes={item.episodes}
          />
        ))}
      </div>
    </section>
  )
}

export default AnimeSection