# GrowthYard

**Growth Focused. Results Driven.**

GrowthYard is a creative marketing & growth agency website built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide React and Next/Image.

## Stack

- **Next.js 16** — App Router, React 19
- **TypeScript**
- **Tailwind CSS v4** (CSS-first configuration)
- **Framer Motion** — hero reveal, scroll reveal, timeline, FAQ, mobile menu, counters
- **Lucide React** — icons
- **Next/Image** — image optimisation

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script           | Purpose                         |
| ---------------- | ------------------------------- |
| `npm run dev`    | Start the dev server            |
| `npm run build`  | Production build                |
| `npm run start`  | Serve the production build      |
| `npm run lint`   | Run ESLint                      |

## Project structure

```
src/
├── app/                 # Routes, layout, globals.css, metadata
│   ├── work/            # /work
│   ├── services/        # /services
│   ├── about/           # /about
│   ├── process/         # /process
│   ├── contact/         # /contact
│   └── insights/        # /insights
├── components/
│   ├── layout/          # Navbar, Footer, MobileMenu
│   ├── ui/              # Button, Container, SectionHeading, etc.
│   ├── home/            # Homepage sections
│   ├── work/            # ProjectCard, ProjectGrid, CaseStudyHeader
│   ├── services/        # ServiceItem, ServicesList
│   ├── about/           # AboutHero, TeamSection, TeamCard
│   ├── process/         # ProcessTimeline, ProcessStep
│   ├── contact/         # ContactForm, ContactInfo
│   └── animations/      # FadeIn, Reveal, Stagger, Parallax
├── data/                # All content (site, projects, services, team, …)
├── lib/                 # utils, constants
├── hooks/               # useScrollProgress, useMediaQuery, useInView
├── types/               # Shared TypeScript types
└── styles/              # animations.css
public/
├── images/{projects,team,testimonials,general}
├── icons/
└── logos/
```

## Editing content

All site content is centralised in `src/data/`:

| File                | What you edit                              |
| ------------------- | ------------------------------------------ |
| `site.ts`           | Brand name, tagline, URLs, socials         |
| `navigation.ts`     | Nav links                                  |
| `services.ts`       | The 8 services                             |
| `projects.ts`       | Case studies                               |
| `team.ts`           | Real team members                          |
| `testimonials.ts`   | Client quotes (currently a placeholder)    |
| `faq.ts`            | FAQ items                                  |
| `insights.ts`       | Insight posts                              |
| `results.ts`        | Results metrics                            |

> Placeholder metrics use `--` and placeholder testimonials are clearly marked. Replace them with real, verifiable data — never ship fabricated statistics.

## Adding a project

1. Add an entry to `src/data/projects.ts` (slug, title, category, image path, metrics).
2. Drop an image into `public/images/projects/`.
3. It automatically appears on `/work` and the homepage selected-work grid.

## Design system

- **Primary:** `#050505` (near-black)
- **Secondary:** off-white (`#fafaf9`)
- **Accent:** electric blue (`#2f6bff`) — used sparingly
- Blue is an accent, never the dominant colour.
- Editorial serif italics (`Instrument Serif`) for occasional emphasis.
- Animations respect `prefers-reduced-motion`.

## Notes

- The intro section of the work page shows a "Project 01 — placeholder" style card until real case studies are added.
- Contact form composes a `mailto:` draft. To wire a real backend, update `src/components/contact/ContactForm.tsx`.