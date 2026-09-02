import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import FadeIn from "@/components/animations/FadeIn";
import TeamDirectoryCard from "@/components/about/TeamDirectoryCard";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the GrowthYard team — strategy, creative, growth and delivery working directly on your brand.",
};

export default function TeamPage() {
  return (
    <section className="pb-24 pt-36 lg:pb-32 lg:pt-44">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel number="05">Team</SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <h1
              className="mt-8 text-balance font-medium tracking-tight text-paper"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", lineHeight: 1.03 }}
            >
              The people behind the work.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/55 sm:text-lg">
              GrowthYard is built by a small team combining strategy, creativity,
              technology and growth — senior, hands-on people you work with
              directly from first idea to launch.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <TeamDirectoryCard key={member.slug} member={member} index={i} />
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
