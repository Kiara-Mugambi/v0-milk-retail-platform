import { Play, Info, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchTrending, getImageUrl, getTitle, isMovie } from "@/lib/tmdb"
import Link from "next/link"

export async function MovieHero() {
  let trending: any[] = []
  try {
    trending = await fetchTrending("movie")
  } catch (error) {
    console.error("[v0] MovieHero failed to fetch trending:", error)
  }

  const featuredMovie = trending && trending.length > 0 ? trending[0] : null

  if (!featuredMovie) {
    return null
  }

  const title = getTitle(featuredMovie)
  const overview = featuredMovie.overview
  const backdropUrl = getImageUrl(featuredMovie.backdrop_path, "original")
  const rating = featuredMovie.vote_average.toFixed(1)
  const year = isMovie(featuredMovie)
    ? featuredMovie.release_date?.split("-")[0]
    : featuredMovie.first_air_date?.split("-")[0]

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
        style={{
          backgroundImage: `url('${backdropUrl}')`,
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-2xl">
        <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/50">
            <span className="px-2 py-1 bg-white/10 rounded border border-white/10">⭐ {rating}</span>
            <span>{year}</span>
            <span className="px-2 py-1 bg-white/10 rounded border border-white/10">Featured</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-balance uppercase">
            {title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed text-pretty line-clamp-3">{overview}</p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href={`/watch/${isMovie(featuredMovie) ? "movie" : "tv"}/${featuredMovie.id}`}>
              <Button
                size="lg"
                className="h-12 px-8 rounded-md font-bold text-base bg-white text-black hover:bg-white/90"
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                Watch Now
              </Button>
            </Link>
            <Link href={`/watch/${isMovie(featuredMovie) ? "movie" : "tv"}/${featuredMovie.id}`}>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-md font-bold text-base border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
              >
                <Info className="mr-2 h-5 w-5" />
                More Info
              </Button>
            </Link>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-md border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
            >
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add to watchlist</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom accent border inspired by Vercel grid lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
    </section>
  )
}
