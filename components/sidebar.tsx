"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft, LayoutDashboard, TrendingUp, Activity, Lock, Settings, LogOut } from "lucide-react"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>("sales")

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "#",
    },
    {
      id: "sales",
      label: "Sales Analytics",
      icon: TrendingUp,
      submenu: [
        { label: "Weekly", href: "#" },
        { label: "Monthly", href: "#" },
        { label: "Peak Hours", href: "#" },
      ],
    },
    {
      id: "devices",
      label: "ATM Devices",
      icon: Activity,
      submenu: [
        { label: "All Devices", href: "#" },
        { label: "Device Status", href: "#" },
        { label: "Alerts", href: "#" },
      ],
    },
    {
      id: "security",
      label: "Tamper Detection",
      icon: Lock,
      href: "#",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "#",
    },
  ]

  return (
    <aside
      className={`flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
        {open && <h1 className="text-lg font-bold text-sidebar-primary">Wantime Cinema</h1>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenChange(!open)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${!open ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <Button
              variant="ghost"
              className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                expandedMenu === item.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
              }`}
              onClick={() => item.submenu && setExpandedMenu(expandedMenu === item.id ? null : item.id)}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {open && (
                <>
                  <span className="ml-3 flex-1 text-left">{item.label}</span>
                  {item.submenu && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expandedMenu === item.id ? "rotate-180" : ""}`}
                    />
                  )}
                </>
              )}
            </Button>

            {/* Submenu */}
            {open && item.submenu && expandedMenu === item.id && (
              <div className="ml-4 space-y-1 border-l border-sidebar-border">
                {item.submenu.map((subitem) => (
                  <Button
                    key={subitem.label}
                    variant="ghost"
                    className="w-full justify-start text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <span className="ml-3">{subitem.label}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        {open && <p className="text-xs text-sidebar-foreground mb-3">Cinema Management</p>}
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {open && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
