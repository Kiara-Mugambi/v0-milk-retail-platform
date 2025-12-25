import { ChevronRight } from "lucide-react"
import Link from "next/link"
import {
  fetchMoviesByCategory,
  fetchTVShows,
  fetchTrending,
  getImageUrl,
  getTitle,
  getReleaseYear,
  isMovie,
  type MediaItem,
} from "@/lib/tmdb"

interface MovieGridProps {
  title: string
  category: "trending" | "popular" | "top_rated" | "upcoming" | "tv_popular" | "tv_top_rated"
}

export async function MovieGrid({ title, category }: MovieGridProps) {
  let items: MediaItem[] = []

  try {
    switch (category) {
      case "trending":
        items = await fetchTrending("movie")
        break
      case "popular":
        items = await fetchMoviesByCategory("popular")
        break
      case "top_rated":
        items = await fetchMoviesByCategory("top_rated")
        break
      case "upcoming":
        items = await fetchMoviesByCategory("upcoming")
        break
      case "tv_popular":
        items = await fetchTVShows("popular")
        break
      case "tv_top_rated":
        items = await fetchTVShows("top_rated")
        break
    }
  } catch (error) {
    console.error(`[v0] MovieGrid failed to fetch ${category}:`, error)
  }

  if (!items || items.length === 0) {
    return (
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className="h-40 flex items-center justify-center rounded-lg border border-dashed border-white/10 bg-muted/5">
          <p className="text-sm text-muted-foreground">No data available. Please check your TMDB_API_KEY.</p>
        </div>
      </section>
    )
  }

  const displayItems = items.slice(0, 6)

  return (
    <section className="space-y-6 group">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          {title}
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform cursor-pointer" />
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {displayItems.map((item) => {
          const mediaType = isMovie(item) ? "movie" : "tv"
          const itemTitle = getTitle(item)
          const year = getReleaseYear(item)
          const rating = item.vote_average.toFixed(1)
          const posterUrl = getImageUrl(item.poster_path)

          return (
            <Link key={item.id} href={`/watch/${mediaType}/${item.id}`}>
              <div className="relative aspect-[2/3] group/card cursor-pointer overflow-hidden rounded-lg border border-white/5 bg-card transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/5">
                <img
                  src={posterUrl || "/placeholder.svg"}
                  alt={itemTitle}
                  className="object-cover w-full h-full grayscale-[0.2] group-hover/card:grayscale-0 transition-all duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="font-bold text-sm leading-tight mb-1 line-clamp-2">{itemTitle}</p>
                  <div className="flex items-center justify-between text-[10px] font-bold text-white/60">
                    <span>{year}</span>
                    <span className="text-white">⭐ {rating}</span>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none group-hover/card:border-white/40 transition-colors" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
