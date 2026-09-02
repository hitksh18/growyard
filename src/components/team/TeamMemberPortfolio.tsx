import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/types/team";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import FadeIn from "@/components/animations/FadeIn";
import { BRAND } from "@/lib/constants";

function Portrait({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");

  if (member.image) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden border border-paper/10">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      </div>
    );
  }

  // Typography-first portrait stand-in — no photo yet, matches the TeamCard style.
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-paper/10 bg-charcoal/30">
      <span className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <span className="absolute left-5 top-5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-paper/40">
        {member.roleLabel ?? member.role}
      </span>
      <span className="absolute right-5 top-5 text-[0.6rem] uppercase tracking-[0.2em] text-paper/30">
        GY
      </span>
      <span
        className="serif-em absolute inset-0 flex items-center justify-center leading-none text-paper/[0.16]"
        style={{ fontSize: "clamp(6rem, 18vw, 11rem)" }}
        aria-hidden="true"
      >
        {initials}
      </span>
      <span className="absolute bottom-5 left-5 block h-px w-10 bg-accent" aria-hidden="true" />
    </div>
  );
}

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
}

export default function TeamMemberPortfolio({ member }: { member: TeamMember }) {
  const title = member.roleLabel ?? member.role;
  const bio = member.longBio ?? member.bio;
  const expertise = member.expertise ?? member.focus;
  const projects = member.projects ?? [];
  const experience: ExperienceEntry[] = member.experience ?? [];

  return (
    <section className="pb-24 pt-32 lg:pb-32 lg:pt-36">
      <Container>
        {/* Back to team */}
        <FadeIn y={12}>
          <Link
            href="/#team"
            className="group inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.18em] text-paper/45 transition-colors duration-300 hover:text-paper"
          >
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to team
          </Link>
        </FadeIn>

        {/* Hero */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="max-w-3xl lg:col-span-7">
            <Reveal>
              <SectionLabel>{member.name.split(" ")[0]}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h1
                className="mt-6 text-balance font-medium tracking-tight text-paper"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 1.02 }}
              >
                {member.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="label-uppercase mt-6 flex items-center gap-4 text-paper/50">
                <span className="hidden h-px w-10 bg-accent sm:block" aria-hidden="true" />
                {title}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/60">
                {bio}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-paper/35">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {member.location ?? BRAND.location}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <Portrait member={member} />
            </Reveal>
          </div>
        </div>

        {/* About */}
        <div className="mt-24 border-t border-paper/10 pt-14 lg:mt-32 lg:pt-16">
          <Reveal>
            <SectionLabel number="01">About</SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-8 text-balance text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.12] tracking-tight text-paper">
              {bio}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/55 sm:text-lg">
              Working at the intersection of design and technology, {member.name.split(" ")[0]}{" "}
              shapes work that is as strategically sound as it is visually
              distinctive — attention to craft, detail and memory in everything.
            </p>
          </Reveal>
        </div>

        {/* Expertise */}
        <div className="mt-20 border-t border-paper/10 pt-14 lg:mt-24">
          <Reveal>
            <SectionLabel number="02">Expertise</SectionLabel>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {expertise.map((item, i) => (
              <Reveal key={item} delay={0.05 * i}>
                <span className="inline-block cursor-default rounded-full border border-paper/15 bg-charcoal/40 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.14em] text-paper/70 transition-colors duration-300 hover:border-accent/50 hover:text-paper">
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Key projects */}
        <div className="mt-20 border-t border-paper/10 pt-14 lg:mt-24">
          <Reveal>
            <SectionLabel number="03">Key projects</SectionLabel>
          </Reveal>
          <div className="mt-8 flex flex-col">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={0.04 * i}>
                <div
                  aria-label={`${project.name} — demo project`}
                  className="group flex cursor-default items-baseline justify-between gap-6 border-b border-paper/10 py-5 transition-colors duration-300 hover:bg-paper/[0.02] sm:py-6"
                >
                  <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-paper/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-xl font-medium tracking-tight text-paper transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                        {project.name}
                      </span>
                      {project.note && (
                        <span className="text-sm leading-relaxed text-paper/50">
                          {project.note}
                        </span>
                      )}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-paper/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Resume / Experience */}
        <div className="mt-20 border-t border-paper/10 pt-14 lg:mt-24">
          <Reveal>
            <SectionLabel number="04">Experience</SectionLabel>
          </Reveal>
          <div className="mt-8 flex max-w-3xl flex-col divide-y divide-paper/10">
            {experience.map((entry, i) => (
              <Reveal key={`${entry.role}-${i}`} delay={0.04 * i}>
                <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                  <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-paper/30 sm:col-span-3">
                    {entry.period}
                  </span>
                  <div className="sm:col-span-9">
                    <p className="text-base font-medium tracking-tight text-paper sm:text-lg">
                      {entry.role}
                    </p>
                    <p className="mt-0.5 text-sm text-paper/50">{entry.company}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
