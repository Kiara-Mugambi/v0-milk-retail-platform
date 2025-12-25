const TMDB_API_KEY = process.env.TMDB_API_KEY || "demo"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  genre_ids: number[]
}

export type MediaItem = Movie | TVShow

export function getImageUrl(path: string | null, size: "w500" | "original" = "w500"): string {
  if (!path) return "/placeholder.svg?height=600&width=400"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export async function fetchTrending(mediaType: "movie" | "tv" = "movie"): Promise<MediaItem[]> {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/trending/${mediaType}/week?api_key=${TMDB_API_KEY}`, {
      next: { revalidate: 3600 },
    })
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Error fetching trending:", error)
    return []
  }
}

export async function fetchMoviesByCategory(category: "popular" | "top_rated" | "upcoming"): Promise<Movie[]> {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${category}?api_key=${TMDB_API_KEY}`, {
      next: { revalidate: 3600 },
    })
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error)
    return []
  }
}

export async function fetchTVShows(category: "popular" | "top_rated" | "on_the_air"): Promise<TVShow[]> {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${category}?api_key=${TMDB_API_KEY}`, {
      next: { revalidate: 3600 },
    })
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error(`Error fetching ${category} TV shows:`, error)
    return []
  }
}

export async function searchMedia(query: string, mediaType: "movie" | "tv" | "multi" = "multi"): Promise<MediaItem[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/${mediaType}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
      { next: { revalidate: 3600 } },
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Error searching media:", error)
    return []
  }
}

export async function getMediaDetails(id: number, mediaType: "movie" | "tv") {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`,
      { next: { revalidate: 3600 } },
    )
    return await response.json()
  } catch (error) {
    console.error("Error fetching media details:", error)
    return null
  }
}

export function isMovie(item: MediaItem): item is Movie {
  return "title" in item
}

export function isTVShow(item: MediaItem): item is TVShow {
  return "name" in item
}

export function getTitle(item: MediaItem): string {
  return isMovie(item) ? item.title : item.name
}

export function getReleaseYear(item: MediaItem): string {
  const date = isMovie(item) ? item.release_date : item.first_air_date
  return date ? new Date(date).getFullYear().toString() : "N/A"
}
