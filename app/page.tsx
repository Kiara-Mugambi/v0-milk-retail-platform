"use client"

import { useState } from "react"
import { Sparkles, Send, Loader2, User, Briefcase, Code, GraduationCap, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function AIProfileBuilder() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Left Panel: Prompt Area */}
      <div className="flex flex-col w-full lg:w-1/3 border-r border-border bg-card/30 backdrop-blur-xl">
        <header className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-bold tracking-tight">Wantime Profile</h1>
          </div>
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
            v1.0
          </Badge>
        </header>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                Your Professional Vision
              </h2>
              <p className="text-sm text-muted-foreground">
                Describe your career journey, skills, and aspirations. Our AI will craft a professional profile that
                captures your essence.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <Textarea
                  placeholder="e.g. I am a Senior Product Designer with 10 years of experience in fin-tech. I love building design systems and mentor junior designers..."
                  className="min-h-[200px] bg-background border-border resize-none focus:ring-1 focus:ring-primary/50 transition-all rounded-xl p-4"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setIsGenerating(true)}
                    disabled={!prompt || isGenerating}
                    className="rounded-lg gap-2 shadow-lg"
                  >
                    {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Generate Profile
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {[
                { label: "Executive", icon: User },
                { label: "Freelancer", icon: Briefcase },
                { label: "Developer", icon: Code },
                { label: "Academic", icon: GraduationCap },
              ].map((template) => (
                <button
                  key={template.label}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:bg-accent/10 hover:border-accent/50 transition-all text-left group"
                >
                  <template.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-xs font-medium">{template.label}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <footer className="p-6 border-t border-border bg-background/50 text-[10px] text-muted-foreground flex flex-col gap-1">
          <p>© 2025 SanaTech Solutions. All rights reserved.</p>
          <p>Powered by Next.js & AI SDK v5</p>
        </footer>
      </div>

      {/* Right Panel: Preview Area */}
      <div className="hidden lg:flex flex-col flex-1 bg-background relative overflow-hidden">
        {/* Background Grid Pattern inspired by design inspiration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background/50"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="p-4 border-b border-border/50 flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/50"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <div className="px-3 py-1 rounded-md bg-muted/50 border border-border text-[10px] font-mono text-muted-foreground">
                preview.portfolio
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-xs gap-2">
                <Layout className="h-3.5 w-3.5" />
                Layouts
              </Button>
              <Button
                size="sm"
                className="h-8 text-xs font-bold rounded-md bg-foreground text-background hover:bg-foreground/90"
              >
                Publish Profile
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-12">
            {/* Initial Blank State or Preview Rendering */}
            {!profile && !isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 max-w-sm mx-auto">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center border border-border shadow-xl">
                  <Layout className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-medium">No Profile Generated Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Provide a prompt on the left to professionally craft your professional profile.
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden min-h-[800px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Profile Placeholder Content */}
                <div className="p-12 space-y-12">
                  <div className="space-y-4">
                    <div className="h-10 w-48 bg-muted rounded-md animate-pulse"></div>
                    <div className="h-6 w-32 bg-muted/50 rounded-md animate-pulse"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-muted/30 rounded-md animate-pulse"></div>
                    <div className="h-4 w-full bg-muted/30 rounded-md animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-muted/30 rounded-md animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="h-32 bg-muted/20 rounded-xl animate-pulse"></div>
                    <div className="h-32 bg-muted/20 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
