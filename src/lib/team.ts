import { teamMembers } from "@/data/team";
import type { TeamMember } from "@/types/team";

/** All team member slugs — used by generateStaticParams so every member gets a page. */
export function getAllTeamSlugs(): string[] {
  return teamMembers.map((m) => m.slug);
}

/** Resolve a team member by slug, or undefined when not found. */
export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}
