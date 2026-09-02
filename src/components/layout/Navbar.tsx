"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { consumeReturnSection } from "@/lib/returnNav";
import MobileMenu from "./MobileMenu";

/** Sections that have a home section AND a dedicated page route. */
const NAVIGABLE = new Set([
  "about",
  "services",
  "work",
  "process",
  "team",
  "faq",
]);

/** Homepage in-page smooth-scroll to a section. Keeps the URL at "/". */
function scrollToSection(section?: string) {
  if (!section) return;
  const el = document.getElementById(section);
  if (!el) return;
  // Account for sticky navbar (h-16 = 64px) + small breathing
  const headerOffset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
  // Keep URL at "/" — never create /#about
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
  }
}

interface NavItemProps {
  index: number;
  href: string;
  label: string;
  section?: string;
  progress: MotionValue<number>;
  active: boolean;
  isHome: boolean;
  activeSection: string | null;
}

function NavItem({
  index,
  href,
  label,
  section,
  progress,
  active,
  isHome,
  activeSection,
}: NavItemProps) {
  const router = useRouter();
  const lo = 0.96 + index * 0.006;
  const hi = Math.min(lo + 0.02, 1);
  const revealed = useTransform(progress, [lo, hi], [0, 1]);
  const travel = useTransform(progress, [lo, hi], [-4, 0]);
  const one = useMotionValue(1);

  const opacity = useTransform([revealed, one], (latest) =>
    active ? latest[0] : 1
  );
  const y = useTransform([travel, one], (latest) => (active ? latest[0] : 0));

  const isCurrent = activeSection === section;

  // Route-aware navigation:
  //  - homepage "/"   → smooth-scroll to the in-page section (stay on "/")
  //  - dedicated page → navigate to the dedicated route /<section>
  const handleClick = (e: React.MouseEvent) => {
    if (section && isHome) {
      e.preventDefault();
      scrollToSection(section);
      return;
    }
    if (section) {
      e.preventDefault();
      router.push(`/${section}`);
    }
  };

  return (
    <motion.span style={{ opacity, y }} className="inline-flex">
      <a
        href={href}
        aria-current={isCurrent ? "true" : undefined}
        onClick={handleClick}
        className={cn(
          "group relative flex cursor-pointer items-baseline gap-2 text-[0.66rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
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
      </a>
    </motion.span>
  );
}

export default function Navbar() {
  const { progress, active, isHome } = useIntro();
  const pathname = usePathname();
  const router = useRouter();
  const { scrolled } = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Logo navigation: on a dedicated page, return to the homepage section the
  // user came from (skipping the intro) via a clean ?section= query signal. On
  // direct visits, go to the normal homepage entry point. On the homepage
  // itself, just return home.
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (!isHome) {
      const section = consumeReturnSection();
      router.push(section ? `/?section=${section}` : "/");
    } else {
      router.push("/");
    }
  };

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
  // Delayed to ~0.98 so the navbar stays completely hidden until the hero has
  // finished exiting, then stays revealed for good.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const apply = () => {
      if (active && progress.get() >= 0.98) revealedRef.current = true;
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
  // Uses ONE scroll listener. The active section is the last navigable section
  // whose top has scrolled past the detection band. The final "Let's get to
  // work" (contact) section and the footer are OUTSIDE the navigable set, so
  // the state is explicitly cleared to null there instead of keeping FAQ lit.
  useEffect(() => {
    if (!isHome) return;
    const BAND = 0.35; // detection line sits in the upper viewport, below navbar
    // "contact" is intentionally last — it exists so detection knows we've left faq.
    const ids = ["about", "services", "work", "process", "team", "faq", "contact"];
    const sections = ids
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((s): s is { id: string; el: HTMLElement } => Boolean(s.el));

    const top = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY;

    let raf = 0;
    const update = () => {
      raf = 0;
      const refLine = window.scrollY + window.innerHeight * BAND;

      let current: string | null = null;
      for (const s of sections) {
        if (top(s.el) <= refLine) {
          current = s.id;
        } else {
          break;
        }
      }
      // Only navigable sections highlight; contact/footer clear to null.
      setActiveSection(
        current && NAVIGABLE.has(current) ? current : null
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isHome]);

  // Route-aware active state.
  //  - Homepage: driven by the in-page scroll-spy (activeSection state).
  //  - Dedicated pages: driven by the current route (e.g. /work → "work"),
  //    so the right item stays active regardless of scroll; browser
  //    back/forward keeps this in sync because it derives from pathname.
  const effectiveActive = isHome
    ? activeSection
    : NAVIGABLE.has(pathname.slice(1))
      ? pathname.slice(1)
      : null;

  // Surface (bg + hairline) reveal
  const one = useMotionValue(1);
  const scrolledMv = useMotionValue(0);
  useEffect(() => {
    scrolledMv.set(scrolled ? 1 : 0);
  }, [scrolled, scrolledMv]);

  const surfaceHome = useTransform(progress, [0.94, 1], [0, 1]);
  const surface = useTransform([surfaceHome, scrolledMv], (latest) =>
    active ? latest[0] : isHome ? 1 : latest[1]
  );

  // Logo crossfades in once the hero has fully exited — delayed per spec
  const logoReveal = useTransform(progress, [0.97, 1], [0, 1]);
  const logoOpacity = useTransform([logoReveal, one], (latest) =>
    active ? latest[0] : 1
  );

  // CTA + hamburger — delayed to match hero completion
  const ctaReveal = useTransform(progress, [0.94, 1], [0, 1]);
  const ctaTravel = useTransform(progress, [0.94, 1], [-4, 0]);
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
              onClick={handleLogoClick}
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
                isHome={isHome}
                activeSection={effectiveActive}
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
        {open && <MobileMenu onClose={() => setOpen(false)} isHome={isHome} />}
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