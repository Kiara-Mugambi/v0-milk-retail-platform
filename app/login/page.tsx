"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const signupSchema = z
  .object({
    businessName: z.string().min(2, "Business name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type LoginFormValues = z.infer<typeof loginSchema>
type SignupFormValues = z.infer<typeof signupSchema>

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onLoginSubmit = async (data: LoginFormValues) => {
    setError(null)
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      console.log("[v0] Login attempt:", data)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // On success, redirect to dashboard
      window.location.href = "/"
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const onSignupSubmit = async (data: SignupFormValues) => {
    setError(null)
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      console.log("[v0] Signup attempt:", data)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // On success, redirect to dashboard
      window.location.href = "/"
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const form = isSignup ? signupForm : loginForm

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center px-4">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">DairySight</h1>
          <p className="text-muted-foreground text-sm italic">Track. Analyze. Optimize.</p>
        </div>

        {/* Login/Signup Card */}
        <Card className="p-8 shadow-lg">
          {error && (
            <Alert className="mb-6 border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(isSignup ? onSignupSubmit : onLoginSubmit)} className="space-y-4">
              {isSignup && (
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Business Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your milk shop name"
                          {...field}
                          className="bg-input border-border"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        className="bg-input border-border"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="bg-input border-border pr-10"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isSignup && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Confirm Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="bg-input border-border pr-10"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!isSignup && (
                <div className="text-right">
                  <Link href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : isSignup ? "Create Account" : "Sign In"}
              </Button>
            </form>
          </Form>

          {/* Toggle between Login and Signup */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignup(false)
                    setError(null)
                    loginForm.reset()
                  }}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignup(true)
                    setError(null)
                    signupForm.reset()
                  }}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground mb-4">
            By signing in, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
          <Link
            href="/get-started"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Learn more about DairySight
          </Link>
        </div>
      </div>
    </div>
  )
}
