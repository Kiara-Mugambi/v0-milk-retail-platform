const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// Hardcoded movie and show data for a perfect "fake" streaming experience
const MOCK_DATA = {
  trending: [
    {
      id: 1,
      title: "SOLARIS 2025",
      overview:
        "In a future where stars are harvested for energy, a rogue engineer discovers a signal from a dead sun that could rewrite the history of the galaxy.",
      backdrop_path: "/scifi-cinema.jpg",
      poster_path: "/scifi-movie.jpg",
      release_date: "2025-03-15",
      vote_average: 8.9,
      genre_ids: [878, 12],
    },
    {
      id: 2,
      title: "NEON JUSTICE",
      overview:
        "A detective in a sprawling mega-city uncovers a conspiracy involving the world's first digital deity during the 2025 energy riots.",
      backdrop_path: "/cyberpunk-city.jpg",
      poster_path: "/crime-thriller.jpg",
      release_date: "2025-06-12",
      vote_average: 8.4,
      genre_ids: [80, 53],
    },
    {
      id: 3,
      title: "THE LAST REALM",
      overview:
        "As the barriers between worlds thin, a young mage must navigate a war between ancient dragons and industrial giants in 2025.",
      backdrop_path: "/fantasy-landscape.jpg",
      poster_path: "/fantasy-movie.jpg",
      release_date: "2025-11-20",
      vote_average: 9.1,
      genre_ids: [14, 12],
    },
  ],
  comedy: [
    {
      id: 301,
      title: "OFFICE GHOSTS",
      release_date: "2025-02-10",
      vote_average: 7.8,
      overview: "A startup hires a group of ghosts to save on electricity, but they start demanding equity.",
      poster_path: "/comedy-poster-1.jpg",
      genre_ids: [35],
    },
    {
      id: 302,
      title: "LUNAR HONEYMOON",
      release_date: "2025-04-15",
      vote_average: 7.2,
      overview: "The first couple to marry on the moon finds out that zero-gravity arguments are much messier.",
      poster_path: "/comedy-poster-2.jpg",
      genre_ids: [35, 10749],
    },
  ],
  crime: [
    {
      id: 401,
      title: "SILICON HEIST",
      release_date: "2025-05-20",
      vote_average: 8.5,
      overview: "A group of retired hackers attempts to steal a physical crypto-key from a high-security vault.",
      poster_path: "/crime-poster-1.jpg",
      genre_ids: [80, 53],
    },
    {
      id: 402,
      title: "THE INFORMANT",
      release_date: "2025-08-12",
      vote_average: 8.1,
      overview: "An undercover agent gets too deep into a 2025 biotech smuggling ring.",
      poster_path: "/crime-poster-2.jpg",
      genre_ids: [80, 9648],
    },
  ],
  fantasy: [
    {
      id: 501,
      title: "DRAGON TIDE",
      release_date: "2025-09-05",
      vote_average: 8.8,
      overview: "When the oceans rise, ancient leviathans awaken to reclaim their territory.",
      poster_path: "/fantasy-poster-1.jpg",
      genre_ids: [14, 12],
    },
    {
      id: 502,
      title: "IRON MAGIC",
      release_date: "2025-10-18",
      vote_average: 8.3,
      overview: "In a world where magic is powered by scrap metal, one girl builds a golem to save her city.",
      poster_path: "/fantasy-poster-2.jpg",
      genre_ids: [14, 28],
    },
  ],
  scifi: [
    {
      id: 601,
      title: "MARS COLONY X",
      release_date: "2025-12-25",
      vote_average: 9.0,
      overview: "The first independent Martian settlement faces a choice: stay loyal to Earth or start anew.",
      poster_path: "/scifi-poster-1.jpg",
      genre_ids: [878],
    },
    {
      id: 602,
      title: "QUANTUM LINK",
      release_date: "2025-07-04",
      vote_average: 7.9,
      overview: "A scientist discovers how to message her past self, but every text deletes a memory.",
      poster_path: "/scifi-poster-2.jpg",
      genre_ids: [878, 18],
    },
  ],
  popular_movies: [], // Empty to avoid repetition
  popular_tv: [],
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
  // If it's a placeholder or local file, return as is
  if (path.startsWith("/") || path.startsWith("http")) return path
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export async function fetchTrending(mediaType: "movie" | "tv" = "movie"): Promise<MediaItem[]> {
  return mediaType === "movie" ? (MOCK_DATA.trending as any) : (MOCK_DATA.popular_tv as any)
}

export async function fetchMoviesByCategory(category: string): Promise<Movie[]> {
  return (MOCK_DATA as any)[category] || []
}

export async function fetchTVShows(category: "popular" | "top_rated" | "on_the_air"): Promise<TVShow[]> {
  return MOCK_DATA.popular_tv as any
}

export async function searchMedia(query: string, mediaType: "movie" | "tv" | "multi" = "multi"): Promise<MediaItem[]> {
  const allItems = [...MOCK_DATA.trending, ...MOCK_DATA.popular_movies, ...MOCK_DATA.popular_tv]
  return allItems.filter((item: any) => (item.title || item.name).toLowerCase().includes(query.toLowerCase())) as any
}

export async function getMediaDetails(id: number, mediaType: "movie" | "tv") {
  const allItems = [...MOCK_DATA.trending, ...MOCK_DATA.popular_movies, ...MOCK_DATA.popular_tv]
  const item = allItems.find((i) => i.id === id)
  if (!item) return null

  // Add dummy videos and credits for the watch page
  return {
    ...item,
    videos: { results: [{ key: "dQw4w9WgXcQ", site: "YouTube", type: "Trailer" }] },
    credits: {
      cast: [
        { name: "Actor One", character: "Character One" },
        { name: "Actor Two", character: "Character Two" },
      ],
    },
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
