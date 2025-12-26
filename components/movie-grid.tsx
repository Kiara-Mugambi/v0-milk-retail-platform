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
import { Star } from "lucide-react"

interface MovieGridProps {
  title: string
  category:
    | "trending"
    | "popular"
    | "top_rated"
    | "upcoming"
    | "tv_popular"
    | "tv_top_rated"
    | "2025_premieres"
    | "comedy"
    | "crime"
    | "fantasy"
    | "scifi"
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
      case "2025_premieres":
        items = await fetchMoviesByCategory("2025_premieres")
        break
      default:
        items = await fetchMoviesByCategory(category)
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
    <section className="group/section space-y-16">
      <div className="flex items-end justify-between border-b border-primary/10 pb-8">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.5em] text-primary font-bold">2025 Premieres</p>
          <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tighter hover:text-primary transition-all duration-700 cursor-default">
            {title}
          </h2>
        </div>
        <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent mx-20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {displayItems.map((item) => {
          const mediaType = isMovie(item) ? "movie" : "tv"
          const itemTitle = getTitle(item)
          const year = getReleaseYear(item)
          const posterUrl = getImageUrl(item.poster_path)
          const rating = item.vote_average.toFixed(1)

          return (
            <Link key={item.id} href={`/watch/${mediaType}/${item.id}`} className="group relative overflow-hidden">
              <div className="flex flex-col gap-6 items-start group">
                <div className="relative aspect-[2/3] w-full flex-shrink-0 overflow-hidden rounded-lg bg-card ring-1 ring-border transition-all duration-700 group-hover:ring-primary/50 group-hover:shadow-[0_0_60px_rgba(241,196,15,0.15)] gradient-glow">
                  <img
                    src={posterUrl || "/placeholder.svg"}
                    alt={itemTitle}
                    className="object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-4 right-4 glass px-3 py-2 rounded-full flex items-center gap-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-bold text-white">{rating}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 glass-dark px-4 py-2 rounded-full">
                    <span className="text-xs uppercase tracking-wider text-white/80">{year}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-left">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                      {itemTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-2 group-hover:text-foreground transition-colors duration-500">
                    {item.overview}
                  </p>
                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-secondary border-b border-secondary pb-1">
                      Watch Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
