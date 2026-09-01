"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
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
  progress: MotionValue<number>;
  active: boolean;
}

function NavItem({ index, href, label, progress, active }: NavItemProps) {
  const lo = 0.14 + index * 0.045;
  const hi = Math.min(lo + 0.085, 0.6);
  const revealed = useTransform(progress, [lo, hi], [0, 1]);
  const travel = useTransform(progress, [lo, hi], [-5, 0]);
  const one = useMotionValue(1);

  const opacity = useTransform([revealed, one], (latest) =>
    active ? latest[0] : 1
  );
  const y = useTransform([travel, one], (latest) => (active ? latest[0] : 0));

  return (
    <motion.span style={{ opacity, y }} className="inline-flex">
      <Link
        href={href}
        className="group relative flex items-baseline gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/60 transition-colors duration-300 hover:text-paper"
      >
        <span className="text-[0.55rem] text-accent/70" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        {label}
        <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
      </Link>
    </motion.span>
  );
}

export default function Navbar() {
  const { progress, active } = useIntro();
  const { scrolled } = useScrollProgress();
  const { setNavSlot } = useIntro();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(() => !!active);

  const logoRef = useRef<HTMLAnchorElement>(null);

  // Measure the exact navbar logo slot (viewport px) so the hero wordmark
  // can morph into this position. Re-measured after fonts settle + resize.
  useLayoutEffect(() => {
    const read = () => {
      const el = logoRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        setNavSlot({ left: r.left, top: r.top });
      }
    };
    read();
    const t = window.setTimeout(read, 350);
    const r = window.setTimeout(read, 1200);
    window.addEventListener("resize", read);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(r);
      window.removeEventListener("resize", read);
    };
  }, [setNavSlot]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useMotionValueEvent(progress, "change", (v) => {
    setHidden(active && !open && v < 0.06);
  });

  // Surface (bg + blur + hairline) reveal
  const one = useMotionValue(1);
  const scrolledMv = useMotionValue(0);
  useEffect(() => {
    scrolledMv.set(scrolled ? 1 : 0);
  }, [scrolled, scrolledMv]);

  const surfaceHome = useTransform(progress, [0.04, 0.2], [0, 1]);
  const surface = useTransform([surfaceHome, scrolledMv], (latest) =>
    active ? latest[0] : latest[1]
  );

  // Logo crossfades in where the hero wordmark lands
  const logoReveal = useTransform(progress, [0.6, 0.86], [0, 1]);
  const logoOpacity = useTransform([logoReveal, one], (latest) =>
    active ? latest[0] : 1
  );

  // CTA + hamburger
  const ctaReveal = useTransform(progress, [0.18, 0.34], [0, 1]);
  const ctaTravel = useTransform(progress, [0.18, 0.34], [-4, 0]);
  const ctaOpacity = useTransform([ctaReveal, one], (latest) =>
    active ? latest[0] : 1
  );
  const ctaY = useTransform([ctaTravel, one], (latest) =>
    active ? latest[0] : 0
  );

  return (
    <>
      <header
        inert={hidden || undefined}
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          hidden ? "pointer-events-none" : "pointer-events-auto"
        )}
      >
        {/* Surface layer — fades in with the morph */}
        <motion.div
          className="absolute inset-0 border-b border-line bg-ink/80 backdrop-blur-xl"
          style={{ opacity: surface }}
          aria-hidden="true"
        />

        <motion.div
          initial={!active ? { y: -24, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-12"
        >
          <motion.span
            style={{ opacity: logoOpacity }}
            className="inline-flex"
          >
            <Link
              ref={logoRef}
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
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {navigation.map((item, i) => (
              <NavItem
                key={item.href}
                index={i}
                href={item.href}
                label={item.label}
                progress={progress}
                active={active}
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
                className="group flex items-center gap-2 rounded-full border border-paper/20 px-6 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-300 hover:border-accent hover:bg-accent"
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