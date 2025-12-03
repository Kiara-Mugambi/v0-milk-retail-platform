"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertCircle, Activity, DollarSign } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Sales (This Week)",
      value: "KES 125,400",
      icon: DollarSign,
      trend: "+12.5%",
      positive: true,
    },
    {
      title: "Active Devices",
      value: "8 / 10",
      icon: Activity,
      trend: "80% uptime",
      positive: true,
    },
    {
      title: "Peak Hour",
      value: "6 PM - 8 PM",
      icon: TrendingUp,
      trend: "2,400 units sold",
      positive: true,
    },
    {
      title: "Alerts",
      value: "2",
      icon: AlertCircle,
      trend: "Requires attention",
      positive: false,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.positive ? "text-primary" : "text-destructive"}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-xs ${stat.positive ? "text-primary" : "text-destructive"}`}>{stat.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to MilkVend Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90">
            Monitor your milk ATM devices, track sales patterns, and ensure product integrity all in one place. Your
            vending network is running smoothly.
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-input">
                  <div>
                    <p className="text-sm font-medium text-foreground">Transaction #{1000 + i}</p>
                    <p className="text-xs text-muted-foreground">MPESA • Device ATM-{i}</p>
                  </div>
                  <p className="font-semibold text-primary">KES 500</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["ATM-1", "ATM-2", "ATM-3"].map((device, i) => (
                <div key={device} className="flex items-center justify-between p-3 rounded-lg bg-input">
                  <div>
                    <p className="text-sm font-medium text-foreground">{device}</p>
                    <p className="text-xs text-muted-foreground">Stock: {100 - i * 10}L</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${i === 2 ? "bg-destructive" : "bg-primary"}`}></div>
                    <span className="text-xs text-muted-foreground">{i === 2 ? "Alert" : "Online"}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
