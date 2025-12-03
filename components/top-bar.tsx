"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell, User, Search } from "lucide-react"

interface TopBarProps {
  onToggleSidebar: () => void
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="text-foreground hover:bg-muted">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center bg-input rounded-lg px-3 py-2 gap-2 w-64">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search devices, transactions..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
