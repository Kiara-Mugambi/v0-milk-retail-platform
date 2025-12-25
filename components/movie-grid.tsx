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
    <section className="space-y-12">
      <div className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Category</p>
        <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">{title}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-20">
        {displayItems.map((item) => {
          const mediaType = isMovie(item) ? "movie" : "tv"
          const itemTitle = getTitle(item)
          const year = getReleaseYear(item)
          const posterUrl = getImageUrl(item.poster_path)

          return (
            <Link key={item.id} href={`/watch/${mediaType}/${item.id}`} className="group cursor-pointer">
              <div className="space-y-6">
                <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                  <img
                    src={posterUrl || "/placeholder.svg"}
                    alt={itemTitle}
                    className="object-cover w-full h-full grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h3 className="text-lg font-medium tracking-tight group-hover:text-white/70 transition-colors uppercase leading-tight">
                    {itemTitle}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">{year}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
