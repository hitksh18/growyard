"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { useIntro } from "@/providers/IntroProgressProvider";

export default function Hero() {
  const { progress } = useIntro();

  const statementRef = useRef<HTMLDivElement>(null);

  // Brand intro handles itself in-flow; these fades just ease it out
  // gracefully as the visitor scrolls through "What GrowthYard Is".
  const wordmarkOpacity = useTransform(progress, [0.5, 0.8], [1, 0]);
  const taglineOpacity = useTransform(progress, [0.46, 0.72], [1, 0]);
  const wordmarkScale = useTransform(progress, [0, 1], [1, 0.97]);

  // Statement reveal — appears once the brand has settled in.
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.95", "start 0.45"],
  });
  const statementOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      id="hero"
      aria-label="GrowthYard — brand intro"
      className="relative"
    >
      {/* Background: subtle charcoal tonal variation + faint blue atmosphere */}
      <div className="bg-tonal absolute inset-0" aria-hidden="true" />
      <div
        className="grid-bg absolute inset-0 opacity-30"
        aria-hidden="true"
      />
      <div
        className="glow-behind absolute left-1/2 top-0 h-[70%] w-[70%] -translate-x-1/2 opacity-40"
        aria-hidden="true"
      />

      {/* 01 — BRAND INTRO */}
      <div className="relative flex min-h-svh flex-col items-center justify-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 text-center sm:px-8 lg:px-12">
          <motion.h1
            style={{ scale: wordmarkScale, opacity: wordmarkOpacity }}
            className="mx-auto inline-flex w-max max-w-full items-center justify-center gap-[0.45em] font-semibold uppercase leading-none tracking-[0.08em] text-paper will-change-transform text-[clamp(2.4rem,10vw,4.4rem)] lg:text-[clamp(5rem,8.6vw,9rem)]"
          >
            GrowthYard
            <span
              className="h-[0.5em] w-[0.5em] rounded-full bg-accent"
              aria-hidden="true"
            />
          </motion.h1>

          <motion.div
            style={{ opacity: taglineOpacity }}
            className="mt-10 flex justify-center"
          >
            <p className="label-uppercase flex items-center gap-4 text-paper/55">
              <span className="h-px w-12 bg-accent" aria-hidden="true" />
              Independent Creative &amp; Growth Agency
              <span className="h-px w-12 bg-accent" aria-hidden="true" />
            </p>
          </motion.div>
        </div>
      </div>

      {/* 02 — WHAT GROWTHYARD IS */}
      <div ref={statementRef} className="flex min-h-svh items-center">
        <motion.div
          style={{ opacity: statementOpacity }}
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
            <Button href="/work" variant="ghost" size="lg">
              See our work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}