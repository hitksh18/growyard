"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useIntro } from "@/providers/IntroProgressProvider";
import MobileMenu from "./MobileMenu";

interface NavItemProps {
  index: number;
  href: string;
  label: string;
  section?: string;
  progress: MotionValue<number>;
  active: boolean;
  activeSection: string | null;
}

function NavItem({
  index,
  href,
  label,
  section,
  progress,
  active,
  activeSection,
}: NavItemProps) {
  const lo = 0.8 + index * 0.028;
  const hi = Math.min(lo + 0.07, 0.99);
  const revealed = useTransform(progress, [lo, hi], [0, 1]);
  const travel = useTransform(progress, [lo, hi], [-5, 0]);
  const one = useMotionValue(1);

  const opacity = useTransform([revealed, one], (latest) =>
    active ? latest[0] : 1
  );
  const y = useTransform([travel, one], (latest) => (active ? latest[0] : 0));

  const isCurrent = activeSection === section;

  return (
    <motion.span style={{ opacity, y }} className="inline-flex">
      <Link
        href={href}
        aria-current={isCurrent ? "true" : undefined}
        className={cn(
          "group relative flex items-baseline gap-2 text-[0.66rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
          isCurrent ? "text-paper" : "text-paper/60 hover:text-paper"
        )}
      >
        <span
          className={cn(
            "text-[0.55rem] transition-colors duration-300",
            isCurrent ? "text-accent" : "text-accent/70"
          )}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {label}
        <span
          className={cn(
            "absolute -bottom-2 left-0 h-px bg-accent transition-all duration-500",
            isCurrent ? "w-full" : "w-0 group-hover:w-full"
          )}
          aria-hidden="true"
        />
      </Link>
    </motion.span>
  );
}

export default function Navbar() {
  const { progress, active, isHome } = useIntro();
  const { scrolled } = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  // One-way latch: once the intro reveals the navbar it stays for good.
  const revealedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reveal gate applied straight to the DOM after hydration so SSR/client
  // markup stays identical (no React-managed attrs that vary by motion state).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const apply = () => {
      if (active && progress.get() >= 0.85) revealedRef.current = true;
      const hidden = active && !open && !revealedRef.current;
      el.style.pointerEvents = hidden ? "none" : "";
      if (hidden) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    };
    apply();
    const off = progress.on("change", apply);
    return () => off();
  }, [progress, active, open]);

  // Scroll-spy over home sections → subtle accent on the active nav item.
  useEffect(() => {
    if (!isHome) return;
    const targets: HTMLElement[] = [];
    for (const item of navigation) {
      if (item.section) {
        const el = document.getElementById(item.section);
        if (el) targets.push(el);
      }
    }
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).id);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  // Surface (bg + hairline) reveal
  const one = useMotionValue(1);
  const scrolledMv = useMotionValue(0);
  useEffect(() => {
    scrolledMv.set(scrolled ? 1 : 0);
  }, [scrolled, scrolledMv]);

  const surfaceHome = useTransform(progress, [0.78, 0.95], [0, 1]);
  const surface = useTransform([surfaceHome, scrolledMv], (latest) =>
    active ? latest[0] : isHome ? 1 : latest[1]
  );

  // Logo crossfades in once the intro has settled
  const logoReveal = useTransform(progress, [0.9, 1], [0, 1]);
  const logoOpacity = useTransform([logoReveal, one], (latest) =>
    active ? latest[0] : 1
  );

  // CTA + hamburger
  const ctaReveal = useTransform(progress, [0.78, 0.9], [0, 1]);
  const ctaTravel = useTransform(progress, [0.78, 0.9], [-4, 0]);
  const ctaOpacity = useTransform([ctaReveal, one], (latest) =>
    active ? latest[0] : 1
  );
  const ctaY = useTransform([ctaTravel, one], (latest) =>
    active ? latest[0] : 0
  );

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
        {/* Surface layer — fades in with the intro */}
        <motion.div
          className="absolute inset-0 border-b border-line bg-ink/85 backdrop-blur-md"
          style={{ opacity: surface }}
          aria-hidden="true"
        />

        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          className="relative mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-12"
        >
          <motion.span style={{ opacity: logoOpacity }} className="inline-flex">
            <Link
              href="/"
              aria-label="GrowthYard home"
              className="group flex items-center gap-2 text-paper"
              onClick={() => setOpen(false)}
            >
              <span className="text-[0.8rem] font-semibold tracking-[0.08em] uppercase">
                GrowthYard
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
                aria-hidden="true"
              />
            </Link>
          </motion.span>

          <nav
            className="hidden items-center gap-6 lg:flex xl:gap-8"
            aria-label="Primary"
          >
            {navigation.map((item, i) => (
              <NavItem
                key={item.href}
                index={i}
                href={item.href}
                label={item.label}
                section={item.section}
                progress={progress}
                active={active}
                activeSection={activeSection}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.span
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="hidden lg:inline-flex"
            >
              <Link
                href="/contact"
                className="group flex items-center gap-2 border border-paper/25 px-5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
              >
                Start a project
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </motion.span>

            <motion.span style={{ opacity: ctaOpacity, y: ctaY }}>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center text-paper lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Hamburger />
              </button>
            </motion.span>
          </div>
        </motion.div>
        <ScrollProgressBar />
      </header>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function Hamburger() {
  const line =
    "block h-px w-6 bg-paper transition-all duration-300 group-hover:bg-accent";
  return (
    <span className="group flex flex-col gap-[7px]" aria-hidden="true">
      <span className={line} />
      <span className={line} />
    </span>
  );
}

function ScrollProgressBar() {
  const { progress } = useScrollProgress();
  return (
    <motion.div
      className="absolute bottom-[-1px] left-0 h-px bg-accent"
      style={{ scaleX: progress, transformOrigin: "left" }}
      aria-hidden="true"
    />
  );
}