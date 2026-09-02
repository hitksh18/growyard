"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useIntro } from "@/providers/IntroProgressProvider";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Hero() {
  const { progress, reduced } = useIntro();
  const vh = useMotionValue<number>(0);

  useEffect(() => {
    const update = () => vh.set(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [vh]);

  // Single scroll timeline. progress 0..1 maps to the hero pin distance:
  //   0.00        – GrowthYard centered (subtitle visible)
  //   0.00 → 0.30 – GrowthYard moves upward (center → top lock)
  //   0.30        – GrowthYard locked at top
  //   0.30 → 0.62 – headlines + keywords reveal (while GrowthYard locked)
  //   0.62 → 0.74 – full composition holds
  //   0.74 → 1.00 – entire hero exits upward
  //   1.00        – navbar appears, normal homepage scroll proceeds
  //
  // Brand: translate up from center (0) to locked offset (-Y_LOCK), then exit
  // upward to (-Y_LOCK - EXIT). Scale is restrained so the wordmark stays crisp.
  //
  // Final exit travels in viewport-relative units so it behaves on every screen.
  // Framer Motion render functions multiply by `vh` live, keeping it responsive.
  const Y_LOCK = -0.26; // locked offset from center (as fraction of viewport)
  const EXIT = -1.4; // extra travel so the whole composition clears the top

  // brandY: fraction-of-viewport travel multiplied by live vh → pixels
  const brandY = useTransform(
    [progress, vh],
    (latest: number[]) => {
      const p = latest[0];
      const viewportH = latest[1];
      const yLock = Y_LOCK * viewportH;
      if (p <= 0.3) {
        const t = p / 0.3;
        return easeOut(t) * yLock;
      }
      if (p <= 0.74) return yLock;
      const t = (p - 0.74) / 0.26;
      return yLock - easeInOut(t) * EXIT * viewportH;
    }
  );
  const brandScale = useTransform(progress, [0, 0.3, 0.74, 1], [1, 0.94, 0.94, 0.94]);

  // Grid + glow fade out across the intro for a cleaner, quieter canvas.
  const gridOpacity = useTransform(progress, [0, 0.74], [0.4, 0.2]);
  const glowOpacity = useTransform(progress, [0, 0.3], [0.8, 0.5]);

  // ---- Reveal transforms ------------------------------------------------
  // Every revealed subheading: opacity 0→1, slight rise 22→0, blur 8→0. Blur
  // always resolves fully once its window ends, so nothing stays blurred.
  // The subtitle is part of the initial centered composition and stays fully
  // visible from progress 0. Reveals happen only while GrowthYard is locked.

  // s2 — "We don't just make brands look better."
  const s2Op = useTransform(progress, [0.32, 0.42], [0, 1]);
  const s2Y = useTransform(progress, [0.32, 0.42], [22, 0]);
  const s2Blur = useTransform(progress, [0.32, 0.42], [8, 0]);
  const s2Filter = useTransform(s2Blur, (v) => `blur(${v}px)`);

  // s3 — "We make them matter." (serif italic)
  const s3Op = useTransform(progress, [0.42, 0.52], [0, 1]);
  const s3Y = useTransform(progress, [0.42, 0.52], [22, 0]);
  const s3Blur = useTransform(progress, [0.42, 0.52], [8, 0]);
  const s3Filter = useTransform(s3Blur, (v) => `blur(${v}px)`);

  // s4 — STRATEGY. / CREATIVITY. / GROWTH. / One connected system.
  const s4Op = useTransform(progress, [0.52, 0.62], [0, 1]);
  const s4Y = useTransform(progress, [0.52, 0.62], [18, 0]);
  const s4Blur = useTransform(progress, [0.52, 0.62], [8, 0]);
  const s4Filter = useTransform(s4Blur, (v) => `blur(${v}px)`);

  if (reduced) {
    return (
      <section
        id="hero"
        aria-label="GrowthYard — brand intro"
        className="relative overflow-hidden"
      >
        <div className="bg-tonal absolute inset-0" aria-hidden="true" />
        <div className="grid-bg absolute inset-0 opacity-[0.34]" aria-hidden="true" />
        <div
          className="glow-behind absolute left-1/2 top-[12%] h-[62%] w-[78%] -translate-x-1/2 opacity-50"
          aria-hidden="true"
        />
        <div className="vignette absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative flex min-h-svh flex-col items-center justify-center px-6 py-28 text-center sm:px-8 lg:px-12">
          <h1 className="inline-flex max-w-full items-center justify-center gap-[0.42em] font-semibold uppercase leading-none tracking-[0.09em] text-paper text-[clamp(2.6rem,10vw,5.2rem)] lg:text-[clamp(5.2rem,8.4vw,8.8rem)]">
            GrowthYard
            <span className="h-[0.46em] w-[0.46em] rounded-full bg-accent" aria-hidden="true" />
          </h1>
          <p className="label-uppercase mt-8 flex items-center gap-4 text-paper/60">
            <span className="hidden h-px w-12 bg-accent sm:block" aria-hidden="true" />
            Independent Creative &amp; Growth Agency
            <span className="hidden h-px w-12 bg-accent sm:block" aria-hidden="true" />
          </p>
          <div className="mt-16 max-w-3xl">
            <p className="text-[clamp(1.4rem,3.4vw,2.4rem)] leading-[1.15] text-paper/90">
              We don&apos;t just make brands look better.
            </p>
            <p className="serif-em mt-3 text-[clamp(2.4rem,5.8vw,4.8rem)] leading-[0.95] text-paper">
              We make them matter.
            </p>
            <div className="mt-10 flex flex-col items-center gap-2">
              <p className="text-[0.70rem] tracking-[0.22em] text-paper/55">STRATEGY.</p>
              <p className="text-[0.70rem] tracking-[0.22em] text-paper/55">CREATIVITY.</p>
              <p className="text-[0.70rem] tracking-[0.22em] text-paper/55">GROWTH.</p>
              <span className="mt-4 block h-px w-16 bg-paper/15" aria-hidden="true" />
              <p className="mt-3 text-sm text-paper/45">One connected system.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" aria-label="GrowthYard — brand intro" className="relative">
      {/* Background */}
      <div className="bg-tonal absolute inset-0" aria-hidden="true" />
      <motion.div style={{ opacity: gridOpacity }} className="grid-bg absolute inset-0" aria-hidden="true" />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="glow-behind absolute left-1/2 top-[12%] h-[60%] w-[78%] -translate-x-1/2"
        aria-hidden="true"
      />
      <div className="vignette pointer-events-none absolute inset-0 opacity-[0.70]" aria-hidden="true" />

      {/* Full hero timeline container — gives the scroll distance for every stage */}
      <div className="relative h-[400vh]">
        {/* Sticky viewport */}
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
          {/* GrowthYard + subtitle are the perfectly-centered anchor. The reveal
              subheadings hang below the subtitle via absolute positioning, so
              GrowthYard stays exactly centered at load. The whole thing is ONE
              unit driven by brandY, so it locks and exits together. */}
          <motion.div
            style={{ y: brandY, scale: brandScale }}
            className="relative flex flex-col items-center justify-center will-change-transform"
          >
            <h1 className="inline-flex max-w-full items-center justify-center gap-[0.42em] font-semibold uppercase leading-none tracking-[0.09em] text-paper text-[clamp(2.55rem,10.5vw,4.8rem)] sm:text-[clamp(3rem,9vw,6rem)] lg:text-[clamp(5.4rem,8.6vw,9rem)]">
              GrowthYard
              <span className="h-[0.44em] w-[0.44em] rounded-full bg-accent" aria-hidden="true" />
            </h1>
            <p className="mt-6 flex items-center gap-3 text-paper/60 sm:mt-8 sm:gap-4">
              <span className="hidden h-px w-10 bg-accent/80 sm:block lg:w-12" aria-hidden="true" />
              <span className="label-uppercase text-center text-[0.58rem] sm:text-[0.65rem]">
                Independent Creative &amp; Growth Agency
              </span>
              <span className="hidden h-px w-10 bg-accent/80 sm:block lg:w-12" aria-hidden="true" />
            </p>

            {/* Reveal group — anchored just below the subtitle, stacks naturally */}
            <motion.div
              className="absolute left-1/2 top-full flex w-full max-w-3xl -translate-x-1/2 flex-col items-center px-6 pt-10 text-center sm:pt-12 lg:pt-14"
            >
              <motion.div style={{ opacity: s2Op, y: s2Y, filter: s2Filter }}>
                <p className="mx-auto max-w-[22ch] text-balance text-[clamp(1.45rem,3.7vw,2.6rem)] leading-[1.18] tracking-tight text-paper/90">
                  We don&apos;t just make brands look better.
                </p>
              </motion.div>

              <motion.div style={{ opacity: s3Op, y: s3Y, filter: s3Filter }}>
                <p className="serif-em mx-auto mt-6 max-w-[14ch] text-balance text-[clamp(2.55rem,6.8vw,5.35rem)] leading-[0.92] tracking-tight text-paper sm:mt-8">
                  We make them matter.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: s4Op, y: s4Y, filter: s4Filter }}
                className="mt-9 flex flex-col items-center gap-2 sm:mt-11"
              >
                <span className="block h-px w-10 bg-paper/12 sm:w-12" aria-hidden="true" />
                <div className="mt-3 flex flex-col items-center gap-2">
                  <span className="text-[0.68rem] tracking-[0.22em] text-paper/60">STRATEGY.</span>
                  <span className="text-[0.68rem] tracking-[0.22em] text-paper/60">CREATIVITY.</span>
                  <span className="text-[0.68rem] tracking-[0.22em] text-paper/60">GROWTH.</span>
                </div>
                <span className="mt-2 block h-px w-8 bg-paper/10" aria-hidden="true" />
                <span className="mt-3 text-sm text-paper/50">One connected system.</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
