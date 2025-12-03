"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Zap, Droplets, Thermometer, Clock, MapPin, Power } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function DeviceMonitoring() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  // Device data
  const devices = [
    {
      id: "ATM-1",
      location: "Nairobi Central Market",
      status: "online",
      stock: 85,
      temperature: 4.2,
      lastSync: "2 min ago",
      uptime: "99.8%",
      alerts: [],
      performance: [
        { time: "12:00", stock: 90 },
        { time: "13:00", stock: 87 },
        { time: "14:00", stock: 82 },
        { time: "15:00", stock: 79 },
        { time: "16:00", stock: 85 },
      ],
    },
    {
      id: "ATM-2",
      location: "Westlands Shopping Center",
      status: "online",
      stock: 45,
      temperature: 4.1,
      lastSync: "5 min ago",
      uptime: "98.5%",
      alerts: ["Low stock warning"],
      performance: [
        { time: "12:00", stock: 70 },
        { time: "13:00", stock: 65 },
        { time: "14:00", stock: 55 },
        { time: "15:00", stock: 48 },
        { time: "16:00", stock: 45 },
      ],
    },
    {
      id: "ATM-3",
      location: "Kicc Supermarket",
      status: "offline",
      stock: 0,
      temperature: 8.5,
      lastSync: "45 min ago",
      uptime: "94.2%",
      alerts: ["Device offline", "Temperature critical"],
      performance: [
        { time: "12:00", stock: 100 },
        { time: "13:00", stock: 100 },
        { time: "14:00", stock: 100 },
        { time: "15:00", stock: 100 },
        { time: "16:00", stock: 0 },
      ],
    },
    {
      id: "ATM-4",
      location: "Junction Mall",
      status: "online",
      stock: 72,
      temperature: 4.0,
      lastSync: "3 min ago",
      uptime: "99.5%",
      alerts: [],
      performance: [
        { time: "12:00", stock: 95 },
        { time: "13:00", stock: 88 },
        { time: "14:00", stock: 80 },
        { time: "15:00", stock: 75 },
        { time: "16:00", stock: 72 },
      ],
    },
    {
      id: "ATM-5",
      location: "Acacia Park",
      status: "online",
      stock: 65,
      temperature: 3.9,
      lastSync: "7 min ago",
      uptime: "97.8%",
      alerts: ["Network latency"],
      performance: [
        { time: "12:00", stock: 100 },
        { time: "13:00", stock: 92 },
        { time: "14:00", stock: 82 },
        { time: "15:00", stock: 72 },
        { time: "16:00", stock: 65 },
      ],
    },
  ]

  const selectedDeviceData = selectedDevice ? devices.find((d) => d.id === selectedDevice) : devices[0]
  const onlineDevices = devices.filter((d) => d.status === "online").length
  const devicesWithAlerts = devices.filter((d) => d.alerts.length > 0).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">ATM Device Monitoring</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time status of your milk vending machines</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{devices.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Across all locations</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Online Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{onlineDevices}</p>
            <p className="text-xs text-primary mt-1">{Math.round((onlineDevices / devices.length) * 100)}% uptime</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{devicesWithAlerts}</p>
            <p className="text-xs text-destructive mt-1">
              {devicesWithAlerts} device{devicesWithAlerts !== 1 ? "s" : ""} need attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Devices</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedDeviceData?.id === device.id
                    ? "bg-primary/20 border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{device.id}</h3>
                  <div
                    className={`w-2 h-2 rounded-full ${device.status === "online" ? "bg-primary" : "bg-destructive"}`}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {device.location}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    <span className="font-semibold text-foreground">{device.stock}</span>
                    <span className="text-muted-foreground">L stock</span>
                  </span>
                  <span
                    className={`text-xs font-medium ${device.alerts.length > 0 ? "text-destructive" : "text-primary"}`}
                  >
                    {device.alerts.length > 0
                      ? `${device.alerts.length} alert${device.alerts.length !== 1 ? "s" : ""}`
                      : "Healthy"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Device Details */}
        {selectedDeviceData && (
          <div className="lg:col-span-2 space-y-6">
            {/* Main Status Card */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{selectedDeviceData.id}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedDeviceData.location}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedDeviceData.status === "online"
                      ? "bg-primary/20 text-primary"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {selectedDeviceData.status === "online" ? "Online" : "Offline"}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-input">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Stock Level</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{selectedDeviceData.stock}L</p>
                  </div>

                  <div className="p-3 rounded-lg bg-input">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-4 w-4 text-accent" />
                      <span className="text-xs text-muted-foreground">Temperature</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{selectedDeviceData.temperature}°C</p>
                  </div>

                  <div className="p-3 rounded-lg bg-input">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Last Sync</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{selectedDeviceData.lastSync}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-input">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Uptime</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{selectedDeviceData.uptime}</p>
                  </div>
                </div>

                {/* Alerts */}
                {selectedDeviceData.alerts.length > 0 && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-destructive mb-1">Active Alerts</h4>
                        <ul className="text-sm text-destructive/90 space-y-1">
                          {selectedDeviceData.alerts.map((alert, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-destructive rounded-full"></span>
                              {alert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <Power className="h-4 w-4 mr-2" />
                    Remote Restart
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Logs
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stock Trend Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Stock Level Trend (Last 5 Hours)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={selectedDeviceData.performance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--color-muted-foreground))" />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--color-card))",
                        border: "1px solid hsl(var(--color-border))",
                        color: "hsl(var(--color-foreground))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="stock"
                      stroke="hsl(var(--color-primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--color-primary))", r: 4 }}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* System Health */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>System Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 rounded-lg bg-input">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${device.status === "online" ? "bg-primary" : "bg-destructive"}`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{device.id}</p>
                    <p className="text-xs text-muted-foreground">{device.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{device.stock}L</p>
                    <p className="text-xs text-muted-foreground">Stock</p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${device.temperature > 5 ? "text-destructive" : "text-primary"}`}
                    >
                      {device.temperature}°C
                    </p>
                    <p className="text-xs text-muted-foreground">Temp</p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${device.alerts.length > 0 ? "text-destructive" : "text-primary"}`}
                    >
                      {device.uptime}
                    </p>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                  </div>

                  {device.alerts.length > 0 && <AlertCircle className="h-5 w-5 text-destructive" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
