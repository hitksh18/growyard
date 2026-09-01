"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ProcessStep as ProcessStepType } from "@/types/content";

interface ProcessStepProps {
  step: ProcessStepType;
}

export default function ProcessStep({ step }: ProcessStepProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: false, amount: 0.55 });

  return (
    <div
      ref={ref}
      className="group grid grid-cols-12 items-start gap-x-6"
    >
      <motion.span
        className="serif-em col-span-12 -ml-1 leading-none text-paper/[0.16] transition-colors duration-700 sm:col-span-3 lg:col-span-2"
        style={{ fontSize: "clamp(3.4rem, 5vw, 5.5rem)" }}
        animate={
          reduce
            ? undefined
            : active
              ? { color: "rgba(95,139,255,0.85)", scale: 1.03 }
              : { color: "rgba(250,250,249,0.16)", scale: 1 }
        }
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        {step.index}
      </motion.span>

      <div className="col-span-12 sm:col-span-9 lg:col-span-10 sm:pt-1">
        <div className="overflow-hidden">
          <motion.h3
            className="flex items-center gap-3 text-2xl font-medium tracking-tight text-paper sm:text-3xl"
            animate={
              reduce ? undefined : { y: active ? 0 : "110%" }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {step.title}
          </motion.h3>
        </div>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-paper/55">
          {step.description}
        </p>
        {step.deliverables && (
          <p
            className={`mt-4 text-[0.65rem] uppercase tracking-[0.18em] transition-colors duration-700 ${
              active ? "text-accent/70" : "text-paper/30"
            }`}
          >
            {step.deliverables.join("  ·  ")}
          </p>
        )}
      </div>
    </div>
  );
}