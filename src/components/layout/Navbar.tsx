"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { scrolled } = useScrollProgress();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-line",
          scrolled && !open
            ? "bg-ink/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-12">
          <Link
            href="/"
            className="group flex items-center gap-2 text-paper"
            aria-label="GrowthYard home"
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

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {navigation.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-baseline gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/60 transition-colors duration-300 hover:text-paper"
              >
                <span
                  className="text-[0.55rem] text-accent/70"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full border border-paper/20 px-6 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-300 hover:border-accent hover:bg-accent lg:inline-flex"
            >
              Start a project
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-paper lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Hamburger />
            </button>
          </div>
        </div>
        <ScrollProgressBar />
      </motion.header>

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