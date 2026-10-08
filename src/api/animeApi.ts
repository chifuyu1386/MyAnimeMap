import type { Anime } from "../types/anime"

const API_URL = "https://kitsu.io/api/edge"

type KitsuAnime = {
  id: string
  attributes: {
    canonicalTitle: string
    averageRating: string | null
    episodeCount: number | null
    status: string | null
    synopsis: string | null
    posterImage: {
      small: string
      medium: string
      large: string
    } | null
  }
}

type KitsuResponse = {
  data: KitsuAnime[]
}

export async function getTrendingAnime(): Promise<Anime[]> {
  const response = await fetch(
    `${API_URL}/anime?page[limit]=10&sort=-averageRating`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch anime")
  }

  const result: KitsuResponse = await response.json()

  return result.data.map((anime) => ({
    id: anime.id,
    title: anime.attributes.canonicalTitle,
    image: anime.attributes.posterImage?.large ?? "",
    rating: anime.attributes.averageRating ?? undefined,
    episodes: anime.attributes.episodeCount ?? undefined,
    status: anime.attributes.status ?? undefined,
    synopsis: anime.attributes.synopsis ?? undefined,
  }))
}