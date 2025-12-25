import { getMediaDetails, getImageUrl } from "@/lib/tmdb"
import { Navbar } from "@/components/navbar"
import { Play, Plus, ThumbsUp, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

interface WatchPageProps {
  params: Promise<{
    type: "movie" | "tv"
    id: string
  }>
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { type, id } = await params
  const mediaId = Number.parseInt(id)

  if (isNaN(mediaId)) {
    notFound()
  }

  const media = await getMediaDetails(mediaId, type)

  if (!media) {
    notFound()
  }

  const title = type === "movie" ? media.title : media.name
  const releaseDate = type === "movie" ? media.release_date : media.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A"
  const rating = media.vote_average?.toFixed(1) || "N/A"
  const backdropUrl = getImageUrl(media.backdrop_path, "original")
  const posterUrl = getImageUrl(media.poster_path)
  const runtime = type === "movie" ? `${media.runtime} min` : `${media.number_of_seasons} Seasons`

  const trailer = media.videos?.results?.find(
    (v: { type: string; site: string }) => v.type === "Trailer" && v.site === "YouTube",
  )

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Video Player Section */}
      <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
        {trailer ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&controls=1&modestbranding=1&rel=0`}
            title={`${title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url('${backdropUrl}')` }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative text-center space-y-4">
              <Play className="w-24 h-24 mx-auto text-white/80" />
              <p className="text-white/60 text-lg">Video player placeholder</p>
              <p className="text-white/40 text-sm">Trailer not available</p>
            </div>
          </div>
        )}
      </div>

      {/* Media Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div className="hidden md:block">
            <img
              src={posterUrl || "/placeholder.svg"}
              alt={title}
              className="w-full rounded-lg border border-white/10 shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">⭐ {rating}</span>
                <span>{year}</span>
                <span>{runtime}</span>
                {media.genres?.slice(0, 3).map((genre: { id: number; name: string }) => (
                  <span key={genre.id} className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-white text-black hover:bg-white/90">
                <Play className="mr-2 h-4 w-4 fill-current" />
                Play
              </Button>
              <Button variant="outline" className="border-white/10 bg-white/5">
                <Plus className="mr-2 h-4 w-4" />
                My List
              </Button>
              <Button variant="outline" size="icon" className="border-white/10 bg-white/5">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-white/10 bg-white/5">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{media.overview}</p>
            </div>

            {media.credits?.cast && (
              <div>
                <h2 className="text-xl font-bold mb-3">Cast</h2>
                <div className="flex flex-wrap gap-2">
                  {media.credits.cast.slice(0, 10).map((actor: { id: number; name: string }) => (
                    <span key={actor.id} className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10">
                      {actor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
