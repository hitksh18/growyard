import type { Project } from "@/types/project";

/**
 * GrowthYard project data.
 *
 * Known client projects. Descriptions are written at a campaign level and
 * delays are kept honest — every `metrics` value is still `--` until real,
 * verifiable figures are supplied. Replace them with actual numbers as they
 * become available. Each project renders automatically on /work and the home
 * workflow section.
 */
export const projects: Project[] = [
  {
    index: "01",
    slug: "wrap-licks",
    title: "Wrap Licks",
    category: "Brand Strategy",
    client: "Wrap Licks",
    year: "2025",
    summary:
      "A bold brand and social presence for a fast-casual wrap concept built to make flavour the hero.",
    description:
      "From identity and tone of voice to a social feed people actually stop on, Wrap Licks got a presence with as much bite as the menu.",
    services: ["Brand Identity", "Social Media", "Content", "Marketing"],
    metrics: [{ label: "Brand recall", value: "--" }, { label: "Followers", value: "--" }],
    image: "/images/projects/wrap-licks.svg",
    alt: "Wrap Licks brand identity art direction",
    featured: true,
  },
  {
    index: "02",
    slug: "cavemans-pizzeria",
    title: "Cavemans Pizzeria",
    category: "Creative & Design",
    client: "Cavemans Pizzeria",
    year: "2025",
    summary:
      "A storied pizzeria with a new look — identity, menus and marketing designed to match the flavour.",
    description:
      "We gave Cavemans a visual language as distinctive as its pies — from logo and menu systems to campaigns that sell the story, not just the slice.",
    services: ["Brand Identity", "Menu & Packaging", "Campaign Creative", "Social Media"],
    metrics: [{ label: "Dine-in growth", value: "--" }, { label: "Orders", value: "--" }],
    image: "/images/projects/cavemans-pizzeria.svg",
    alt: "Cavemans Pizzeria identity art direction",
    featured: true,
  },
  {
    index: "03",
    slug: "koffeio",
    title: "Koffeio",
    category: "Web Design",
    client: "Koffeio",
    year: "2025",
    summary:
      "A coffee brand with a digital home as warm as its beans — full web design and experience.",
    description:
      "Koffeio's brand, streaming platform, and digital experience were brought together into a site that feels as crafted as a pour-over.",
    services: ["Web Design", "UX & UI", "Brand", "Growth"],
    metrics: [{ label: "Online orders", value: "--" }, { label: "Traffic", value: "--" }],
    image: "/images/projects/koffeio.svg",
    alt: "Koffeio web design art direction",
    featured: true,
  },
];

export const featuredProjects = projects;