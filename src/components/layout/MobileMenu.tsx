"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { navigation } from "@/data/navigation";
import { BRAND } from "@/lib/constants";

interface MobileMenuProps {
  onClose: () => void;
  isHome: boolean;
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function MobileMenu({ onClose, isHome }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const router = useRouter();

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-ink"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative flex h-16 items-center justify-between px-6 sm:px-8 lg:h-20">
        <span className="flex items-center gap-2 text-paper">
          <span className="text-[0.8rem] font-semibold tracking-[0.08em] uppercase">
            GROWYARD
          </span>
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
        </span>
        <button
          type="button"
          className="group inline-flex h-10 w-10 flex-col items-center justify-center gap-[7px]"
          onClick={onClose}
          aria-label="Close menu"
        >
          <span className="block h-px w-6 -rotate-45 translate-y-[4px] bg-paper transition-colors group-hover:bg-accent" />
          <span className="block h-px w-6 rotate-45 -translate-y-[4px] bg-paper transition-colors group-hover:bg-accent" />
        </button>
      </div>

      <nav
        className="relative flex flex-1 flex-col justify-center px-6 sm:px-8 lg:px-12"
        aria-label="Mobile"
      >
        <motion.ul
          variants={reduce ? undefined : listVariants}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="flex flex-col"
        >
          {navigation.map((item, i) => (
            <motion.li
              key={item.href}
              variants={reduce ? undefined : itemVariants}
              className="overflow-hidden"
            >
              <a
                href={item.href}
                onClick={(e) => {
                  if (!item.section) return;
                  e.preventDefault();
                  if (isHome) {
                    const el = document.getElementById(item.section);
                    if (el) {
                      const headerOffset = 72;
                      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
                      window.scrollTo({ top, behavior: "smooth" });
                      if (window.location.hash) history.replaceState(null, "", window.location.pathname);
                    }
                  } else {
                    router.push(`/${item.section}`);
                  }
                  onClose();
                }}
                className="group flex cursor-pointer items-baseline justify-between border-b border-paper/10 py-4 sm:py-5"
              >
                <span className="flex items-baseline gap-3">
                  <span
                    className="text-[0.6rem] text-accent/70"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="serif-em text-4xl tracking-tight text-paper transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                    {item.label}
                  </span>
                </span>
                <span
                  className="text-paper/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4"
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="flex h-14 items-center justify-center gap-3 rounded-full bg-paper text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink"
          >
            Start a project
            <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-2 text-center text-xs text-paper/40">
            {BRAND.footerTagline}
          </p>
        </motion.div>
      </nav>
    </motion.div>
  );
}