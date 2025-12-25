import { Play, Info, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MovieHero() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image / Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
        style={{
          backgroundImage: `url('/cinematic-movie-hero-background-interstellar-style.jpg')`,
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-2xl">
        <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/50">
            <span className="px-2 py-1 bg-white/10 rounded border border-white/10">Ultra HD</span>
            <span>2h 49m</span>
            <span>2024</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-balance">
            ETHEREAL <br /> VOYAGE
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Journey to the edge of the known universe in this visually stunning epic. A group of explorers must cross
            the horizon to save what remains of humanity.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              size="lg"
              className="h-12 px-8 rounded-md font-bold text-base bg-white text-black hover:bg-white/90"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Watch Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-md font-bold text-base border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
            >
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
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
