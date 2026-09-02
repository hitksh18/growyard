import type { TeamMember } from "@/types/team";
import Link from "next/link";
import Reveal from "@/components/animations/Reveal";

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export default function TeamCard({ member, index = 0 }: TeamCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");

  return (
    <Reveal distance={24} delay={index * 0.06}>
      <Link
        href={`/team/${member.slug}`}
        className="group block h-full"
        aria-label={`${member.name} — ${member.role}`}
      >
        <article className="h-full">
        {/* Editorial nameplate — typography-first portrait stand-in */}
        <div className="relative aspect-[4/5] overflow-hidden border border-paper/10 bg-charcoal/30">
          <span className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

          {/* Top folio row */}
          <span className="absolute left-5 top-5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-paper/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-5 top-5 text-[0.6rem] uppercase tracking-[0.2em] text-paper/30">
            GY—{String(index + 1).padStart(2, "0")}
          </span>

          {/* Oversized initials */}
          <span
            className="serif-em absolute inset-0 flex items-center justify-center leading-none text-paper/[0.14] transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:text-paper/[0.2]"
            style={{ fontSize: "clamp(5rem, 14vw, 8.5rem)" }}
            aria-hidden="true"
          >
            {initials}
          </span>

          {/* Accent rule */}
          <span
            className="absolute bottom-5 left-5 block h-px w-10 bg-accent transition-all duration-500 group-hover:w-20"
            aria-hidden="true"
          />
        </div>

        <div className="mt-6 border-t border-paper/10 pt-5">
          <h3 className="text-lg font-medium tracking-tight text-paper transition-colors duration-300 group-hover:text-accent">
            {member.name}
          </h3>
          <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-paper/45">
            {member.role}
          </p>
        </div>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/50">
          {member.bio}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.14em] text-paper/30">
          {member.focus.map((f) => f).join(" · ")}
        </p>
        </article>
      </Link>
    </Reveal>
  );
}