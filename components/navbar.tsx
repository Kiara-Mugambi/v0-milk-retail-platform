"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-8 h-20 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center bg-primary/5">
          <div className="w-1 h-1 bg-primary rounded-full" />
        </div>
        <span className="text-sm uppercase tracking-[0.2em] font-medium text-muted-foreground">menu</span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
        <Link href="/" className="font-serif text-2xl tracking-tighter hover:opacity-70 transition-opacity">
          <span className="text-gradient-blue">Dairy</span>
          <span className="text-gradient-green">Sight</span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground ml-2">Cinema</span>
        </Link>
      </div>

      <div className="flex items-center gap-6 pointer-events-auto">
        <Button
          variant="outline"
          className="rounded-full px-6 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
        >
          subscribe
        </Button>
      </div>
    </nav>
  )
}
