import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamCard from "@/components/about/TeamCard";
import FadeIn from "@/components/animations/FadeIn";
import { team, teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the GrowthYard team — strategy, creative, growth and delivery working directly on your brand.",
};

export default function TeamPage() {
  return (
    <section className="pb-24 pt-36 lg:pb-32 lg:pt-44">
      <Container>
        <SectionHeading
          label={team.label}
          number="01"
          description="A senior, hands-on team. You work directly with the people shaping your brand — no hand-offs to juniors."
        >
          {team.heading}
        </SectionHeading>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.slug} member={member} index={i} />
          ))}
        </div>

        <FadeIn>
          <div className="mt-24 border-t border-paper/10 pt-12 lg:mt-32">
            <p className="max-w-xl text-sm leading-relaxed text-paper/50">
              Curious how the team works together? See the process we follow on
              every engagement.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
