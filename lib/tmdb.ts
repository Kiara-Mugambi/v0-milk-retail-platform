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
      overview:
        "A startup hires a group of ghosts to save on electricity, but they start demanding equity and benefits.",
      poster_path: "/comedy-poster-1.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [35],
    },
    {
      id: 302,
      title: "LUNAR HONEYMOON",
      release_date: "2025-04-15",
      vote_average: 7.2,
      overview:
        "The first couple to marry on the moon finds out that zero-gravity arguments are much messier than expected.",
      poster_path: "/comedy-poster-2.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [35, 10749],
    },
    {
      id: 303,
      title: "THE INFLUENCER HEIST",
      release_date: "2025-05-22",
      vote_average: 8.0,
      overview:
        "A down-on-his-luck comedian teams up with social media stars to pull off the world's first livestreamed robbery.",
      poster_path: "/comedy-influencer-heist-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [35, 80],
    },
    {
      id: 304,
      title: "ALGORITHM OF LOVE",
      release_date: "2025-07-08",
      vote_average: 7.5,
      overview: "An AI dating app becomes sentient and starts sabotaging its own matches for comedic chaos.",
      poster_path: "/ai-love-algorithm-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [35, 10749],
    },
    {
      id: 305,
      title: "RETIREMENT NINJAS",
      release_date: "2025-09-14",
      vote_average: 7.9,
      overview: "A group of retired assassins open a bed and breakfast, but old enemies check in for revenge.",
      poster_path: "/retirement-ninja-comedy-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [35, 28],
    },
    {
      id: 306,
      title: "FOODIE WARS",
      release_date: "2025-11-03",
      vote_average: 7.3,
      overview: "Celebrity chefs compete in an underground cooking tournament where the stakes are hilariously high.",
      poster_path: "/foodie-wars-comedy-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [35],
    },
  ],
  crime: [
    {
      id: 401,
      title: "SILICON HEIST",
      release_date: "2025-05-20",
      vote_average: 8.5,
      overview:
        "A group of retired hackers attempts to steal a physical crypto-key from a high-security vault before it's destroyed.",
      poster_path: "/crime-poster-1.jpg",
      backdrop_path: "/crime-thriller.jpg",
      genre_ids: [80, 53],
    },
    {
      id: 402,
      title: "THE INFORMANT",
      release_date: "2025-08-12",
      vote_average: 8.1,
      overview:
        "An undercover agent gets too deep into a 2025 biotech smuggling ring and must decide where his loyalties lie.",
      poster_path: "/crime-poster-2.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [80, 9648],
    },
    {
      id: 403,
      title: "BLACKOUT PROTOCOL",
      release_date: "2025-03-28",
      vote_average: 8.7,
      overview:
        "When a city's power grid is hijacked, a former detective must navigate the darkened streets to stop a conspiracy.",
      poster_path: "/blackout-protocol-crime-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [80, 53],
    },
    {
      id: 404,
      title: "BLOOD CURRENCY",
      release_date: "2025-06-19",
      vote_average: 8.3,
      overview: "A forensic accountant uncovers a trail of dirty money leading to the world's most dangerous cartel.",
      poster_path: "/blood-currency-crime-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [80, 18],
    },
    {
      id: 405,
      title: "THE WIRE ACT",
      release_date: "2025-10-05",
      vote_average: 8.6,
      overview: "A master thief plans one last job: stealing data from a government server during a live broadcast.",
      poster_path: "/the-wire-act-crime-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [80, 53],
    },
    {
      id: 406,
      title: "SHADOW SYNDICATE",
      release_date: "2025-12-17",
      vote_average: 8.9,
      overview:
        "An elite task force goes undercover to dismantle an international crime network operating in plain sight.",
      poster_path: "/shadow-syndicate-crime-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [80, 28],
    },
  ],
  fantasy: [
    {
      id: 501,
      title: "DRAGON TIDE",
      release_date: "2025-09-05",
      vote_average: 8.8,
      overview: "When the oceans rise, ancient leviathans awaken to reclaim their territory from humanity.",
      poster_path: "/fantasy-poster-1.jpg",
      backdrop_path: "/fantasy-landscape.jpg",
      genre_ids: [14, 12],
    },
    {
      id: 502,
      title: "IRON MAGIC",
      release_date: "2025-10-18",
      vote_average: 8.3,
      overview:
        "In a world where magic is powered by scrap metal, one girl builds a golem to save her city from destruction.",
      poster_path: "/fantasy-poster-2.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [14, 28],
    },
    {
      id: 503,
      title: "THE SORCERER'S GAMBIT",
      release_date: "2025-04-11",
      vote_average: 8.6,
      overview:
        "A chess prodigy discovers that every move she makes in the game affects reality in a parallel magical realm.",
      poster_path: "/sorcerers-gambit-fantasy-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [14, 18],
    },
    {
      id: 504,
      title: "CROWN OF SHADOWS",
      release_date: "2025-07-25",
      vote_average: 9.0,
      overview:
        "A forgotten heir must unite warring kingdoms using an ancient crown that grants visions of the future.",
      poster_path: "/crown-of-shadows-fantasy-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [14, 12],
    },
    {
      id: 505,
      title: "STARFALL PROPHECY",
      release_date: "2025-11-30",
      vote_average: 8.4,
      overview:
        "When stars begin to fall from the sky, a young astronomer learns she's the key to preventing an apocalypse.",
      poster_path: "/starfall-prophecy-fantasy-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [14, 12],
    },
    {
      id: 506,
      title: "WITCHWOOD",
      release_date: "2025-02-21",
      vote_average: 7.9,
      overview: "A wandering witch must protect a sentient forest from industrialists who seek to harvest its magic.",
      poster_path: "/witchwood-fantasy-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [14, 18],
    },
  ],
  scifi: [
    {
      id: 601,
      title: "MARS COLONY X",
      release_date: "2025-12-25",
      vote_average: 9.0,
      overview:
        "The first independent Martian settlement faces a choice: stay loyal to Earth or start a new civilization.",
      poster_path: "/scifi-poster-1.jpg",
      backdrop_path: "/scifi-cinema.jpg",
      genre_ids: [878],
    },
    {
      id: 602,
      title: "QUANTUM LINK",
      release_date: "2025-07-04",
      vote_average: 7.9,
      overview: "A scientist discovers how to message her past self, but every text deletes a precious memory.",
      poster_path: "/scifi-poster-2.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [878, 18],
    },
    {
      id: 603,
      title: "VOID RUNNERS",
      release_date: "2025-03-09",
      vote_average: 8.5,
      overview:
        "Elite smugglers navigate the dark space between galaxies, where physics breaks down and nightmares live.",
      poster_path: "/void-runners-scifi-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [878, 12],
    },
    {
      id: 604,
      title: "NEURAL BREACH",
      release_date: "2025-06-15",
      vote_average: 8.7,
      overview: "A hacker infiltrates the collective consciousness of humanity to stop a rogue AI from taking control.",
      poster_path: "/neural-breach-scifi-poster.jpg",
      backdrop_path: "/cyberpunk-city.jpg",
      genre_ids: [878, 53],
    },
    {
      id: 605,
      title: "GENESIS PROTOCOL",
      release_date: "2025-09-22",
      vote_average: 9.2,
      overview:
        "Scientists create the first artificial planet, but it develops its own consciousness and demands freedom.",
      poster_path: "/genesis-protocol-scifi-poster.jpg",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [878, 18],
    },
    {
      id: 606,
      title: "CRYOSLEEP",
      release_date: "2025-11-14",
      vote_average: 8.2,
      overview: "A deep-space crew awakens 200 years late to find Earth has forgotten them and moved on.",
      poster_path: "/placeholder.svg?height=600&width=400",
      backdrop_path: "/placeholder.jpg",
      genre_ids: [878, 18],
    },
  ],
  popular_movies: [],
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
