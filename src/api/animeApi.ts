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

    coverImage: {
      small: string
      large: string
    } | null

    startDate: string | null
    endDate: string | null
    ageRating: string | null
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

export async function getPopularAnime(): Promise<Anime[]> {
  const response  = await fetch(
    `${API_URL}/anime?page[limit]=10&sort=-userCount`
  )
  
  if (!response.ok) {
    throw new Error("Failed to fetch popular anime")
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

export type ExploreAnimeParams = {
  search?: string
  page?:number
  limit?: number
  sort?: string
  status?: "current" | "finished" | "upcoming" | ""
}

export type ExploreAnimeResult = {
  anime: Anime[]
  total: number
}

export async function getExploreAnime({
  search = "",
  page = 1,
  limit = 12,
  sort = "-userCount",
  status = "",
} : ExploreAnimeParams = {}): Promise<ExploreAnimeResult> {
  const params = new URLSearchParams()

  params.set("page[limit]", String(limit))
  params.set("page[offset]", String((page - 1) * limit))
  params.set("sort", sort)

  if (search.trim()) {
    params.set("filter[text]", search.trim())
  }

  if (status) {
    params.set("filter[status]", status.trim())
  }

  const response = await fetch(
    `${API_URL}/anime?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch anime")
  }

  const result: KitsuResponse & {
    meta?: {
       count?: number
    }
  } = await response.json()

  const anime: Anime[] = result.data.map((item) => ({
    id: item.id,
    title: item.attributes.canonicalTitle,
    image: item.attributes.posterImage?.large ?? "",
    rating: item.attributes.averageRating ?? undefined,
    episodes: item.attributes.episodeCount ?? undefined,
    status: item.attributes.status ?? undefined,
    synopsis: item.attributes.synopsis ?? undefined,
  }))

  return {
    anime,
    total: result.meta?.count ?? 0,
  }
}

export async function getAnimeById(id: string): Promise<Anime> {
  const response = await fetch(
    `${API_URL}/anime/${id}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch anime details")
  }

  const result: {data: KitsuAnime} = await response.json()

  const item = result.data

  return {
    id: item.id,
    title: item.attributes.canonicalTitle,
    image: item.attributes.posterImage?.large ?? "",
    coverImage: item.attributes.coverImage?.large ?? undefined,
    rating: item.attributes.averageRating ?? undefined,
    episodes: item.attributes.episodeCount ?? undefined,
    status: item.attributes.status ?? undefined,
    synopsis: item.attributes.synopsis ?? undefined,
    startDate: item.attributes.startDate ?? undefined,
    endDate: item.attributes.endDate ?? undefined,
    ageRating: item.attributes.ageRating ?? undefined,
  }
}