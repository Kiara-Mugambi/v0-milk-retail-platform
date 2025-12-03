"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp } from "lucide-react"

export function SalesAnalytics() {
  const [timeFrame, setTimeFrame] = useState<"weekly" | "monthly">("weekly")

  // Weekly data
  const weeklyData = [
    { day: "Mon", sales: 12400, units: 240 },
    { day: "Tue", sales: 15300, units: 300 },
    { day: "Wed", sales: 18200, units: 380 },
    { day: "Thu", sales: 14100, units: 290 },
    { day: "Fri", sales: 22800, units: 450 },
    { day: "Sat", sales: 28900, units: 580 },
    { day: "Sun", sales: 13200, units: 280 },
  ]

  // Monthly data
  const monthlyData = [
    { month: "Jan", sales: 89400, units: 1780 },
    { month: "Feb", sales: 95300, units: 1900 },
    { month: "Mar", sales: 108200, units: 2160 },
    { month: "Apr", sales: 114100, units: 2280 },
    { month: "May", sales: 122800, units: 2460 },
    { month: "Jun", sales: 128900, units: 2580 },
    { month: "Jul", sales: 125600, units: 2520 },
    { month: "Aug", sales: 132400, units: 2640 },
  ]

  const chartData = timeFrame === "weekly" ? weeklyData : monthlyData
  const totalSales = chartData.reduce((sum, item) => sum + item.sales, 0)
  const totalUnits = chartData.reduce((sum, item) => sum + item.units, 0)
  const avgSale = Math.round(totalSales / chartData.length)
  const avgUnits = Math.round(totalUnits / chartData.length)

  // Device performance data
  const deviceData = [
    { name: "ATM-1", value: 2400, fill: "hsl(var(--color-primary))" },
    { name: "ATM-2", value: 2100, fill: "hsl(var(--color-chart-2))" },
    { name: "ATM-3", value: 1900, fill: "hsl(var(--color-chart-3))" },
    { name: "ATM-4", value: 1600, fill: "hsl(var(--color-chart-4))" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your milk vending sales performance</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Time Frame Selector */}
      <div className="flex gap-2">
        <Button
          variant={timeFrame === "weekly" ? "default" : "outline"}
          onClick={() => setTimeFrame("weekly")}
          className="bg-primary hover:bg-primary/90"
        >
          Weekly
        </Button>
        <Button
          variant={timeFrame === "monthly" ? "default" : "outline"}
          onClick={() => setTimeFrame("monthly")}
          className={timeFrame === "monthly" ? "bg-primary hover:bg-primary/90" : ""}
        >
          Monthly
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">KES {(totalSales / 1000).toFixed(1)}k</p>
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +8.2% from previous period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Units Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{totalUnits.toLocaleString()}</p>
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +5.3% from previous period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">KES {avgSale.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Per {timeFrame === "weekly" ? "day" : "day average"}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Units/Period</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{avgUnits}</p>
            <p className="text-xs text-muted-foreground mt-1">Per {timeFrame === "weekly" ? "day" : "day average"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart - Sales Trend */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis dataKey={timeFrame === "weekly" ? "day" : "month"} stroke="hsl(var(--color-muted-foreground))" />
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
                  dot={{ fill: "hsl(var(--color-primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Performance Pie Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Device Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--color-card))",
                    border: "1px solid hsl(var(--color-border))",
                    color: "hsl(var(--color-foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Unit Sales Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Units Sold by Period</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis dataKey={timeFrame === "weekly" ? "day" : "month"} stroke="hsl(var(--color-muted-foreground))" />
              <YAxis stroke="hsl(var(--color-muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--color-card))",
                  border: "1px solid hsl(var(--color-border))",
                  color: "hsl(var(--color-foreground))",
                }}
              />
              <Legend />
              <Bar dataKey="units" fill="hsl(var(--color-accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transaction Details */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium">Device</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Units</th>
                  <th className="text-left py-3 px-4 font-medium">Payment Method</th>
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "TXN-10234",
                    device: "ATM-1",
                    amount: "KES 500",
                    units: 1,
                    method: "MPESA",
                    time: "2:30 PM",
                    status: "Complete",
                  },
                  {
                    id: "TXN-10235",
                    device: "ATM-2",
                    amount: "KES 1,000",
                    units: 2,
                    method: "MPESA",
                    time: "2:45 PM",
                    status: "Complete",
                  },
                  {
                    id: "TXN-10236",
                    device: "ATM-3",
                    amount: "KES 2,500",
                    units: 5,
                    method: "MPESA",
                    time: "3:12 PM",
                    status: "Complete",
                  },
                  {
                    id: "TXN-10237",
                    device: "ATM-4",
                    amount: "KES 1,500",
                    units: 3,
                    method: "MPESA",
                    time: "3:45 PM",
                    status: "Complete",
                  },
                  {
                    id: "TXN-10238",
                    device: "ATM-1",
                    amount: "KES 500",
                    units: 1,
                    method: "MPESA",
                    time: "4:15 PM",
                    status: "Complete",
                  },
                ].map((txn) => (
                  <tr key={txn.id} className="border-b border-border hover:bg-input transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{txn.id}</td>
                    <td className="py-3 px-4 text-foreground">{txn.device}</td>
                    <td className="py-3 px-4 text-foreground font-semibold">{txn.amount}</td>
                    <td className="py-3 px-4 text-foreground">{txn.units}L</td>
                    <td className="py-3 px-4 text-primary">{txn.method}</td>
                    <td className="py-3 px-4 text-muted-foreground">{txn.time}</td>
                    <td className="py-3 px-4">
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
