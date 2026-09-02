import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamMemberPortfolio from "@/components/team/TeamMemberPortfolio";
import { getAllTeamSlugs, getTeamMemberBySlug } from "@/lib/team";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTeamSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return {};
  return {
    title: member.name,
    description: member.longBio ?? member.bio,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();
  return <TeamMemberPortfolio member={member} />;
}
