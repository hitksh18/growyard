import type { TeamSection, TeamMember } from "@/types/team";

/**
 * GrowthYard team.
 *
 * The four names are the real GrowthYard team. Roles and the demo portfolio
 * content below are client-presentation placeholders - edit freely.
 *
 * Media:
 *  - `image`       portrait -> shown object-cover in an immersive panel.
 *  - `resumeImage` portfolio/resume -> shown object-contain so it stays readable.
 *
 * Images are intentionally left empty so elegant typographic placeholders render
 * now. To publish real media later, drop the file under /public and set the path:
 *    image:       /images/team/<slug>.jpg   (Sri Charan, Keerthi, Rishi portraits)
 *    resumeImage: /images/team/<slug>-resume.jpg (Darshil portfolio/resume)
 *
 * To add a member, append an object below - their card, modal, /team grid and
 * the static /team/<slug> deep link are all generated automatically.
 */
const members: TeamMember[] = [
  {
    slug: "rishi-jaiswal",
    name: "Rishi Jaiswal",
    role: "Founder & Creative Director",
    roleLabel: "Founder",
    bio: "Sets the creative direction and makes sure every output earns attention.",
    image: "",
    resumeImage: "",
    focus: ["Brand Strategy", "Creative Direction"],
    location: "Hyderabad, India",
    longBio:
      "Rishi founded GrowthYard with one goal: to build brands people actually remember. With a background in design and technology, he leads the creative vision and ensures every project exceeds expectations.",
    expertise: ["Creative Direction", "Web Development", "Brand Strategy"],
    projects: [
      {
        name: "Wrap Licks Identity",
        note: "Brand identity, tone of voice and social presence built to make flavour the hero.",
        href: "/work#wrap-licks",
      },
      {
        name: "Nexus FinTech Web",
        note: "Product-led marketing website and digital experience for a fintech brand.",
        href: "/work",
      },
      {
        name: "Aura Campaign",
        note: "Integrated brand campaign - identity, art direction and launch creative.",
        href: "/work",
      },
    ],
    experience: [
      { role: "Chief Operational Manager", company: "Social Squeeze Co.", period: "2024-2025" },
      { role: "NQ Discord Moderator", company: "N0DWIN Gaming", period: "2025-2026" },
      { role: "Founder", company: "GrowthYard", period: "Present" },
    ],
  },
  {
    slug: "darshil-mishra",
    name: "Darshil Mishra",
    role: "Co-Founder",
    roleLabel: "Co-Founder",
    bio: "Connects creative work to channel strategy, demand and measurable growth.",
    image: "",
    resumeImage: "",
    focus: ["Business Development", "Marketing", "Operations"],
    location: "Hyderabad, India",
    longBio:
      "Darshil co-founded GrowthYard and leads everything on the business side - partnerships, marketing and day-to-day operations. He turns creative output into pipeline, demand and long-term client relationships.",
    expertise: ["Business Development", "Marketing", "Operations"],
    projects: [
      {
        name: "Zephyr Mobility Ad Strategy",
        note: "Channel mapping, paid strategy and performance creative for a mobility brand.",
        href: "/work",
      },
      {
        name: "Pulse App Launch",
        note: "Go-to-market, launch narrative and growth campaigns for a new consumer app.",
        href: "/work",
      },
    ],
    experience: [
      { role: "Co-Founder", company: "GrowthYard", period: "Present" },
      { role: "Business Development & Operations", company: "GrowthYard", period: "2024-2025" },
    ],
  },
  {
    slug: "sri-charan",
    name: "Sri Charan",
    role: "Manager",
    roleLabel: "Manager",
    bio: "Turns ideas into identity, campaigns and content that look unmistakably premium.",
    image: "",
    resumeImage: "",
    focus: ["Project Management", "Client Success"],
    location: "Hyderabad, India",
    longBio:
      "Sri Charan is GrowthYard's operations backbone - the person who keeps projects on track and clients in the loop. He manages timelines, resourcing and delivery so the creative team can focus on the work.",
    expertise: ["Project Management", "Client Success"],
    projects: [
      {
        name: "Elevate Coffee",
        note: "Managed an end-to-end identity and launch for a specialty coffee brand.",
        href: "/work",
      },
      {
        name: "Lumina Interiors",
        note: "Led delivery of a full interior design house's web and campaign rollout.",
        href: "/work",
      },
    ],
    experience: [{ role: "Manager", company: "GrowthYard", period: "Present" }],
  },
  {
    slug: "keerthi",
    name: "Keerthi",
    role: "Content & Growth Associate",
    roleLabel: "Content & Growth",
    bio: "Keeps the work moving - timelines, launches and the details that make it feel effortless.",
    image: "",
    resumeImage: "",
    focus: ["Content Strategy", "Copywriting", "Social Media"],
    location: "Hyderabad, India",
    longBio:
      "Keerthi crafts the words and content strategy that carry each brand's voice into the world. From reels scripts to channel calendars, she keeps our clients' presence consistent, sharp and always on-message.",
    expertise: ["Content Strategy", "Copywriting", "Social Media"],
    projects: [
      {
        name: "Cavemans Pizzeria Reels",
        note: "Short-form content series and monthly reel engine for a growing pizzeria.",
        href: "/work#cavemans-pizzeria",
      },
      {
        name: "Wrap Licks Socials",
        note: "Social voice, content calendar and captions that made flavour the hero.",
        href: "/work#wrap-licks",
      },
    ],
    experience: [{ role: "Content & Growth Associate", company: "GrowthYard", period: "Present" }],
  },
];

export const team: TeamSection = {
  label: "The team",
  heading: "People behind the work.",
  members,
};

export const teamMembers = members;
