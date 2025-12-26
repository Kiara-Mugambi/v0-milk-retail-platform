import { MovieHero } from "@/components/movie-hero"
import { MovieGrid } from "@/components/movie-grid"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative grid-pattern">
      <div className="film-grain" />
      <Navbar />
      <MovieHero />

      <div className="container mx-auto px-8 py-32 space-y-48">
        <MovieGrid title="Comedy Premieres" category="comedy" />
        <MovieGrid title="Crime & Intrigue" category="crime" />
        <MovieGrid title="Fantasy Realms" category="fantasy" />
        <MovieGrid title="Future Visions" category="scifi" />
      </div>

      <footer className="border-t border-white/5 py-32 bg-black relative z-10 spotlight">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-serif text-3xl tracking-tighter">
              <span className="text-gradient-blue">Dairy</span>
              <span className="text-gradient-green">Sight</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground ml-2">Cinema</span>
            </span>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Experience True Cinema.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
              <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Support</span>
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-bold">
              All rights reserved by SanaTech Solutions. © 2025
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
