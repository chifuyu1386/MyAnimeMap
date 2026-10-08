type AnimeCardProps = {
  title: string
  image: string
  rating?: string
  episodes?: number 
}

function AnimeCard({title, image, rating, episodes} : AnimeCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07]">

      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Rating */}
        {rating && (
          <div className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs font-medium text-blue-300 backdrop-blur-md">
            ★ {rating}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">

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
  )
}

export default AnimeCard