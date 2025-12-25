import { ChevronRight } from "lucide-react"

interface MovieGridProps {
  title: string
  category: string
}

export function MovieGrid({ title }: MovieGridProps) {
  // Mock data
  const movies = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Movie Title ${i + 1}`,
    image: `/placeholder.svg?height=600&width=400&query=movie poster aesthetic ${i}`,
    year: "2024",
    rating: "4.8",
  }))

  return (
    <section className="space-y-6 group">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          {title}
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform cursor-pointer" />
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative aspect-[2/3] group/card cursor-pointer overflow-hidden rounded-lg border border-white/5 bg-card transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/5"
          >
            <img
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              className="object-cover w-full h-full grayscale-[0.2] group-hover/card:grayscale-0 transition-all duration-500"
            />

            {/* Hover overlay inspired by Vercel dashboard hover states */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="font-bold text-sm leading-tight mb-1">{movie.title}</p>
              <div className="flex items-center justify-between text-[10px] font-bold text-white/60">
                <span>{movie.year}</span>
                <span className="text-white">⭐ {movie.rating}</span>
              </div>
            </div>

            {/* High-end border shine effect */}
            <div className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none group-hover/card:border-white/40 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  )
}
