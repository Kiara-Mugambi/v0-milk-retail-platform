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
  category: "trending" | "popular" | "top_rated" | "upcoming" | "tv_popular" | "tv_top_rated" | "2025_premieres"
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
      <div className="flex items-end justify-between border-b border-white/5 pb-8">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.5em] text-accent font-bold animate-pulse">2025 Premieres</p>
          <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tighter italic hover:not-italic transition-all duration-700 cursor-default">
            {title}
          </h2>
        </div>
        <div className="hidden md:block h-px flex-1 bg-white/5 mx-20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-2 gap-y-24">
        {displayItems.map((item) => {
          const mediaType = isMovie(item) ? "movie" : "tv"
          const itemTitle = getTitle(item)
          const year = getReleaseYear(item)
          const posterUrl = getImageUrl(item.poster_path)

          return (
            <Link key={item.id} href={`/watch/${mediaType}/${item.id}`} className="group relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
                <div className="relative aspect-[3/4] w-full md:w-64 flex-shrink-0 overflow-hidden bg-white/5 ring-1 ring-white/10 transition-all duration-700 group-hover:ring-accent/50 group-hover:shadow-[0_0_40px_rgba(225,29,72,0.1)]">
                  <img
                    src={posterUrl || "/placeholder.svg"}
                    alt={itemTitle}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex-1 space-y-6 text-center md:text-left py-4">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{year} • Premiere</p>
                    <h3 className="text-2xl md:text-4xl font-serif font-light tracking-tight text-white group-hover:text-accent transition-colors duration-500 italic">
                      {itemTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed max-w-md font-light line-clamp-3 group-hover:text-white/80 transition-colors duration-500">
                    {item.overview}
                  </p>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <span className="text-[11px] uppercase tracking-[0.4em] font-bold border-b border-accent pb-1">
                      Explore Details
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
