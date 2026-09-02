"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { featuredProjects } from "@/data/projects";
import { ANIMATION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { rememberReturnSection } from "@/lib/returnNav";

const filters = [
  "All work",
  "Brand strategy",
  "Identity",
  "Digital design",
  "Social campaigns",
  "Content",
];

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ANIMATION.ease },
  },
};

export default function SelectedWork() {
  const reduced = useReducedMotion();

  if (reduced) {
    return <StaticWork />;
  }

  return (
    <section id="work" className="scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <Container>
        {/* Header — editorial tension across the horizontal grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="md:col-span-7"
          >
            <motion.div variants={item}>
              <SectionLabel number="03">Selected work</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-balance font-medium tracking-tight text-paper"
              style={{ fontSize: "clamp(2.2rem,4.8vw,3.9rem)", lineHeight: 1.02 }}
            >
              Work that
              <br />
              speaks for itself.
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: ANIMATION.ease, delay: 0.15 }}
            className="md:col-span-5 md:pl-6 lg:pl-12"
          >
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-md text-base leading-relaxed text-paper/70">
                Ideas that connect.
                <br />
                Design that communicates.
                <br />
                Growth that lasts.
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-paper/45">
                Here&apos;s a selection of work we&apos;re proud of.
              </p>
              <Link
                href="/work"
                onClick={() => rememberReturnSection("work")}
                className="group inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/80 transition-colors duration-300 hover:text-accent"
              >
                <span className="link-underline">View all work</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: ANIMATION.ease, delay: 0.2 }}
          className="mt-12 border-y border-paper/10 lg:mt-16"
        >
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 py-4 lg:gap-x-9">
            {filters.map((filter, i) => (
              <span
                key={filter}
                className={cn(
                  "cursor-default text-[0.66rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                  i === 0
                    ? "text-accent"
                    : "text-paper/45 hover:text-paper"
                )}
              >
                {filter}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-2.5 text-[0.66rem] uppercase tracking-[0.18em] text-paper/45">
              <span className="hidden h-px w-6 bg-paper/25 sm:block" aria-hidden="true" />
              Filter
              <span aria-hidden="true" className="text-paper/70">≡</span>
            </span>
          </div>
        </motion.div>

        {/* Project cards — single cohesive portfolio grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:mt-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-3"
        >
          {featuredProjects.map((project, i) => (
            <motion.div key={project.slug} variants={item} className="h-full">
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: ANIMATION.ease }}
          className="mt-10 sm:mt-12 lg:mt-16"
        >
          <div className="relative overflow-hidden border border-paper/10 bg-charcoal/40">
            <span
              className="absolute left-0 top-0 h-full w-px bg-accent/60"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:py-14">
              <div>
                <h3
                  className="text-balance font-medium tracking-tight text-paper"
                  style={{ fontSize: "clamp(1.7rem,3.4vw,2.6rem)", lineHeight: 1.05 }}
                >
                  Great work starts with a conversation.
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-paper/55">
                  Tell us about your project and let&apos;s build something impactful.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 self-start text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:text-accent lg:self-end"
              >
                <span className="link-underline">Start your project</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof featuredProjects)[number];
  index: number;
}

/** Exact tag lines per project, matching the portfolio design direction. */
const projectTags: Record<string, string> = {
  "wrap-licks": "Brand Strategy  •  Social Campaign",
  "cavemans-pizzeria": "Identity  •  Menus  •  Campaigns",
  koffeio: "Web Design  •  UX & UI",
};

function ProjectCard({ project, index }: ProjectCardProps) {
  const tags = projectTags[project.slug];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-paper/10 bg-charcoal/50 transition-colors duration-300 hover:border-paper/20">
      {/* Card header — number / year */}
      <div className="flex items-center justify-between px-5 pt-5 sm:px-6">
        <span className="text-[0.6rem] font-medium tracking-[0.2em] text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-paper/40">
          {project.year}
        </span>
      </div>

      {/* Visual area */}
      <Link
        href={`/work#${project.slug}`}
        onClick={() => rememberReturnSection("work")}
        className="group/visual relative mx-5 mt-4 block aspect-[16/10] overflow-hidden border border-paper/10 bg-ink sm:mx-6"
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-[50%_30%] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/visual:scale-[1.03]"
        />
        {/* Subtle blue geometry behind artwork */}
        <span
          className="pointer-events-none absolute right-6 top-6 h-16 w-16 rounded-full border border-accent/30 transition-all duration-500 group-hover/visual:border-accent/50"
          aria-hidden="true"
        />
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <h3 className="mt-5 text-xl font-medium tracking-tight text-paper transition-transform duration-300 group-hover:translate-x-0.5 sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2.5 text-[0.62rem] uppercase tracking-[0.18em] text-accent/80">
          {tags}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/50">
          {project.summary}
        </p>

        {/* Footer — case study link + circular arrow */}
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <Link
            href={`/work#${project.slug}`}
            onClick={() => rememberReturnSection("work")}
            className="group/link inline-flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors duration-300 hover:text-accent"
          >
            <span className="link-underline">View case study</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href={`/work#${project.slug}`}
            onClick={() => rememberReturnSection("work")}
            aria-label={`Open ${project.title} case study`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
          >
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* Reduced-motion: static, no reveal transforms */
function StaticWork() {
  return (
    <section id="work" className="scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel number="03">Selected work</SectionLabel>
            <h2
              className="mt-6 text-balance font-medium tracking-tight text-paper"
              style={{ fontSize: "clamp(2.2rem,4.8vw,3.9rem)", lineHeight: 1.02 }}
            >
              Work that
              <br />
              speaks for itself.
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-6 lg:pl-12">
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-md text-base leading-relaxed text-paper/70">
                Ideas that connect.
                <br />
                Design that communicates.
                <br />
                Growth that lasts.
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-paper/45">
                Here&apos;s a selection of work we&apos;re proud of.
              </p>
              <Link
                href="/work"
                onClick={() => rememberReturnSection("work")}
                className="group inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/80 transition-colors duration-300 hover:text-accent"
              >
                <span className="link-underline">View all work</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-y border-paper/10 lg:mt-16">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 py-4 lg:gap-x-9">
            {filters.map((filter, i) => (
              <span
                key={filter}
                className={cn(
                  "text-[0.66rem] font-medium uppercase tracking-[0.18em]",
                  i === 0 ? "text-accent" : "text-paper/45"
                )}
              >
                {filter}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-2.5 text-[0.66rem] uppercase tracking-[0.18em] text-paper/45">
              <span className="hidden h-px w-6 bg-paper/25 sm:block" aria-hidden="true" />
              Filter
              <span aria-hidden="true" className="text-paper/70">≡</span>
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:mt-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-16">
          <div className="relative overflow-hidden border border-paper/10 bg-charcoal/40">
            <span
              className="absolute left-0 top-0 h-full w-px bg-accent/60"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:py-14">
              <div>
                <h3
                  className="text-balance font-medium tracking-tight text-paper"
                  style={{ fontSize: "clamp(1.7rem,3.4vw,2.6rem)", lineHeight: 1.05 }}
                >
                  Great work starts with a conversation.
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-paper/55">
                  Tell us about your project and let&apos;s build something impactful.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 self-start text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:text-accent lg:self-end"
              >
                <span className="link-underline">Start your project</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-colors duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
