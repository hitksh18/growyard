import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ReturnNavLink from "@/components/ui/ReturnNavLink";
import TeamCard from "./TeamCard";
import { team, teamMembers } from "@/data/team";

interface TeamSectionProps {
  number?: string;
}

export default function TeamSection({ number = "05" }: TeamSectionProps) {
  return (
    <section id="team" className="scroll-mt-24 border-t border-paper/10 py-24 lg:py-32">
      <Container>
        <SectionHeading label={team.label} number={number}>
          {team.heading}
        </SectionHeading>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.slug} member={member} index={i} />
          ))}
        </div>
        <ReturnNavLink
          section="team"
          href="/team"
          className="group mt-16 inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors duration-300 hover:text-accent lg:mt-20"
        >
          <span className="link-underline">View complete team</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </ReturnNavLink>
      </Container>
    </section>
  );
}