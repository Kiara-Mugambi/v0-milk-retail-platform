const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

const MOCK_DATA = {
  trending: [
    {
      id: 1,
      title: "INTERSTELLAR",
      overview: "The adventures of a group of explorers who make use of a newly discovered wormhole.",
      backdrop_path: "/cinematic-movie-hero-background-interstellar-style.jpg",
      poster_path: null,
      release_date: "2014-11-07",
      vote_average: 8.7,
      genre_ids: [18, 878, 12],
    },
    {
      id: 2,
      title: "THE DARK KNIGHT",
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
      backdrop_path: null,
      poster_path: null,
      release_date: "2008-07-18",
      vote_average: 9.0,
      genre_ids: [18, 28, 80],
    },
  ],
  movies: [
    {
      id: 101,
      title: "INCEPTION",
      release_date: "2010",
      vote_average: 8.8,
      overview: "A thief who steals corporate secrets...",
      poster_path: null,
      backdrop_path: null,
      genre_ids: [],
    },
    {
      id: 102,
      title: "OPPENHEIMER",
      release_date: "2023",
      vote_average: 8.5,
      overview: "The story of American scientist J. Robert Oppenheimer...",
      poster_path: null,
      backdrop_path: null,
      genre_ids: [],
    },
    {
      id: 103,
      title: "DUNE: PART TWO",
      release_date: "2024",
      vote_average: 8.9,
      overview: "Paul Atreides unites with Chani...",
      poster_path: null,
      backdrop_path: null,
      genre_ids: [],
    },
    {
      id: 104,
      title: "THE MATRIX",
      release_date: "1999",
      vote_average: 8.7,
      overview: "A computer hacker learns from mysterious rebels...",
      poster_path: null,
      backdrop_path: null,
      genre_ids: [],
    },
  ],
  tv: [
    {
      id: 201,
      name: "SUCCESSION",
      first_air_date: "2018",
      vote_average: 8.9,
      overview: "The Roy family is known for controlling the biggest media company...",
      poster_path: null,
      backdrop_path: null,
      genre_ids: [],
    },
    {
      id: 202,
      name: "THE BEAR",
      first_air_date: "2022",
      vote_average: 8.6,
      overview: "A young chef from the fine dining world...",
      poster_path: null,
      backdrop_path: null,
      genre_ids: [],
    },
  ],
}

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
  if (!TMDB_API_KEY) {
    return mediaType === "movie" ? (MOCK_DATA.trending as any) : (MOCK_DATA.tv as any)
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/trending/${mediaType}/week?api_key=${TMDB_API_KEY}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`[v0] TMDB API error (${response.status}):`, errorData.status_message || response.statusText)
      return []
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("[v0] Error fetching trending:", error)
    return []
  }
}

export async function fetchMoviesByCategory(category: "popular" | "top_rated" | "upcoming"): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    console.error("[v0] TMDB_API_KEY is not defined.")
    return []
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${category}?api_key=${TMDB_API_KEY}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error(`[v0] TMDB API error (${response.status}) fetching ${category} movies`)
      return []
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error(`[v0] Error fetching ${category} movies:`, error)
    return []
  }
}

export async function fetchTVShows(category: "popular" | "top_rated" | "on_the_air"): Promise<TVShow[]> {
  if (!TMDB_API_KEY) {
    console.error("[v0] TMDB_API_KEY is not defined.")
    return []
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${category}?api_key=${TMDB_API_KEY}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error(`[v0] TMDB API error (${response.status}) fetching ${category} TV shows`)
      return []
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error(`[v0] Error fetching ${category} TV shows:`, error)
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
  if (!TMDB_API_KEY) {
    console.error("[v0] TMDB_API_KEY is not defined.")
    return null
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`,
      { next: { revalidate: 3600 } },
    )

    if (!response.ok) {
      console.error(`[v0] TMDB API error (${response.status}) fetching details for ${mediaType} ${id}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching media details:", error)
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
