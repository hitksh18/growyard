"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useIntro } from "@/providers/IntroProgressProvider";

/** Navbar logo text size in px — the hero wordmark morphs down to exactly this. */
const NAV_LOGO_FONT_PX = 12.8;

export default function Hero() {
  const { progress, active, navSlot } = useIntro();

  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  // Morph metrics: current wordmark font size + viewport height.
  const [metrics, setMetrics] = useState({ fontPx: 0, vh: 0 });

  useEffect(() => {
    const measure = () => {
      const el = wordmarkRef.current;
      const fontPx = el ? parseFloat(getComputedStyle(el).fontSize) || 0 : 0;
      setMetrics({ fontPx, vh: window.innerHeight || 1 });
    };
    measure();
    const t1 = window.setTimeout(measure, 350);
    const t2 = window.setTimeout(measure, 1200);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Start anchor: wordmark centred at 42vh. Shrink toward the measured navbar slot.
  const targetY =
    active && metrics.vh > 0
      ? (navSlot?.top ??
          (typeof window !== "undefined"
            ? window.innerWidth >= 1024
              ? 34
              : 26
            : 26)) -
        0.42 * metrics.vh
      : 0;

  const scaleTarget =
    active && metrics.fontPx > 0
      ? Math.max(0.02, NAV_LOGO_FONT_PX / metrics.fontPx)
      : 1;

  // Signature scroll morph: GROWTHYARD settles into the navbar.
  const wordmarkY = useTransform(progress, [0, 1], [0, targetY]);
  const wordmarkScale = useTransform(progress, [0, 1], [1, scaleTarget]);
  const wordmarkOpacity = useTransform(progress, [0.78, 0.92], [1, active ? 0 : 1]);

  const taglineOpacity = useTransform(progress, [0.02, 0.16], [1, active ? 0 : 1]);
  const taglineY = useTransform(progress, [0.02, 0.16], [0, active ? -10 : 0]);
  const cueOpacity = useTransform(progress, [0, 0.14], [1, active ? 0 : 1]);

  // Statement reveal — appears once the brand has settled into the nav.
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.95", "start 0.5"],
  });
  const statementOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [active ? 0 : 1, 1]
  );
  const statementY = useTransform(scrollYProgress, [0, 0.5], [active ? 44 : 0, 0]);

  return (
    <section
      id="hero"
      aria-label="GrowthYard — brand intro"
      className={cn(
        "relative",
        active
          ? "min-h-[200svh]"
          : "flex min-h-svh flex-col justify-center overflow-hidden pb-32 pt-32 lg:pb-40"
      )}
    >
      <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />
      <div
        className="glow-behind absolute left-1/2 top-0 h-[70%] w-[70%] -translate-x-1/2 opacity-30"
        aria-hidden="true"
      />

      {/* Brand title sequence — fixed while the morph runs, in-flow when reduced */}
      <motion.div
        className={cn(
          "overflow-hidden",
          active && "pointer-events-none fixed inset-x-0 top-0 z-[5]"
        )}
        initial={active ? { opacity: 0, y: 34 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={active ? { marginTop: "42vh" } : undefined}>
          <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <motion.h1
              ref={wordmarkRef}
              style={{
                scale: wordmarkScale,
                y: wordmarkY,
                opacity: wordmarkOpacity,
                transformOrigin: "top left",
              }}
              className="flex w-max items-center gap-[0.45em] font-semibold uppercase leading-none tracking-[0.08em] text-paper will-change-transform text-[clamp(2.4rem,10vw,4.4rem)] lg:text-[clamp(5rem,8.6vw,9rem)]"
            >
              GrowthYard
              <span
                className="h-[0.5em] w-[0.5em] rounded-full bg-accent"
                aria-hidden="true"
              />
            </motion.h1>

            <motion.p
              style={{ opacity: taglineOpacity, y: taglineY }}
              className={cn(
                "label-uppercase flex items-center gap-3 text-paper/55",
                active ? "mt-8" : "mt-6"
              )}
            >
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              Independent Creative &amp; Growth Agency
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Statement — fills the second half of the opening sequence */}
      <motion.div ref={statementRef} className={active ? "pt-[104svh]" : ""}>
        <motion.div
          style={{ opacity: statementOpacity, y: statementY }}
          className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12"
        >
          <h2
            className="max-w-4xl text-balance font-medium tracking-tight text-paper"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)", lineHeight: 1.04 }}
          >
            We build
            <br />
            brands{" "}
            <span className="serif-em">
              that refuse
              <br />
              to be ignored.
            </span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-paper/60 sm:text-lg">
            GrowthYard turns strategy, creativity and digital marketing into
            brands people notice — and growth people can measure.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button href="/work" variant="ghost" size="lg" iconDirection="up">
              See our work
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div style={{ opacity: cueOpacity }}>
        <div
          data-scrollcue
          className={cn(
            "flex flex-col items-center gap-3",
            active
              ? "pointer-events-none fixed bottom-8 left-1/2 z-[4] -translate-x-1/2"
              : "mt-20"
          )}
        >
          <span className="block h-14 w-px overflow-hidden bg-paper/15">
            <span className="block h-full w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-paper/35">
            Scroll to explore
          </span>
        </div>
      </motion.div>
    </section>
  );
}