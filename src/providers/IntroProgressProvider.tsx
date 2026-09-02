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
   * Smoothed intro progress 0..1 across the hero scroll timeline.
   *
   * 0.00 – GrowthYard centered (subtitle visible)
   * 0.00 → 0.30 – GrowthYard moves upward
   * 0.30 – GrowthYard locked at top
   * 0.30 → 0.62 – headlines + keywords reveal (while GrowthYard locked)
   * 0.62 → 0.74 – full composition holds
   * 0.74 → 1.00 – entire hero exits upward
   * 1.00 – navbar appears, normal homepage scroll begins
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

// The hero timeline container is 400vh tall. With `sticky top-0` it stays
// pinned for (400vh - 100vh) = 300vh of scroll. progress 0..1 maps to that
// pin distance, so progress hits 1 exactly as the hero releases and the
// navbar takes over.
const HERO_CONTAINER_VIEWPORTS = 4;
const HERO_PIN_VIEWPORTS = HERO_CONTAINER_VIEWPORTS - 1; // 3

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
  // Scroll-linked timeline: a sluggish spring here makes `progress` lag behind
  // the scroll and creep slowly toward its final value, which freezes the hero
  // on its last frame after the intro completes and delays the release to the
  // next content. Use a much stiffer, near-critically-damped spring so progress
  // tracks the scroll almost 1:1 and settles immediately — the intro and the
  // following content read as ONE continuous animation with no frozen gap.
  const progress = useSpring(raw, {
    stiffness: 850,
    damping: 70,
    mass: 1,
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
      const pinDistance = HERO_PIN_VIEWPORTS * vh;
      const clamped = Math.max(0, Math.min(1, window.scrollY / pinDistance));
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
