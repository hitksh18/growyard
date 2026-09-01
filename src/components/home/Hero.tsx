"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import Parallax from "@/components/animations/Parallax";
import { projects } from "@/data/projects";
import { BRAND } from "@/lib/constants";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-svh flex-col justify-end overflow-hidden pb-14 pt-32 lg:pb-20"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="glow-behind absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="grid-bg absolute inset-0 -z-10 opacity-50"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-[1440px] items-end gap-16 px-6 sm:px-8 lg:grid-cols-12 lg:px-12">
        <motion.div
          className="lg:col-span-7"
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p
            variants={reduce ? undefined : item}
            className="label-uppercase mb-8 flex items-center gap-3 text-paper/50"
          >
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Independent Creative &amp; Growth Agency
          </motion.p>

          <motion.h1
            variants={reduce ? undefined : item}
            className="text-balance font-medium tracking-tight text-paper"
            style={{ fontSize: "clamp(3rem, 7.2vw, 6.4rem)", lineHeight: 1.0 }}
          >
            We build brands
            <br />
            <span className="serif-em text-paper/95">
              that refuse to be ignored.
            </span>
          </motion.h1>

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-md text-base leading-relaxed text-paper/60 sm:text-lg">
              GrowthYard turns strategy, creativity and digital marketing into
              brands people notice — and growth people can measure.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" size="lg">
                Start a project
              </Button>
              <Button href="/work" variant="link" size="lg" iconDirection="up">
                See our work
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Editorial collage of known work */}
        <motion.div
          className="hidden lg:col-span-5 lg:block"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Parallax offset={36}>
            <div className="flex flex-col gap-6">
              {projects.map((p, i) => (
                <Link
                  key={p.slug}
                  href="/work"
                  className={`group relative block ${i === 1 ? "ml-16 max-w-[85%] lg:ml-24" : "max-w-[85%]"}`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden border border-paper/10 bg-charcoal">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 1024px) 0vw, 40vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.2em] text-paper/50">
                    <span>{p.title}</span>
                    <span className="text-accent">{p.index}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Parallax>
        </motion.div>
      </div>

      {/* Bottom metadata row */}
      <motion.div
        className="mx-auto mt-16 flex w-full max-w-[1440px] flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:mt-20 lg:px-12"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.2em] text-paper/35">
          <span className="flex h-8 w-px animate-pulse bg-paper/30" aria-hidden="true" />
          Scroll to explore
        </div>
        <Link
          href={`mailto:${BRAND.email}`}
          className="text-[0.62rem] uppercase tracking-[0.2em] text-paper/35 transition-colors hover:text-accent"
        >
          {BRAND.email}
        </Link>
      </motion.div>
    </section>
  );
}