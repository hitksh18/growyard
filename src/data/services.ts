import {
  Compass,
  Palette,
  Share2,
  Target,
  Clapperboard,
  MonitorSmartphone,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    tagline: "Foundations that compound",
    description:
      "We define the positioning, narrative and identity that make your brand unmistakable — and build the strategy that guides every decision after.",
    deliverables: [
      "Positioning & messaging",
      "Brand narrative",
      "Visual identity direction",
      "Competitive analysis",
    ],
    icon: Compass,
  },
  {
    slug: "creative-and-design",
    title: "Creative & Design",
    tagline: "Identity that resonates",
    description:
      "From logos and identity systems to campaign visuals, we craft design that feels human, premium and distinctly yours.",
    deliverables: [
      "Identity systems",
      "Campaign creative",
      "Brand guidelines",
      "Presentation design",
    ],
    icon: Palette,
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    tagline: "Scroll-stopping presence",
    description:
      "We build and run social strategies that grow engaged communities across the platforms that matter to your audience.",
    deliverables: [
      "Content calendars",
      "Channel strategy",
      "Community management",
      "Paid social support",
    ],
    icon: Share2,
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Spend that returns",
    description:
      "Data-driven campaigns across search, social and display — engineered to turn budget into measurable acquisition and ROI.",
    deliverables: [
      "Paid acquisition",
      "Conversion tracking",
      "A/B testing",
      "Attribution & reporting",
    ],
    icon: Target,
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    tagline: "Stories people share",
    description:
      "Photography, video and copy that bring your brand to life — created with intent, not just volume.",
    deliverables: [
      "Video & motion",
      "Photography",
      "Copywriting",
      "Creative direction",
    ],
    icon: Clapperboard,
  },
  {
    slug: "web-design-and-development",
    title: "Web Design & Development",
    tagline: "Digital that performs",
    description:
      "Fast, beautiful and conversion-focused websites built on modern stacks — designed to feel premium and work hard.",
    deliverables: [
      "UX & UI design",
      "Next.js builds",
      "E-commerce",
      "Performance optimisation",
    ],
    icon: MonitorSmartphone,
  },
  {
    slug: "seo-and-organic-growth",
    title: "SEO & Organic Growth",
    tagline: "Visibility that lasts",
    description:
      "Technical SEO, content strategy and authority building that earn sustainable organic traffic over time.",
    deliverables: [
      "Technical SEO",
      "Content strategy",
      "Keyword research",
      "Link building",
    ],
    icon: Search,
  },
  {
    slug: "marketing-strategy",
    title: "Marketing Strategy",
    tagline: "The plan before the play",
    description:
      "We build the go-to-market and growth roadmaps that connect your brand to the right customers, at the right time.",
    deliverables: [
      "Go-to-market plans",
      "Growth roadmaps",
      "Channel selection",
      "Funnel design",
    ],
    icon: TrendingUp,
  },
];

export const serviceIcons: Record<string, LucideIcon> = {
  "brand-strategy": Compass,
  "creative-and-design": Palette,
  "social-media-marketing": Share2,
  "performance-marketing": Target,
  "content-creation": Clapperboard,
  "web-design-and-development": MonitorSmartphone,
  "seo-and-organic-growth": Search,
  "marketing-strategy": TrendingUp,
};

export const servicesHome = services.slice(0, 6);
