import { Link } from "react-router"

type AnimeCardProps = {
  id: string
  title: string
  image: string
  rating?: string
  episodes?: number
}

function AnimeCard({
  id,
  title,
  image,
  rating,
  episodes,
}: AnimeCardProps) {
  return (
    <Link
      to={`/anime/${id}`}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B18]"
      aria-label={`View details for ${title}`}
    >
      <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07]">

        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">

          {/* Image + Gradient */}
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">

            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover"
            />

            {/* Gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

          </div>

          {/* Rating */}
          {rating && (
            <div className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs font-medium text-blue-300 backdrop-blur-md">
              ★ {rating}
            </div>
          )}

        </div>

        {/* Content */}
        <div className="bg-white/[0.02] p-4">
          <h3 className="truncate font-semibold text-white">
            {title}
          </h3>

          {episodes !== undefined && (
            <p className="mt-1 text-sm text-slate-400">
              {episodes} Episodes
            </p>
          )}
        </div>

      </article>
    </Link>
  )
}

export default AnimeCard