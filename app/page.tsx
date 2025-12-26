import { Github, Linkedin, Twitter, Instagram, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary lg:flex lg:justify-between lg:gap-4">
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 px-6 py-12 md:px-12 lg:px-24">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
            <a href="/">Jonathan Doe</a>
          </h1>
          <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">Senior Product Designer</h2>
          <p className="mt-4 max-w-xs leading-normal text-muted-foreground">
            I build accessible, pixel-perfect digital experiences for the web.
          </p>

          <nav className="hidden lg:block mt-16" aria-label="In-page jump links">
            <ul className="flex flex-col gap-4 w-max">
              <li>
                <a className="nav-link nav-link-active" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link" href="#experience">
                  Experience
                </a>
              </li>
              <li>
                <a className="nav-link" href="#projects">
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <ul className="mt-8 flex items-center gap-5 lg:mt-0" aria-label="Social media">
          <li className="text-xs">
            <a className="block hover:text-slate-200 transition-colors" href="#" target="_blank" rel="noreferrer">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a className="block hover:text-slate-200 transition-colors" href="#" target="_blank" rel="noreferrer">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a className="block hover:text-slate-200 transition-colors" href="#" target="_blank" rel="noreferrer">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a className="block hover:text-slate-200 transition-colors" href="#" target="_blank" rel="noreferrer">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
          </li>
        </ul>
      </header>

      <main className="lg:w-1/2 lg:py-24 px-6 py-12 md:px-12 lg:px-24 flex flex-col gap-24">
        <section id="about" className="scroll-mt-16 lg:scroll-mt-24" aria-label="About me">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
          </div>
          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a designer passionate about crafting accessible, human-centered interfaces that blend thoughtful
              aesthetics with robust usability. My favorite work lies at the intersection of design systems and product
              strategy.
            </p>
            <p>
              Currently, I&apos;m a Senior Designer at <span className="text-slate-200 font-medium">EcoFlow</span>,
              specializing in building scalable UI components that power our global energy monitoring platform.
            </p>
            <p>
              In my spare time, I&apos;m usually experimenting with generative art, exploring architecture photography,
              or searching for the perfect cup of pour-over coffee.
            </p>
          </div>
        </section>

        <section id="experience" className="scroll-mt-16 lg:scroll-mt-24" aria-label="Work experience">
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Experience</h2>
          </div>
          <ol className="group/list flex flex-col gap-12">
            {[
              {
                period: "2024 — Present",
                role: "Senior Product Designer",
                company: "EcoFlow",
                desc: "Lead design initiatives for the core monitoring dashboard. Developed a comprehensive design system that reduced front-end development time by 30%.",
                skills: ["Figma", "Design Systems", "Prototyping", "React"],
              },
              {
                period: "2021 — 2023",
                role: "UI/UX Designer",
                company: "Vercel",
                desc: "Collaborated with engineering teams to ship high-performance developer tools. Refined the visual language of the dashboard and improved onboarding conversion by 15%.",
                skills: ["UI Design", "UX Research", "Tailwind CSS", "Next.js"],
              },
            ].map((exp, i) => (
              <li
                key={i}
                className="group relative flex flex-col sm:flex-row gap-4 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
              >
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2 sm:w-1/4">
                  {exp.period}
                </header>
                <div className="z-10 sm:w-3/4">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <div>
                      <a
                        className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-primary focus-visible:text-primary group/link text-base"
                        href="#"
                      >
                        <span className="absolute -inset-x-4 -inset-y-4 hidden rounded md:-inset-x-6 lg:block"></span>
                        <span>
                          {exp.role} ·{" "}
                          <span className="inline-block">
                            {exp.company}
                            <ExternalLink className="inline-block h-4 w-4 ml-1 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 focus-visible/link:-translate-y-1 focus-visible/link:translate-x-1" />
                          </span>
                        </span>
                      </a>
                    </div>
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-muted-foreground">{exp.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                    {exp.skills.map((skill) => (
                      <li key={skill}>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                        >
                          {skill}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <footer className="max-w-md pb-16 text-sm text-muted-foreground sm:pb-0">
          <p>
            Coded in <span className="text-slate-200">Visual Studio Code</span>. Built with{" "}
            <span className="text-slate-200">Next.js</span> and <span className="text-slate-200">Tailwind CSS</span>.
            All rights reserved by SanaTech Solutions. © 2025
          </p>
        </footer>
      </main>
    </div>
  )
}
