import { Play, Plus } from "lucide-react"
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

  if (!featuredMovie) return null

  const title = getTitle(featuredMovie)
  const backdropUrl = getImageUrl(featuredMovie.backdrop_path, "original")
  const year = isMovie(featuredMovie)
    ? featuredMovie.release_date?.split("-")[0]
    : featuredMovie.first_air_date?.split("-")[0]

  return (
    <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center border-b border-white/10 overflow-hidden spotlight">
      <div className="flex-1 w-full h-full p-8 md:p-20 flex flex-col justify-center gap-12 z-10 relative">
        <div className="absolute inset-0 glass-dark opacity-40 -z-10" />
        <div className="space-y-2 animate-in fade-in slide-in-from-left-8 duration-1000">
          <p className="text-xs uppercase tracking-[0.4em] font-medium text-primary">featured premiere • {year}</p>
          <h1 className="text-7xl md:text-[10rem] font-serif font-light tracking-tighter leading-[0.85] text-white drop-shadow-2xl">
            {title.split(" ")[0]}
            <br />
            <span className="opacity-40 italic text-secondary">{title.split(" ").slice(1).join(" ")}</span>
          </h1>
        </div>

        <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link href={`/watch/${isMovie(featuredMovie) ? "movie" : "tv"}/${featuredMovie.id}`}>
            <Button className="h-16 px-12 rounded-full font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20">
              <Play className="mr-3 h-6 w-6 fill-current" />
              Play Now
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors glass hover:glass-dark"
          >
            <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center group-hover:border-secondary transition-colors gradient-glow">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest">Add to list</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full h-[50vh] md:h-full relative overflow-hidden group">
        <img
          src={backdropUrl || "/placeholder.svg"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-[3000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent md:hidden" />
        <div className="absolute inset-0 glass opacity-0 group-hover:opacity-30 transition-opacity duration-1000" />
      </div>

      {/* Side navigation items inspired by premium cinema platforms */}
      <div className="absolute left-8 bottom-20 hidden lg:flex flex-col gap-8 text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
        <span className="hover:text-primary cursor-pointer transition-colors [writing-mode:vertical-lr] rotate-180">
          Instagram
        </span>
        <span className="hover:text-secondary cursor-pointer transition-colors [writing-mode:vertical-lr] rotate-180">
          Twitter
        </span>
        <span className="hover:text-primary cursor-pointer transition-colors [writing-mode:vertical-lr] rotate-180">
          Vimeo
        </span>
      </div>
    </section>
  )
}
