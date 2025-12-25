const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// Hardcoded movie and show data for a perfect "fake" streaming experience
const MOCK_DATA = {
  trending: [
    {
      id: 1,
      title: "INTERSTELLAR",
      overview:
        "When Earth becomes uninhabitable, a team of explorers undertakes the most important mission in human history: traveling beyond this galaxy to discover whether mankind has a future among the stars.",
      backdrop_path: "/batman-dark-knight-backdrop.jpg",
      poster_path: "/interstellar-inspired-poster.png",
      release_date: "2014-11-07",
      vote_average: 8.7,
      genre_ids: [18, 878, 12],
    },
    {
      id: 2,
      title: "THE DARK KNIGHT",
      overview:
        "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
      backdrop_path: "/oppenheimer-backdrop.jpg",
      poster_path: "/dark-knight-inspired-poster.png",
      release_date: "2008-07-18",
      vote_average: 9.0,
      genre_ids: [18, 28, 80],
    },
    {
      id: 3,
      title: "INCEPTION",
      overview:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      backdrop_path: "/inception-backdrop.jpg",
      poster_path: "/inception-inspired-poster.png",
      release_date: "2010-07-16",
      vote_average: 8.8,
      genre_ids: [28, 878, 12],
    },
  ],
  popular_movies: [
    {
      id: 101,
      title: "OPPENHEIMER",
      release_date: "2023-07-21",
      vote_average: 8.5,
      overview:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      poster_path: "/oppenheimer-poster.jpg",
      backdrop_path: "/oppenheimer-backdrop.jpg",
      genre_ids: [18, 36],
    },
    {
      id: 102,
      title: "DUNE: PART TWO",
      release_date: "2024-03-01",
      vote_average: 8.9,
      overview:
        "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
      poster_path: "/dune-2-poster.jpg",
      backdrop_path: "/dune-2-backdrop.jpg",
      genre_ids: [28, 12, 878],
    },
    {
      id: 103,
      title: "BLADE RUNNER 2049",
      release_date: "2017-10-06",
      vote_average: 8.3,
      overview:
        "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
      poster_path: "/blade-runner-2049-poster.jpg",
      backdrop_path: "/blade-runner-2049-backdrop.jpg",
      genre_ids: [18, 878],
    },
    {
      id: 104,
      title: "PARASITE",
      release_date: "2019-05-30",
      vote_average: 8.5,
      overview:
        "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
      poster_path: "/parasite-poster.jpg",
      backdrop_path: "/parasite-backdrop.jpg",
      genre_ids: [35, 18, 53],
    },
    {
      id: 105,
      title: "TENET",
      release_date: "2020-08-26",
      vote_average: 7.2,
      overview:
        "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage.",
      poster_path: "/tenet-poster.jpg",
      backdrop_path: "/tenet-backdrop.jpg",
      genre_ids: [28, 878, 53],
    },
    {
      id: 106,
      title: "THE PRESTIGE",
      release_date: "2006-10-19",
      vote_average: 8.2,
      overview:
        "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
      poster_path: "/the-prestige-poster.jpg",
      backdrop_path: "/the-prestige-backdrop.jpg",
      genre_ids: [18, 9648, 53],
    },
  ],
  popular_tv: [
    {
      id: 201,
      name: "SUCCESSION",
      first_air_date: "2018-06-03",
      vote_average: 8.9,
      overview:
        "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.",
      poster_path: "/succession-poster.jpg",
      backdrop_path: "/succession-backdrop.jpg",
      genre_ids: [18],
    },
    {
      id: 202,
      name: "THE BEAR",
      first_air_date: "2022-06-23",
      vote_average: 8.6,
      overview:
        "A young chef from the fine dining world comes home to Chicago to run his family sandwich shop after a heartbreaking death in his family.",
      poster_path: "/the-bear-poster.jpg",
      backdrop_path: "/the-bear-backdrop.jpg",
      genre_ids: [18, 35],
    },
    {
      id: 203,
      name: "DARK",
      first_air_date: "2017-12-01",
      vote_average: 8.4,
      overview:
        "A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.",
      poster_path: "/dark-series-poster.jpg",
      backdrop_path: "/dark-series-backdrop.jpg",
      genre_ids: [18, 9648, 878],
    },
    {
      id: 204,
      name: "THE LAST OF US",
      first_air_date: "2023-01-15",
      vote_average: 8.7,
      overview:
        "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
      poster_path: "/the-last-of-us-poster.jpg",
      backdrop_path: "/the-last-of-us-backdrop.jpg",
      genre_ids: [18, 10759, 10765],
    },
    {
      id: 205,
      name: "SHOGUN",
      first_air_date: "2024-02-27",
      vote_average: 8.8,
      overview:
        "In Japan in the year 1600, Lord Yoshii Toranaga is fighting for his life as his enemies on the Council of Regents unite against him.",
      poster_path: "/shogun-poster.jpg",
      backdrop_path: "/shogun-backdrop.jpg",
      genre_ids: [18, 10759],
    },
    {
      id: 206,
      name: "THE BOYS",
      first_air_date: "2019-07-26",
      vote_average: 8.5,
      overview: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
      poster_path: "/placeholder.svg?height=600&width=400",
      backdrop_path: "/placeholder.svg?height=1080&width=1920",
      genre_ids: [10759, 10765],
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
  // If it's a placeholder or local file, return as is
  if (path.startsWith("/") || path.startsWith("http")) return path
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export async function fetchTrending(mediaType: "movie" | "tv" = "movie"): Promise<MediaItem[]> {
  return mediaType === "movie" ? (MOCK_DATA.trending as any) : (MOCK_DATA.popular_tv as any)
}

export async function fetchMoviesByCategory(category: "popular" | "top_rated" | "upcoming"): Promise<Movie[]> {
  return MOCK_DATA.popular_movies as any
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
