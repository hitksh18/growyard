"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { usePathname } from "next/navigation";

interface IntroContextValue {
  /** True when on the homepage. */
  isHome: boolean;
  /** True when the morph intro runs (homepage + motion allowed). */
  active: boolean;
  /** prefers-reduced-motion. */
  reduced: boolean;
  /**
   * Smoothed intro progress 0..1 across the first TWO viewports of scrolling.
   * 0 = brand title sequence (wordmark large, navbar hidden).
   * ~0.5 = "What GrowthYard Is" positioning is reached.
   * 1 = intro complete — navbar fully revealed and sticky.
   */
  progress: MotionValue<number>;
}

const IntroContext = createContext<IntroContextValue | null>(null);

export function useIntro(): IntroContextValue {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    throw new Error("useIntro must be used within <IntroProgressProvider>");
  }
  return ctx;
}

export function IntroProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduced = useReducedMotion() === true;
  const active = isHome && !reduced;

  const raw = useMotionValue(active ? 0 : 1);
  const progress = useSpring(raw, {
    stiffness: 110,
    damping: 30,
    mass: 0.95,
  });

  useEffect(() => {
    if (!active) {
      raw.set(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      // The intro spans two viewports (brand intro + positioning).
      const clamped = Math.max(0, Math.min(1, window.scrollY / (2 * vh)));
      raw.set(clamped);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, raw]);

  return (
    <IntroContext.Provider value={{ isHome, active, reduced, progress }}>
      {children}
    </IntroContext.Provider>
  );
}