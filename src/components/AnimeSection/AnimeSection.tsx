import type { Anime } from "../../types/anime";
import AnimeCard from "../AnimeCard/AnimeCard";


type AnimeSectionProps = {
  title: string
  anime: Anime[]
}

function AnimeSection({title, anime}: AnimeSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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