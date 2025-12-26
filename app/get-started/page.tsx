"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, BarChart3, Smartphone, Lock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function GetStarted() {
  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track daily, weekly, and monthly sales with comprehensive charts and insights.",
    },
    {
      icon: Smartphone,
      title: "Device Monitoring",
      description: "Monitor your milk ATM health, stock levels, temperature, and alerts in real-time.",
    },
    {
      icon: TrendingUp,
      title: "Peak Hour Analysis",
      description: "Identify when milk is bought most and least to optimize your operations.",
    },
    {
      icon: Lock,
      title: "Tamper Detection",
      description: "Ensure milk authenticity and integrity with advanced verification systems.",
    },
  ]

  const steps = [
    {
      number: 1,
      title: "Create Account",
      description: "Sign up with your business details and connect your milk ATM devices.",
    },
    {
      number: 2,
      title: "Sync Devices",
      description: "Link your IoT-enabled milk vending machines to the platform.",
    },
    {
      number: 3,
      title: "Start Selling",
      description: "Enable MPESA payments and begin accepting customer transactions.",
    },
    {
      number: 4,
      title: "Analyze & Optimize",
      description: "Use real-time dashboards and analytics to grow your milk retail business.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Wantime Cinema</h1>
            </div>
            <p className="text-sm text-muted-foreground italic">Track. Analyze. Optimize.</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Manage Your Cinema Business
            <span className="text-primary"> Smarter</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Wantime Cinema provides the ultimate platform to track movie sales, monitor theater health, and analyze
            viewer patterns in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Go to Dashboard
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Powerful Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Wantime Cinema?</h3>
          <div className="space-y-4">
            {[
              "Increase sales with data-driven insights about customer buying patterns",
              "Reduce losses through real-time tamper detection and product verification",
              "Optimize operations by monitoring device health and predicting maintenance needs",
              "Accept MPESA payments instantly without being physically present at your vending point",
              "Make informed decisions with comprehensive analytics and reporting",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-primary rounded-lg p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-8 opacity-90">
            Join cinema operators who are already using Wantime Cinema to grow their business.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Access Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Wantime Cinema. All rights reserved. Track. Analyze. Optimize.</p>
        </div>
      </footer>
    </div>
  )
}
