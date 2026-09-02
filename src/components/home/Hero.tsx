"use client";

import { motion, useTransform } from "framer-motion";
import { useIntro } from "@/providers/IntroProgressProvider";

const principles = [
  { word: "STRATEGY.", delay: 0 },
  { word: "CREATIVITY.", delay: 0.08 },
  { word: "GROWTH.", delay: 0.16 },
];

export default function Hero() {
  const { progress, reduced } = useIntro();

  // 1-3 — GROWYARD: CENTER → MOVE UP → SETTLE → HOLD
  // Starts centered, travels upward, then STOPS. Final position upper-portion.
  // Range clamp ensures HOLD after 0.42.
  const wordmarkY = useTransform(progress, [0, 0.38, 0.42, 1], [0, -108, -124, -124]);
  const wordmarkScale = useTransform(progress, [0, 0.42, 1], [1, 0.92, 0.92]);
  const wordmarkOpacity = useTransform(progress, [0.84, 0.97], [1, 0]);

  const taglineOpacity = useTransform(progress, [0, 0.22], [1, 0]);
  const taglineY = useTransform(progress, [0, 0.22], [0, -10]);

  // Background subtle movement — very restrained
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.9, 0.55, 0.3]);
  const gridOpacity = useTransform(progress, [0, 0.6], [0.48, 0.28]);

  // 4 — MANIFESTO: comes AFTER logo settles (starts at ~0.52)
  const manifestoOpacity = useTransform(progress, [0.52, 0.68], [0, 1]);
  const manifestoY = useTransform(progress, [0.52, 0.68], [22, 0]);
  const manifestoBlurVal = useTransform(progress, [0.52, 0.68], [8, 0]);
  const manifestoFilter = useTransform(manifestoBlurVal, (v) => `blur(${v}px)`);

  // "We make them matter." — staggered after first line, premium
  const emphasisOpacity = useTransform(progress, [0.60, 0.76], [0, 1]);
  const emphasisY = useTransform(progress, [0.60, 0.76], [16, 0]);
  const emphasisBlurVal = useTransform(progress, [0.60, 0.76], [6, 0]);
  const emphasisFilter = useTransform(emphasisBlurVal, (v) => `blur(${v}px)`);

  // Principles — staggered, typography + line, after manifesto
  const principlesOpacity = useTransform(progress, [0.70, 0.84], [0, 1]);
  const principlesY = useTransform(progress, [0.70, 0.84], [16, 0]);
  const lineScale = useTransform(progress, [0.74, 0.86], [0, 1]);
  const closingOpacity = useTransform(progress, [0.78, 0.9], [0, 1]);

  // Staggered principles individual — after manifesto, sequential
  const p0Opacity = useTransform(progress, [0.70, 0.82], [0, 1]);
  const p0Y = useTransform(progress, [0.70, 0.82], [10, 0]);
  const p1Opacity = useTransform(progress, [0.74, 0.86], [0, 1]);
  const p1Y = useTransform(progress, [0.74, 0.86], [10, 0]);
  const p2Opacity = useTransform(progress, [0.78, 0.90], [0, 1]);
  const p2Y = useTransform(progress, [0.78, 0.90], [10, 0]);

  if (reduced) {
    return (
      <section
        id="hero"
        aria-label="GROWYARD — brand intro"
        className="relative overflow-hidden"
      >
        <div className="bg-tonal absolute inset-0" aria-hidden="true" />
        <div className="grid-bg absolute inset-0 opacity-[0.34]" aria-hidden="true" />
        <div className="glow-behind absolute left-1/2 top-[18%] h-[62%] w-[78%] -translate-x-1/2" aria-hidden="true" />
        <div className="vignette absolute inset-0 opacity-60" aria-hidden="true" />

        {/* 01 — BRAND INTRO (static for reduced motion) */}
        <div className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-12">
          <h1 className="inline-flex max-w-full items-center justify-center gap-[0.42em] font-semibold uppercase leading-none tracking-[0.09em] text-paper text-[clamp(2.6rem,10vw,5.2rem)] lg:text-[clamp(5.2rem,8.4vw,8.8rem)]">
            GROWYARD
            <span className="h-[0.46em] w-[0.46em] rounded-full bg-accent" aria-hidden="true" />
          </h1>
          <p className="label-uppercase mt-8 flex items-center gap-4 text-paper/60">
            <span className="hidden h-px w-12 bg-accent sm:block" aria-hidden="true" />
            Independent Creative &amp; Growth Agency
            <span className="hidden h-px w-12 bg-accent sm:block" aria-hidden="true" />
          </p>
        </div>

        {/* 02 — MANIFESTO */}
        <div className="relative mx-auto flex min-h-[72svh] max-w-[1440px] flex-col items-center justify-center px-6 py-16 text-center sm:px-8 lg:px-12">
          <h2 className="max-w-3xl text-balance font-medium tracking-tight text-paper">
            <span className="block text-[clamp(1.5rem,3.6vw,2.55rem)] font-normal leading-[1.15] text-paper/90">
              We don&apos;t just make brands look better.
            </span>
            <span className="serif-em mt-3 block text-[clamp(2.6rem,6.2vw,5.1rem)] leading-[0.95] text-paper">
              We make them matter.
            </span>
          </h2>

          <div className="mt-14 flex flex-col items-center">
            <div className="flex flex-col items-center gap-2">
              {principles.map((p) => (
                <p
                  key={p.word}
                  className="text-center text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper/55"
                >
                  {p.word}
                </p>
              ))}
            </div>
            <span className="mt-5 block h-px w-16 bg-paper/15" aria-hidden="true" />
            <p className="mt-4 text-sm tracking-wide text-paper/45">One connected system.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      aria-label="GROWYARD — brand intro"
      className="relative"
    >
      {/* Background system */}
      <div className="bg-tonal absolute inset-0" aria-hidden="true" />
      <motion.div
        style={{ opacity: gridOpacity }}
        className="grid-bg absolute inset-0"
        aria-hidden="true"
      />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="glow-behind absolute left-1/2 top-[14%] h-[66%] w-[80%] -translate-x-1/2"
        aria-hidden="true"
      />
      <div className="vignette pointer-events-none absolute inset-0 opacity-[0.72]" aria-hidden="true" />
      {/* Subtle grain is handled globally via .grain if needed, keep background restrained */}

      {/* Scroll space — 2 viewports: brand intro + manifesto. Sticky keeps wordmark present. */}
      <div className="relative">
        {/* Provides scroll length; sticky child stays for ~100svh */}
        <div className="relative h-[200svh]">
          <div className="sticky top-0 flex h-svh flex-col items-center overflow-hidden px-6 sm:px-8 lg:px-12">
            {/* Upper composition — wordmark + tagline */}
            <div className="flex flex-1 flex-col items-center justify-center pt-10 lg:pt-8">
              {/* Wordmark — remains LARGE, only slight scale reduction */}
              <motion.h1
                style={{
                  y: wordmarkY,
                  scale: wordmarkScale,
                  opacity: wordmarkOpacity,
                }}
                className="inline-flex max-w-full items-center justify-center gap-[0.42em] font-semibold uppercase leading-none tracking-[0.09em] text-paper will-change-transform text-[clamp(2.55rem,10.5vw,4.8rem)] sm:text-[clamp(3rem,9vw,6rem)] lg:text-[clamp(5.4rem,8.6vw,9rem)]"
              >
                GROWYARD
                <span className="h-[0.44em] w-[0.44em] rounded-full bg-accent" aria-hidden="true" />
              </motion.h1>

              <motion.div
                style={{ opacity: taglineOpacity, y: taglineY }}
                className="mt-7 flex justify-center will-change-transform sm:mt-9"
              >
                <p className="label-uppercase flex items-center gap-3 text-paper/55 sm:gap-4">
                  <span className="hidden h-px w-10 bg-accent/80 sm:block lg:w-12" aria-hidden="true" />
                  <span className="text-center text-[0.58rem] tracking-[0.2em] sm:text-[0.65rem] sm:tracking-[0.24em]">
                    Independent Creative &amp; Growth Agency
                  </span>
                  <span className="hidden h-px w-10 bg-accent/80 sm:block lg:w-12" aria-hidden="true" />
                </p>
              </motion.div>

              {/* Manifesto — appears underneath wordmark while wordmark stays at upper-center */}
              <motion.div
                style={{
                  opacity: manifestoOpacity,
                  y: manifestoY,
                  filter: manifestoFilter,
                }}
                className="mt-14 flex w-full max-w-3xl flex-col items-center text-center will-change-transform sm:mt-16 lg:mt-20"
              >
                <p className="max-w-[22ch] text-balance text-[clamp(1.45rem,3.7vw,2.6rem)] font-normal leading-[1.18] tracking-tight text-paper/90 sm:max-w-none">
                  We don&apos;t just make brands look better.
                </p>

                <motion.p
                  style={{ opacity: emphasisOpacity, y: emphasisY, filter: emphasisFilter }}
                  className="serif-em mt-3 max-w-[14ch] text-balance text-[clamp(2.55rem,6.8vw,5.35rem)] leading-[0.92] tracking-tight text-paper will-change-transform sm:max-w-none"
                >
                  We make them matter.
                </motion.p>

                {/* Supporting system — STRATEGY. CREATIVITY. GROWTH. */}
                <motion.div
                  style={{ opacity: principlesOpacity, y: principlesY }}
                  className="mt-10 flex w-full flex-col items-center will-change-transform sm:mt-12"
                >
                  {/* Thin line above principles */}
                  <motion.span
                    style={{ scaleX: lineScale }}
                    className="block h-px w-12 origin-center bg-paper/12 sm:w-16"
                    aria-hidden="true"
                  />

                  <div className="mt-7 flex flex-col items-center gap-[0.55rem] sm:mt-8">
                    <motion.p
                      style={{ opacity: p0Opacity, y: p0Y }}
                      className="text-center text-[0.7rem] font-medium uppercase tracking-[0.24em] text-paper/60 sm:text-[0.72rem] sm:tracking-[0.26em]"
                    >
                      STRATEGY.
                    </motion.p>
                    <motion.p
                      style={{ opacity: p1Opacity, y: p1Y }}
                      className="text-center text-[0.7rem] font-medium uppercase tracking-[0.24em] text-paper/60 sm:text-[0.72rem] sm:tracking-[0.26em]"
                    >
                      CREATIVITY.
                    </motion.p>
                    <motion.p
                      style={{ opacity: p2Opacity, y: p2Y }}
                      className="text-center text-[0.7rem] font-medium uppercase tracking-[0.24em] text-paper/60 sm:text-[0.72rem] sm:tracking-[0.26em]"
                    >
                      GROWTH.
                    </motion.p>
                  </div>

                  <motion.div
                    style={{ opacity: closingOpacity }}
                    className="mt-6 flex flex-col items-center gap-4"
                  >
                    <span className="block h-px w-8 bg-paper/10" aria-hidden="true" />
                    <p className="text-sm font-light tracking-wide text-paper/45 sm:text-[0.92rem]">
                      One connected system.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom breathing room for transition hint — no Scroll to Explore text per spec */}
            <div className="h-6 shrink-0 lg:h-10" aria-hidden="true" />
          </div>
        </div>

        {/* Tiny spacer to ease into ABOUT without huge gap */}
        <div className="h-[2svh] lg:h-[4svh]" aria-hidden="true" />
      </div>
    </section>
  );
}
