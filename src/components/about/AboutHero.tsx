"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-36 lg:pb-28 lg:pt-44">
      <div className="glow-behind absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-50" aria-hidden="true" />

      <motion.div
        className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12"
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <motion.p
          variants={reduce ? undefined : item}
          className="label-uppercase mb-8 flex items-center gap-3 text-paper/50"
        >
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          About GrowthYard
        </motion.p>
        <motion.h1
          variants={reduce ? undefined : item}
          className="max-w-4xl text-balance font-medium tracking-tight text-paper"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.03 }}
        >
          Not another agency.{" "}
          <span className="serif-em">Your growth partner.</span>
        </motion.h1>
        <motion.p
          variants={reduce ? undefined : item}
          className="mt-8 max-w-xl text-base leading-relaxed text-paper/55 sm:text-lg"
        >
          Independent, senior and hands-on — strategy, creative and marketing
          under one roof, aimed at growth you can actually measure.
        </motion.p>
      </motion.div>
    </section>
  );
}