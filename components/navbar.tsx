"use client"

import Link from "next/link"
import { Search, User, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play className="w-5 h-5 text-black fill-current" />
            </div>
            <span className="font-bold tracking-tight text-xl uppercase">CineStream</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-white transition-colors">
              Movies
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              TV Shows
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Originals
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search movies..."
              className="h-9 w-64 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
