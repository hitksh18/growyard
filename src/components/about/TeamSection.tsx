import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamCard from "./TeamCard";
import { team, teamMembers } from "@/data/team";

interface TeamSectionProps {
  number?: string;
}

export default function TeamSection({ number = "06" }: TeamSectionProps) {
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
      </Container>
    </section>
  );
}