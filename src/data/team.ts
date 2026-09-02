import type { TeamSection, TeamMember } from "@/types/team";

/**
 * GrowthYard team.
 *
 * The four names below are the real GrowthYard team. Role lines are editable
 * placeholders — adjust to match actual titles. No photos exist yet, so cards
 * render typography-first (initial letters + focus areas).
 */
const members: TeamMember[] = [
  {
    slug: "rishi-jaiswal",
    name: "Rishi Jaiswal",
    role: "Founder & Creative Director",
    roleLabel: "Founder",
    bio: "Sets the creative direction and makes sure every output earns attention.",
    image: "",
    focus: ["Brand Strategy", "Creative Direction"],
    location: "Hyderabad, India",
    longBio:
      "Rishi founded GrowthYard with one goal: to build brands people actually remember. With a background in design and technology, he leads the creative vision and ensures every project exceeds expectations.",
    expertise: ["Creative Direction", "Web Development", "Brand Strategy"],
    projects: [
      {
        name: "Wrap Licks Identity",
        note: "Brand identity, tone of voice and social presence built to make flavour the hero.",
      },
      {
        name: "Nexus FinTech Web",
        note: "Product-led marketing website and digital experience for a fintech brand.",
      },
      {
        name: "Aura Campaign",
        note: "Integrated brand campaign — identity, art direction and launch creative.",
      },
    ],
    experience: [
      {
        role: "Chief Operational Manager",
        company: "Social Squeeze Co.",
        period: "2024–2025",
      },
      {
        role: "NQ Discord Moderator",
        company: "NØDWIN Gaming",
        period: "2025–2026",
      },
      {
        role: "Founder",
        company: "GrowthYard",
        period: "Present",
      },
    ],
  },
  {
    slug: "darshil-mishra",
    name: "Darshil Mishra",
    role: "Growth & Strategy",
    bio: "Connects creative work to channel strategy, demand and measurable growth.",
    image: "",
    focus: ["Growth Strategy", "Performance Marketing"],
  },
  {
    slug: "sri-charan",
    name: "Sri Charan",
    role: "Creative & Design",
    bio: "Turns ideas into identity, campaigns and content that look unmistakably premium.",
    image: "",
    focus: ["Visual Identity", "Campaign Creative"],
  },
  {
    slug: "keerthi",
    name: "Keerthi",
    role: "Marketing & Delivery",
    bio: "Keeps the work moving — timelines, launches and the details that make it feel effortless.",
    image: "",
    focus: ["Project Delivery", "Social Media"],
  },
];

export const team: TeamSection = {
  label: "The team",
  heading: "People behind the work.",
  members,
};

export const teamMembers = members;