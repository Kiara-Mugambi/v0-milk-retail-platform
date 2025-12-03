"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
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
import { CheckCircle, AlertCircle, Clock, TrendingUp, Download, CreditCard, Phone } from "lucide-react"

export function MpesaPayments() {
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending" | "failed">("all")
  const [timeFrame, setTimeFrame] = useState<"today" | "week" | "month">("today")

  // Daily transaction data
  const transactionData = [
    { time: "6 AM", amount: 1200, count: 4 },
    { time: "9 AM", amount: 2400, count: 8 },
    { time: "12 PM", amount: 3100, count: 10 },
    { time: "3 PM", amount: 2800, count: 9 },
    { time: "6 PM", amount: 6200, count: 20 },
    { time: "9 PM", amount: 4500, count: 15 },
  ]

  // Payment status breakdown
  const statusData = [
    { name: "Completed", value: 287, fill: "hsl(var(--color-primary))" },
    { name: "Pending", value: 12, fill: "hsl(var(--color-chart-2))" },
    { name: "Failed", value: 5, fill: "hsl(var(--color-destructive))" },
  ]

  // Transactions list
  const transactions = [
    {
      id: "TXN-10001",
      device: "ATM-1",
      amount: 500,
      customerPhone: "+254 7** *** **5",
      status: "completed",
      time: "14:23:45",
      date: "Today",
      units: 1,
      method: "MPESA",
    },
    {
      id: "TXN-10002",
      device: "ATM-2",
      amount: 1000,
      customerPhone: "+254 7** *** **8",
      status: "completed",
      time: "14:45:12",
      date: "Today",
      units: 2,
      method: "MPESA",
    },
    {
      id: "TXN-10003",
      device: "ATM-3",
      amount: 2500,
      customerPhone: "+254 7** *** **3",
      status: "completed",
      time: "15:02:33",
      date: "Today",
      units: 5,
      method: "MPESA",
    },
    {
      id: "TXN-10004",
      device: "ATM-1",
      amount: 500,
      customerPhone: "+254 7** *** **9",
      status: "pending",
      time: "15:18:22",
      date: "Today",
      units: 1,
      method: "MPESA",
    },
    {
      id: "TXN-10005",
      device: "ATM-4",
      amount: 1500,
      customerPhone: "+254 7** *** **1",
      status: "completed",
      time: "15:35:45",
      date: "Today",
      units: 3,
      method: "MPESA",
    },
    {
      id: "TXN-10006",
      device: "ATM-2",
      amount: 1000,
      customerPhone: "+254 7** *** **7",
      status: "completed",
      time: "15:52:11",
      date: "Today",
      units: 2,
      method: "MPESA",
    },
    {
      id: "TXN-10007",
      device: "ATM-5",
      amount: 2000,
      customerPhone: "+254 7** *** **4",
      status: "failed",
      time: "16:09:33",
      date: "Today",
      units: 4,
      method: "MPESA",
    },
    {
      id: "TXN-10008",
      device: "ATM-1",
      amount: 500,
      customerPhone: "+254 7** *** **6",
      status: "completed",
      time: "16:24:19",
      date: "Today",
      units: 1,
      method: "MPESA",
    },
  ]

  // Filter transactions
  const filteredTransactions =
    filterStatus === "all" ? transactions : transactions.filter((t) => t.status === filterStatus)

  // Calculate metrics
  const completedTransactions = transactions.filter((t) => t.status === "completed").length
  const totalRevenue = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  const successRate = Math.round((completedTransactions / transactions.length) * 100)
  const averageTransaction = Math.round(totalRevenue / completedTransactions)

  const statusColors: Record<string, string> = {
    completed: "text-primary bg-primary/10",
    pending: "text-chart-2 bg-chart-2/10",
    failed: "text-destructive bg-destructive/10",
  }

  const statusIcons: Record<string, any> = {
    completed: CheckCircle,
    pending: Clock,
    failed: AlertCircle,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">MPESA Payments</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and track mobile money transactions</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Export Transactions
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">KES {(totalRevenue / 1000).toFixed(1)}k</p>
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {completedTransactions} transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{successRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Payment completion rate</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">KES {averageTransaction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Per successful transaction</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{transactions.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Today's activity</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Timeline */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle>Transaction Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionData}>
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
                <Legend />
                <Bar dataKey="amount" fill="hsl(var(--color-primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Transaction Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
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

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filterStatus === "all" ? "default" : "outline"}
          onClick={() => setFilterStatus("all")}
          className={filterStatus === "all" ? "bg-primary hover:bg-primary/90" : ""}
        >
          All Transactions
        </Button>
        <Button
          variant={filterStatus === "completed" ? "default" : "outline"}
          onClick={() => setFilterStatus("completed")}
          className={filterStatus === "completed" ? "bg-primary hover:bg-primary/90" : ""}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Completed ({completedTransactions})
        </Button>
        <Button
          variant={filterStatus === "pending" ? "default" : "outline"}
          onClick={() => setFilterStatus("pending")}
          className={filterStatus === "pending" ? "bg-primary hover:bg-primary/90" : ""}
        >
          <Clock className="h-4 w-4 mr-2" />
          Pending
        </Button>
        <Button
          variant={filterStatus === "failed" ? "default" : "outline"}
          onClick={() => setFilterStatus("failed")}
          className={filterStatus === "failed" ? "bg-primary hover:bg-primary/90" : ""}
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Failed
        </Button>
      </div>

      {/* Transactions Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium">Device</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => {
                  const StatusIcon = statusIcons[txn.status]
                  return (
                    <tr key={txn.id} className="border-b border-border hover:bg-input transition-colors">
                      <td className="py-3 px-4 text-foreground font-medium">{txn.id}</td>
                      <td className="py-3 px-4 text-foreground">{txn.device}</td>
                      <td className="py-3 px-4 text-foreground font-semibold">KES {txn.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {txn.customerPhone}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{txn.time}</td>
                      <td className="py-3 px-4">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium w-fit ${statusColors[txn.status]}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <Card className="bg-primary/10 border border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle>MPESA Integration Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-foreground space-y-2">
          <p>
            <span className="font-semibold">Status:</span> <span className="text-primary">✓ Connected</span>
          </p>
          <p>
            <span className="font-semibold">API Version:</span> MPESA Daraja v2
          </p>
          <p>
            <span className="font-semibold">Settlement Account:</span> +254 7** *** **0 (Account Owner)
          </p>
          <p>
            <span className="font-semibold">Daily Limit:</span> KES 500,000
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
