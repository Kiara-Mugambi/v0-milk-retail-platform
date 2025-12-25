import { MovieHero } from "@/components/movie-hero"
import { MovieGrid } from "@/components/movie-grid"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background grid-pattern">
      <Navbar />
      <MovieHero />

      <div className="container mx-auto px-4 py-12 space-y-16">
        <MovieGrid title="Trending Now" category="trending" />
        <MovieGrid title="New Releases" category="new" />
        <MovieGrid title="Critically Acclaimed" category="top" />
      </div>

      <footer className="border-t border-border mt-24 py-12 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 CineStream. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
