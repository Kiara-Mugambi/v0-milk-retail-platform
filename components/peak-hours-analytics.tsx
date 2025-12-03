"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Clock, AlertCircle, Target } from "lucide-react"

export function PeakHoursAnalytics() {
  const [selectedDay, setSelectedDay] = useState<string>("monday")
  const [selectedDevice, setSelectedDevice] = useState<string>("all")

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const dayNames = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  }

  // Hourly data for different days
  const hourlyData = {
    monday: [
      { hour: "6 AM", sales: 120, units: 24, customers: 18 },
      { hour: "7 AM", sales: 280, units: 56, customers: 42 },
      { hour: "8 AM", sales: 580, units: 116, customers: 87 },
      { hour: "9 AM", sales: 450, units: 90, customers: 68 },
      { hour: "10 AM", sales: 320, units: 64, customers: 48 },
      { hour: "11 AM", sales: 380, units: 76, customers: 57 },
      { hour: "12 PM", sales: 620, units: 124, customers: 93 },
      { hour: "1 PM", sales: 540, units: 108, customers: 81 },
      { hour: "2 PM", sales: 400, units: 80, customers: 60 },
      { hour: "3 PM", sales: 480, units: 96, customers: 72 },
      { hour: "4 PM", sales: 720, units: 144, customers: 108 },
      { hour: "5 PM", sales: 890, units: 178, customers: 134 },
      { hour: "6 PM", sales: 1200, units: 240, customers: 180 },
      { hour: "7 PM", sales: 1320, units: 264, customers: 198 },
      { hour: "8 PM", sales: 980, units: 196, customers: 147 },
      { hour: "9 PM", sales: 640, units: 128, customers: 96 },
      { hour: "10 PM", sales: 320, units: 64, customers: 48 },
      { hour: "11 PM", sales: 120, units: 24, customers: 18 },
    ],
    friday: [
      { hour: "6 AM", sales: 140, units: 28, customers: 21 },
      { hour: "7 AM", sales: 320, units: 64, customers: 48 },
      { hour: "8 AM", sales: 720, units: 144, customers: 108 },
      { hour: "9 AM", sales: 580, units: 116, customers: 87 },
      { hour: "10 AM", sales: 420, units: 84, customers: 63 },
      { hour: "11 AM", sales: 520, units: 104, customers: 78 },
      { hour: "12 PM", sales: 880, units: 176, customers: 132 },
      { hour: "1 PM", sales: 760, units: 152, customers: 114 },
      { hour: "2 PM", sales: 580, units: 116, customers: 87 },
      { hour: "3 PM", sales: 640, units: 128, customers: 96 },
      { hour: "4 PM", sales: 920, units: 184, customers: 138 },
      { hour: "5 PM", sales: 1240, units: 248, customers: 186 },
      { hour: "6 PM", sales: 1580, units: 316, customers: 237 },
      { hour: "7 PM", sales: 1720, units: 344, customers: 258 },
      { hour: "8 PM", sales: 1320, units: 264, customers: 198 },
      { hour: "9 PM", sales: 840, units: 168, customers: 126 },
      { hour: "10 PM", sales: 420, units: 84, customers: 63 },
      { hour: "11 PM", sales: 180, units: 36, customers: 27 },
    ],
    saturday: [
      { hour: "6 AM", sales: 160, units: 32, customers: 24 },
      { hour: "7 AM", sales: 280, units: 56, customers: 42 },
      { hour: "8 AM", sales: 480, units: 96, customers: 72 },
      { hour: "9 AM", sales: 620, units: 124, customers: 93 },
      { hour: "10 AM", sales: 840, units: 168, customers: 126 },
      { hour: "11 AM", sales: 980, units: 196, customers: 147 },
      { hour: "12 PM", sales: 1200, units: 240, customers: 180 },
      { hour: "1 PM", sales: 1080, units: 216, customers: 162 },
      { hour: "2 PM", sales: 920, units: 184, customers: 138 },
      { hour: "3 PM", sales: 1040, units: 208, customers: 156 },
      { hour: "4 PM", sales: 1320, units: 264, customers: 198 },
      { hour: "5 PM", sales: 1580, units: 316, customers: 237 },
      { hour: "6 PM", sales: 1840, units: 368, customers: 276 },
      { hour: "7 PM", sales: 1920, units: 384, customers: 288 },
      { hour: "8 PM", sales: 1620, units: 324, customers: 243 },
      { hour: "9 PM", sales: 1040, units: 208, customers: 156 },
      { hour: "10 PM", sales: 580, units: 116, customers: 87 },
      { hour: "11 PM", sales: 240, units: 48, customers: 36 },
    ],
  }

  // Fill other days with generic data
  const generateDayData = (multiplier: number) => [
    {
      hour: "6 AM",
      sales: Math.round(120 * multiplier),
      units: Math.round(24 * multiplier),
      customers: Math.round(18 * multiplier),
    },
    {
      hour: "7 AM",
      sales: Math.round(280 * multiplier),
      units: Math.round(56 * multiplier),
      customers: Math.round(42 * multiplier),
    },
    {
      hour: "8 AM",
      sales: Math.round(580 * multiplier),
      units: Math.round(116 * multiplier),
      customers: Math.round(87 * multiplier),
    },
    {
      hour: "9 AM",
      sales: Math.round(450 * multiplier),
      units: Math.round(90 * multiplier),
      customers: Math.round(68 * multiplier),
    },
    {
      hour: "10 AM",
      sales: Math.round(320 * multiplier),
      units: Math.round(64 * multiplier),
      customers: Math.round(48 * multiplier),
    },
    {
      hour: "11 AM",
      sales: Math.round(380 * multiplier),
      units: Math.round(76 * multiplier),
      customers: Math.round(57 * multiplier),
    },
    {
      hour: "12 PM",
      sales: Math.round(620 * multiplier),
      units: Math.round(124 * multiplier),
      customers: Math.round(93 * multiplier),
    },
    {
      hour: "1 PM",
      sales: Math.round(540 * multiplier),
      units: Math.round(108 * multiplier),
      customers: Math.round(81 * multiplier),
    },
    {
      hour: "2 PM",
      sales: Math.round(400 * multiplier),
      units: Math.round(80 * multiplier),
      customers: Math.round(60 * multiplier),
    },
    {
      hour: "3 PM",
      sales: Math.round(480 * multiplier),
      units: Math.round(96 * multiplier),
      customers: Math.round(72 * multiplier),
    },
    {
      hour: "4 PM",
      sales: Math.round(720 * multiplier),
      units: Math.round(144 * multiplier),
      customers: Math.round(108 * multiplier),
    },
    {
      hour: "5 PM",
      sales: Math.round(890 * multiplier),
      units: Math.round(178 * multiplier),
      customers: Math.round(134 * multiplier),
    },
    {
      hour: "6 PM",
      sales: Math.round(1200 * multiplier),
      units: Math.round(240 * multiplier),
      customers: Math.round(180 * multiplier),
    },
    {
      hour: "7 PM",
      sales: Math.round(1320 * multiplier),
      units: Math.round(264 * multiplier),
      customers: Math.round(198 * multiplier),
    },
    {
      hour: "8 PM",
      sales: Math.round(980 * multiplier),
      units: Math.round(196 * multiplier),
      customers: Math.round(147 * multiplier),
    },
    {
      hour: "9 PM",
      sales: Math.round(640 * multiplier),
      units: Math.round(128 * multiplier),
      customers: Math.round(96 * multiplier),
    },
    {
      hour: "10 PM",
      sales: Math.round(320 * multiplier),
      units: Math.round(64 * multiplier),
      customers: Math.round(48 * multiplier),
    },
    {
      hour: "11 PM",
      sales: Math.round(120 * multiplier),
      units: Math.round(24 * multiplier),
      customers: Math.round(18 * multiplier),
    },
  ]

  const allData = {
    ...hourlyData,
    tuesday: generateDayData(0.9),
    wednesday: generateDayData(0.85),
    thursday: generateDayData(1.1),
    sunday: generateDayData(0.8),
  }

  const currentData = allData[selectedDay as keyof typeof allData]
  const peakHour = currentData.reduce((max, item) => (item.sales > max.sales ? item : max))
  const offPeakHour = currentData.reduce((min, item) => (item.sales < min.sales ? item : min))
  const totalDaily = currentData.reduce((sum, item) => sum + item.sales, 0)
  const avgPerHour = Math.round(totalDaily / currentData.length)

  // Recommendations
  const recommendations = [
    {
      icon: Clock,
      title: "Stock More During Peak Hours",
      description: `Peak sales occur from ${peakHour.hour}. Ensure sufficient stock to meet demand.`,
    },
    {
      icon: Target,
      title: "Promotional Opportunities",
      description: `Off-peak hours (${offPeakHour.hour}) are ideal for discounted promotions to boost sales.`,
    },
    {
      icon: TrendingUp,
      title: "Maintenance Scheduling",
      description: "Schedule maintenance during off-peak hours to minimize revenue loss.",
    },
    {
      icon: AlertCircle,
      title: "Staffing Optimization",
      description: "Allocate resources strategically based on peak and off-peak patterns.",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Peak/Off-Peak Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Identify peak buying times and optimize your operations</p>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Peak Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{peakHour.hour}</p>
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> KES {peakHour.sales.toLocaleString()} sales
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Off-Peak Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-accent">{offPeakHour.hour}</p>
            <p className="text-xs text-accent mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> KES {offPeakHour.sales.toLocaleString()} sales
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">KES {(totalDaily / 1000).toFixed(1)}k</p>
            <p className="text-xs text-muted-foreground mt-1">{dayNames[selectedDay as keyof typeof dayNames]}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hourly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">KES {avgPerHour.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Average per hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            onClick={() => setSelectedDay(day)}
            className={selectedDay === day ? "bg-primary hover:bg-primary/90" : ""}
          >
            {dayNames[day as keyof typeof dayNames].slice(0, 3)}
          </Button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Hour */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Hourly Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--color-primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--color-primary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis
                  dataKey="hour"
                  stroke="hsl(var(--color-muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--color-muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--color-card))",
                    border: "1px solid hsl(var(--color-border))",
                    color: "hsl(var(--color-foreground))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--color-primary))"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customers vs Sales */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Customer Visits vs Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis
                  dataKey="hour"
                  stroke="hsl(var(--color-muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--color-muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--color-card))",
                    border: "1px solid hsl(var(--color-border))",
                    color: "hsl(var(--color-foreground))",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--color-primary))"
                  strokeWidth={2}
                  name="Sales (KES)"
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="hsl(var(--color-chart-2))"
                  strokeWidth={2}
                  name="Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Unit Sales Detail Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Units Sold by Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis
                dataKey="hour"
                stroke="hsl(var(--color-muted-foreground))"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="hsl(var(--color-muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--color-card))",
                  border: "1px solid hsl(var(--color-border))",
                  color: "hsl(var(--color-foreground))",
                }}
              />
              <Bar dataKey="units" fill="hsl(var(--color-accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, i) => (
          <Card key={i} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <rec.icon className="h-5 w-5 text-primary flex-shrink-0" />
                <CardTitle className="text-base">{rec.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
