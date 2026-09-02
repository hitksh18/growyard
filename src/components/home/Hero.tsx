"use client";

import { motion, useTransform } from "framer-motion";
import { useIntro } from "@/providers/IntroProgressProvider";

export default function Hero() {
  const { progress, reduced } = useIntro();

  // Deterministic staged progress: 260svh container (≈2.6vh)
  // 0-35%  : GROWYARD CENTER → UPPER (18-25% top)
  // 35-55% : HOLD / breathing
  // 55-75% : We don't just make brands look better.
  // 75-90% : We make them matter. (serif italic)
  // 90-100%: complete → hero will release, About enters after container
  const brandY = useTransform(progress, [0, 0.35, 0.55, 1], [0, -176, -176, -176]);
  const brandScale = useTransform(progress, [0, 0.35, 1], [1, 0.92, 0.92]);
  const brandOpacity = useTransform(progress, [0.92, 0.99], [1, 0]);

  const gridOpacity = useTransform(progress, [0, 0.6], [0.46, 0.26]);
  const glowOpacity = useTransform(progress, [0, 0.6], [0.80, 0.32]);

  // Tagline — appears only after lock, progressive
  const line1Opacity = useTransform(progress, [0.55, 0.75], [0, 1]);
  const line1Y = useTransform(progress, [0.55, 0.75], [28, 0]);
  const line1Blur = useTransform(progress, [0.55, 0.75], [8, 0]);
  const line1Filter = useTransform(line1Blur, (v) => `blur(${v}px)`);

  const line2Opacity = useTransform(progress, [0.75, 0.90], [0, 1]);
  const line2Y = useTransform(progress, [0.75, 0.90], [28, 0]);
  const line2Blur = useTransform(progress, [0.75, 0.90], [8, 0]);
  const line2Filter = useTransform(line2Blur, (v) => `blur(${v}px)`);

  // Supporting — after full message, still while pinned
  const supportOpacity = useTransform(progress, [0.82, 0.92], [0, 1]);
  const supportY = useTransform(progress, [0.82, 0.92], [16, 0]);

  if (reduced) {
    return (
      <section id="hero" aria-label="GROWYARD — brand intro" className="relative overflow-hidden">
        <div className="bg-tonal absolute inset-0" aria-hidden="true" />
        <div className="grid-bg absolute inset-0 opacity-[0.34]" aria-hidden="true" />
        <div className="glow-behind absolute left-1/2 top-[18%] h-[62%] w-[78%] -translate-x-1/2 opacity-50" aria-hidden="true" />
        <div className="vignette absolute inset-0 opacity-60" aria-hidden="true" />
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
          <div className="mt-16 max-w-3xl">
            <p className="text-[clamp(1.4rem,3.4vw,2.4rem)] leading-[1.15] text-paper/90">We don&apos;t just make brands look better.</p>
            <p className="serif-em mt-3 text-[clamp(2.4rem,5.8vw,4.8rem)] leading-[0.95] text-paper">We make them matter.</p>
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
    <section id="hero" aria-label="GROWYARD — brand intro" className="relative">
      {/* Background — subtle grid remains visible, restrained */}
      <div className="bg-tonal absolute inset-0" aria-hidden="true" />
      <motion.div style={{ opacity: gridOpacity }} className="grid-bg absolute inset-0" aria-hidden="true" />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="glow-behind absolute left-1/2 top-[14%] h-[60%] w-[78%] -translate-x-1/2"
        aria-hidden="true"
      />
      <div className="vignette pointer-events-none absolute inset-0 opacity-[0.70]" aria-hidden="true" />

      {/* Hero scroll container — enough space for staged sequence */}
      <div className="relative h-[260svh]">
        {/* Sticky viewport — remains fixed while scroll progress drives transforms */}
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
          {/* STATE 1-2: Brand — exactly centered at 50% vh via flex centering, single source */}
          <motion.div
            style={{ y: brandY, scale: brandScale, opacity: brandOpacity }}
            className="flex flex-col items-center justify-center will-change-transform"
          >
            <h1 className="inline-flex max-w-full items-center justify-center gap-[0.42em] font-semibold uppercase leading-none tracking-[0.09em] text-paper text-[clamp(2.55rem,10.5vw,4.8rem)] sm:text-[clamp(3rem,9vw,6rem)] lg:text-[clamp(5.4rem,8.6vw,9rem)]">
              GROWYARD
              <span className="h-[0.44em] w-[0.44em] rounded-full bg-accent" aria-hidden="true" />
            </h1>
            <p className="label-uppercase mt-7 flex items-center gap-3 text-paper/55 sm:mt-9 sm:gap-4">
              <span className="hidden h-px w-10 bg-accent/80 sm:block lg:w-12" aria-hidden="true" />
              <span className="text-center text-[0.58rem] tracking-[0.2em] sm:text-[0.65rem] sm:tracking-[0.24em]">
                Independent Creative &amp; Growth Agency
              </span>
              <span className="hidden h-px w-10 bg-accent/80 sm:block lg:w-12" aria-hidden="true" />
            </p>
          </motion.div>

          {/* STATE 3-4: Tagline — appears only after lock, progresses below locked logo */}
          <motion.div
            style={{ opacity: line1Opacity, y: line1Y, filter: line1Filter }}
            className="absolute left-1/2 top-[58%] flex w-full max-w-3xl -translate-x-1/2 flex-col items-center px-6 text-center will-change-transform sm:top-[60%] sm:px-8"
          >
            <p className="max-w-[22ch] text-balance text-[clamp(1.45rem,3.7vw,2.6rem)] font-normal leading-[1.18] tracking-tight text-paper/90 sm:max-w-none">
              We don&apos;t just make brands look better.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: line2Opacity, y: line2Y, filter: line2Filter }}
            className="absolute left-1/2 top-[66%] flex w-full max-w-3xl -translate-x-1/2 flex-col items-center px-6 text-center will-change-transform sm:top-[68%] sm:px-8"
          >
            <p className="serif-em max-w-[14ch] text-balance text-[clamp(2.55rem,6.8vw,5.35rem)] leading-[0.92] tracking-tight text-paper sm:max-w-none">
              We make them matter.
            </p>
            <motion.div
              style={{ opacity: supportOpacity, y: supportY }}
              className="mt-7 flex flex-col items-center gap-2 will-change-transform sm:mt-8"
            >
              <span className="block h-px w-10 bg-paper/12 sm:w-12" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[0.68rem] tracking-[0.22em] text-paper/55">STRATEGY.</span>
                <span className="text-[0.68rem] tracking-[0.22em] text-paper/55">CREATIVITY.</span>
                <span className="text-[0.68rem] tracking-[0.22em] text-paper/55">GROWTH.</span>
              </div>
              <span className="mt-2 block h-px w-8 bg-paper/10" aria-hidden="true" />
              <span className="text-sm text-paper/45">One connected system.</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
