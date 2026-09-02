import type { TeamSection, TeamMember } from "@/types/team";

/**
 * GROWTHYARD team.
 *
 * The four names below are the real GROWTHYARD team. Role lines are editable
 * placeholders — adjust to match actual titles. No photos exist yet, so cards
 * render typography-first (initial letters + focus areas).
 */
const members: TeamMember[] = [
  {
    slug: "rishi-jaiswal",
    name: "Rishi Jaiswal",
    role: "Founder & Creative Director",
    bio: "Sets the creative direction and makes sure every output earns attention.",
    image: "",
    focus: ["Brand Strategy", "Creative Direction"],
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