import Link from "next/link";
import type { TeamMember } from "@/types/team";
import Reveal from "@/components/animations/Reveal";

interface TeamDirectoryCardProps {
  member: TeamMember;
  index?: number;
}

export default function TeamDirectoryCard({
  member,
  index = 0,
}: TeamDirectoryCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");
  const role = member.roleLabel ?? member.role;
  const skills = (member.expertise ?? member.focus).join(" · ");

  return (
    <Reveal distance={24} delay={index * 0.06}>
      <Link
        href={`/team/${member.slug}`}
        className="group block h-full"
        aria-label={`${member.name} — ${role}`}
      >
        <article className="relative h-full">
          {/* Portrait / avatar */}
          <div className="relative aspect-[4/5] overflow-hidden border border-paper/10 bg-charcoal/30">
            <span className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

            <span className="absolute left-5 top-5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-paper/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="absolute right-5 top-5 text-[0.6rem] uppercase tracking-[0.2em] text-paper/30">
              GY—{String(index + 1).padStart(2, "0")}
            </span>

            <span
              className="serif-em absolute inset-0 flex items-center justify-center leading-none text-paper/[0.14] transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:text-paper/[0.2]"
              style={{ fontSize: "clamp(5rem, 14vw, 8.5rem)" }}
              aria-hidden="true"
            >
              {initials}
            </span>

            <span
              className="absolute bottom-5 left-5 block h-px w-10 bg-accent transition-all duration-500 group-hover:w-20"
              aria-hidden="true"
            />

            {/* Corner arrow */}
            <span
              aria-hidden="true"
              className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
            >
              ↗
            </span>
          </div>

          {/* Body */}
          <div className="mt-6 border-t border-paper/10 pt-5">
            <h3 className="text-lg font-medium tracking-tight text-paper transition-colors duration-300 group-hover:text-accent">
              {member.name}
            </h3>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-paper/45">
              {role}
            </p>
            <p className="mt-3 line-clamp-2 text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-paper/40">
              {skills}
            </p>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
