"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types/team";

const EASE = [0.16, 1, 0.3, 1] as const;

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const panelVariants = {
  initial: { opacity: 0, scale: 0.97, y: 8 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 6,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const listVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
  exit: { transition: { staggerChildren: 0.02 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2, ease: "easeIn" as const } },
};

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 1l12 12M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Left visual panel: portrait (cover) / resume (contain) / typographic stand-in. */
function VisualPanel({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");

  if (member.image) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[36rem]">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b10] via-transparent to-transparent" />
        <PanelFolio member={member} />
      </div>
    );
  }

  if (member.resumeImage) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f4f1] lg:aspect-auto lg:min-h-[36rem]">
        <Image
          src={member.resumeImage}
          alt={`${member.name} — portfolio / resume`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-contain p-4 sm:p-6 lg:p-10"
          priority
        />
        {/* Folio sits over the lighter document surface */}
        <div className="absolute inset-0">
          <PanelFolio member={member} onLight />
        </div>
      </div>
    );
  }

  // Typographic placeholder — matches the site's typography-first portrait language.
  return (
    <div className="relative flex aspect-[4/5] flex-col overflow-hidden bg-charcoal/40 lg:aspect-auto lg:min-h-[36rem]">
      <span className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <span className="relative hidden flex-1 lg:block" />
      <span
        className="serif-em relative -mb-4 mt-auto block pl-6 leading-none text-paper/[0.16] lg:pl-10"
        style={{ fontSize: "clamp(7rem, 18vw, 12rem)" }}
        aria-hidden="true"
      >
        {initials}
      </span>
      <PanelFolio member={member} />
    </div>
  );
}

function PanelFolio({ member, onLight }: { member: TeamMember; onLight?: boolean }) {
  const tone = onLight ? "text-[#6b6b66]" : "text-paper/50";
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-6 lg:p-8 ${tone}`}
    >
      <div className="flex items-start justify-between text-[0.6rem] font-medium uppercase tracking-[0.2em]">
        <span>GrowthYard</span>
        <span>GY—{member.name.split(" ")[0].slice(0, 2).toUpperCase()}</span>
      </div>
      <div>
        <span className="block h-px w-12 bg-accent" aria-hidden="true" />
      </div>
    </div>
  );
}

function Expertise({ items }: { items: string[] }) {
  return (
    <motion.div variants={itemVariants}>
      <span className="label-uppercase block text-paper/40">Expertise</span>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span
            key={item}
            className="inline-block cursor-default rounded-full border border-paper/15 bg-charcoal/40 px-4 py-2 text-[0.66rem] uppercase tracking-[0.14em] text-paper/75 transition-colors duration-300 hover:border-accent/50 hover:text-paper"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function KeyProjects({
  projects,
  onClose,
}: {
  projects: NonNullable<TeamMember["projects"]>;
  onClose: () => void;
}) {
  return (
    <motion.div className="border-t border-paper/10 pt-6" variants={itemVariants}>
      <span className="label-uppercase block text-paper/40">Key projects</span>
      <div className="mt-2 divide-y divide-paper/10">
        {projects.map((project, i) => {
          const cells = (
            <div className="flex min-w-0 items-baseline justify-between gap-4 py-4">
              <span className="flex min-w-0 items-baseline gap-4">
                <span className="shrink-0 text-[0.55rem] font-medium tracking-[0.2em] text-paper/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="truncate text-base font-medium tracking-tight text-paper transition-colors duration-300 group-hover:text-accent sm:text-lg">
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
          );

          if (project.href) {
            return (
              <Link
                key={project.name}
                href={project.href}
                onClick={onClose}
                className="group flex cursor-pointer items-center py-1 transition-colors duration-300 hover:bg-paper/[0.02]"
              >
                {cells}
              </Link>
            );
          }
          return (
            <div key={project.name} className="group py-1">
              {cells}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

interface TeamMemberModalProps {
  member: TeamMember;
  onClose: () => void;
}

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  const title = member.roleLabel ?? member.role;
  const expertise = member.expertise ?? member.focus;
  const projects = member.projects ?? [];
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <motion.button
        type="button"
        aria-label="Close"
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/75 backdrop-blur-md"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} — ${title}`}
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-paper/10 bg-[#0b0b10] sm:max-h-[calc(100dvh-3rem)]"
      >
        {/* Pinned close — top-right, stays put while content scrolls */}
        <div className="pointer-events-none absolute right-4 top-4 z-30 sm:right-5 sm:top-5">
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            variants={itemVariants}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 bg-ink/60 text-paper/70 backdrop-blur transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <CloseIcon />
          </motion.button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto overscroll-contain">
          <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {/* Image / portfolio preview */}
            <div className="relative">
              <VisualPanel member={member} />
            </div>

            {/* Personal information */}
            <motion.div
              variants={listVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-7 px-6 pb-8 pt-12 sm:px-10 lg:px-12 lg:pt-16"
            >
              <motion.div variants={itemVariants}>
                <span className="label-uppercase text-accent">{title}</span>
                <h2
                  className="mt-4 text-balance font-medium tracking-tight text-paper"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}
                >
                  {member.name}
                </h2>
                <p className="mt-3 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-paper/40">
                  <span className="h-1 w-4 bg-accent" aria-hidden="true" />
                  {member.location ?? "Hyderabad, India"}
                </p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="max-w-md text-[1.02rem] leading-relaxed text-paper/65"
              >
                {member.longBio ?? member.bio}
              </motion.p>

              <Expertise items={expertise} />
              <KeyProjects projects={projects} onClose={onClose} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
