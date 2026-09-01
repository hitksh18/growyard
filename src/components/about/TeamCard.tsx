import type { TeamMember } from "@/types/team";
import Reveal from "@/components/animations/Reveal";

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export default function TeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <Reveal distance={24} delay={index * 0.06}>
      <article className="group">
        <div className="relative aspect-square overflow-hidden border border-paper/10 bg-charcoal/30">
          <span className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <span
            className="absolute inset-0 flex items-end justify-start transition-opacity duration-500 group-hover:opacity-60"
            aria-hidden="true"
          >
            <span className="serif-em -mb-6 -ml-2 text-[9rem] leading-none text-paper/[0.13]">
              {member.name.charAt(0)}
            </span>
          </span>
          <span className="absolute left-5 top-4 text-[0.6rem] uppercase tracking-[0.2em] text-paper/35">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-paper/10 pt-5">
          <div>
            <h3 className="text-lg font-medium tracking-tight text-paper">
              {member.name}
            </h3>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-accent">
              {member.role}
            </p>
          </div>
        </div>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/50">
          {member.bio}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.14em] text-paper/35">
          {member.focus.map((f) => f).join(" · ")}
        </p>
      </article>
    </Reveal>
  );
}