"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, AlertCircle, Lock, Eye, Droplets, Thermometer, QrCode } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export function TamperDetection() {
  const [selectedDevice, setSelectedDevice] = useState<string>("ATM-1")
  const [verifyMode, setVerifyMode] = useState(false)

  // Tamper detection history
  const tamperHistory = [
    { time: "12:00", temperature: 4.1, humidity: 45, integrity: 100, status: "verified" },
    { time: "12:30", temperature: 4.0, humidity: 46, integrity: 100, status: "verified" },
    { time: "13:00", temperature: 4.2, humidity: 44, integrity: 100, status: "verified" },
    { time: "13:30", temperature: 4.1, humidity: 45, integrity: 100, status: "verified" },
    { time: "14:00", temperature: 4.0, humidity: 47, integrity: 100, status: "verified" },
    { time: "14:30", temperature: 4.3, humidity: 43, integrity: 99, status: "warning" },
    { time: "15:00", temperature: 4.1, humidity: 45, integrity: 100, status: "verified" },
    { time: "15:30", temperature: 4.0, humidity: 46, integrity: 100, status: "verified" },
  ]

  // Device verification data
  const devices = [
    {
      id: "ATM-1",
      location: "Nairobi Central Market",
      integrityScore: 100,
      lastVerified: "2 min ago",
      status: "verified",
      temperature: 4.1,
      humidity: 45,
      seal: "SL-2024-001-A",
      alerts: [],
      certificateExpiry: "2025-06-15",
    },
    {
      id: "ATM-2",
      location: "Westlands Shopping Center",
      integrityScore: 98,
      lastVerified: "5 min ago",
      status: "warning",
      temperature: 4.8,
      humidity: 52,
      seal: "SL-2024-001-B",
      alerts: ["Humidity slightly elevated"],
      certificateExpiry: "2025-08-20",
    },
    {
      id: "ATM-3",
      location: "KICC Supermarket",
      integrityScore: 95,
      lastVerified: "45 min ago",
      status: "warning",
      temperature: 5.5,
      humidity: 58,
      seal: "SL-2024-001-C",
      alerts: ["Temperature deviation", "Seal integrity check needed"],
      certificateExpiry: "2025-05-10",
    },
    {
      id: "ATM-4",
      location: "Junction Mall",
      integrityScore: 100,
      lastVerified: "3 min ago",
      status: "verified",
      temperature: 4.0,
      humidity: 44,
      seal: "SL-2024-001-D",
      alerts: [],
      certificateExpiry: "2025-07-30",
    },
    {
      id: "ATM-5",
      location: "Acacia Park",
      integrityScore: 97,
      lastVerified: "7 min ago",
      status: "warning",
      temperature: 4.5,
      humidity: 49,
      seal: "SL-2024-001-E",
      alerts: ["Minor temperature fluctuation"],
      certificateExpiry: "2025-09-12",
    },
  ]

  const selectedDeviceData = devices.find((d) => d.id === selectedDevice) || devices[0]
  const verifiedDevices = devices.filter((d) => d.status === "verified").length
  const warningDevices = devices.filter((d) => d.status === "warning").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Milk Tamper Detection</h1>
          <p className="text-muted-foreground text-sm mt-1">Verify product integrity and authenticity</p>
        </div>
        <Button
          onClick={() => setVerifyMode(!verifyMode)}
          className={`gap-2 ${verifyMode ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"}`}
        >
          <QrCode className="h-4 w-4" />
          {verifyMode ? "Done Verifying" : "Verify Batch"}
        </Button>
      </div>

      {/* Verification Mode */}
      {verifyMode && (
        <Card className="bg-accent/10 border border-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <QrCode className="h-5 w-5" />
              Batch Verification Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground">
              Scan milk batch QR codes to verify authenticity and track product origin. Each batch is cryptographically
              sealed and tamper-evident.
            </p>
            <div className="p-4 rounded-lg bg-input border border-accent/30">
              <input
                type="text"
                placeholder="Scan QR code here... (e.g., BATCH-2024-001)"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-input">
                <p className="text-xs text-muted-foreground mb-1">Batch Status</p>
                <p className="text-lg font-semibold text-primary">VERIFIED</p>
              </div>
              <div className="p-4 rounded-lg bg-input">
                <p className="text-xs text-muted-foreground mb-1">Authenticity</p>
                <p className="text-lg font-semibold text-primary">100%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{verifiedDevices}</p>
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> All integrity checks passed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Devices Needing Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-chart-2">{warningDevices}</p>
            <p className="text-xs text-chart-2 mt-1 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Review conditions needed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Integrity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {Math.round(devices.reduce((sum, d) => sum + d.integrityScore, 0) / devices.length)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Fleet-wide average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Devices</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedDeviceData.id === device.id
                    ? "bg-primary/20 border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{device.id}</h3>
                  {device.status === "verified" ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-chart-2" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{device.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{device.integrityScore}%</span>
                  <span className="text-xs text-muted-foreground">{device.lastVerified}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Device Details */}
        {selectedDeviceData && (
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card
              className={`border-2 ${selectedDeviceData.status === "verified" ? "bg-primary/10 border-primary" : "bg-chart-2/10 border-chart-2"}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedDeviceData.id}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedDeviceData.location}</p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${selectedDeviceData.status === "verified" ? "bg-primary text-primary-foreground" : "bg-chart-2 text-white"}`}
                  >
                    {selectedDeviceData.status === "verified" ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Verified
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4" />
                        Needs Review
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Integrity Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Product Integrity</span>
                    <span className="text-lg font-bold text-foreground">{selectedDeviceData.integrityScore}%</span>
                  </div>
                  <div className="w-full bg-input rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all ${selectedDeviceData.integrityScore >= 98 ? "bg-primary" : selectedDeviceData.integrityScore >= 95 ? "bg-chart-2" : "bg-destructive"}`}
                      style={{ width: `${selectedDeviceData.integrityScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Seal Information */}
                <div className="p-4 rounded-lg bg-input border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Lock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Tamper-Evident Seal</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Seal ID: <span className="text-primary font-mono">{selectedDeviceData.seal}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Certificate Expiry: {selectedDeviceData.certificateExpiry}
                  </p>
                </div>

                {/* Environmental Conditions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-input">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-4 w-4 text-accent" />
                      <span className="text-xs text-muted-foreground">Temperature</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{selectedDeviceData.temperature}°C</p>
                    <p className="text-xs text-muted-foreground mt-1">Optimal: 2-6°C</p>
                  </div>

                  <div className="p-3 rounded-lg bg-input">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Humidity</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{selectedDeviceData.humidity}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Optimal: 40-50%</p>
                  </div>
                </div>

                {/* Alerts */}
                {selectedDeviceData.alerts.length > 0 && (
                  <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-chart-2 mb-1">Alerts</h4>
                        <ul className="text-sm text-chart-2/90 space-y-1">
                          {selectedDeviceData.alerts.map((alert, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-chart-2 rounded-full"></span>
                              {alert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <Eye className="h-4 w-4 mr-2" />
                    Verify Integrity
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Integrity Trend Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Integrity Monitoring (Last 8 Hours)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={tamperHistory}>
                    <defs>
                      <linearGradient id="colorIntegrity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--color-primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--color-primary))" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--color-muted-foreground))" />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" domain={[90, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--color-card))",
                        border: "1px solid hsl(var(--color-border))",
                        color: "hsl(var(--color-foreground))",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="integrity"
                      stroke="hsl(var(--color-primary))"
                      fillOpacity={1}
                      fill="url(#colorIntegrity)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Verification History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Verification Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "16:45",
                device: "ATM-1",
                action: "Integrity Verified",
                status: "success",
                temp: "4.1°C",
                integrity: "100%",
              },
              {
                time: "16:30",
                device: "ATM-3",
                action: "Temperature Deviation Alert",
                status: "warning",
                temp: "5.5°C",
                integrity: "95%",
              },
              {
                time: "16:15",
                device: "ATM-2",
                action: "Humidity Check Completed",
                status: "success",
                temp: "4.8°C",
                integrity: "98%",
              },
              {
                time: "16:00",
                device: "ATM-4",
                action: "Integrity Verified",
                status: "success",
                temp: "4.0°C",
                integrity: "100%",
              },
              {
                time: "15:45",
                device: "ATM-5",
                action: "Minor Fluctuation Detected",
                status: "warning",
                temp: "4.5°C",
                integrity: "97%",
              },
            ].map((event, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-input">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {event.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-chart-2" />
                    )}
                    <p className="text-sm font-medium text-foreground">{event.action}</p>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    {event.device} • {event.time}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-muted-foreground">{event.temp}</p>
                  <p className="text-foreground font-semibold">{event.integrity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
