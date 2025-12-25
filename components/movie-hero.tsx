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
    <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center border-b border-white/10 overflow-hidden">
      <div className="flex-1 w-full h-full p-8 md:p-20 flex flex-col justify-center gap-12 z-10">
        <div className="space-y-2 animate-in fade-in slide-in-from-left-8 duration-1000">
          <p className="text-xs uppercase tracking-[0.4em] font-medium text-white/40">featured premiere • {year}</p>
          <h1 className="text-7xl md:text-[10rem] font-serif font-light tracking-tighter leading-[0.85] text-white">
            {title.split(" ")[0]}
            <br />
            <span className="opacity-40 italic">{title.split(" ").slice(1).join(" ")}</span>
          </h1>
        </div>

        <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link href={`/watch/${isMovie(featuredMovie) ? "movie" : "tv"}/${featuredMovie.id}`}>
            <Button className="h-16 px-12 rounded-full font-bold text-lg bg-white text-black hover:bg-white/90 transition-all hover:scale-105">
              <Play className="mr-3 h-6 w-6 fill-current" />
              Play Now
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
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
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />
      </div>

      {/* Side navigation items inspired by Gamma/Next.js */}
      <div className="absolute left-8 bottom-20 hidden lg:flex flex-col gap-8 text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
        <span className="hover:text-white cursor-pointer transition-colors [writing-mode:vertical-lr] rotate-180">
          Instagram
        </span>
        <span className="hover:text-white cursor-pointer transition-colors [writing-mode:vertical-lr] rotate-180">
          Twitter
        </span>
        <span className="hover:text-white cursor-pointer transition-colors [writing-mode:vertical-lr] rotate-180">
          Vimeo
        </span>
      </div>
    </section>
  )
}
