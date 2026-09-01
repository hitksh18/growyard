"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ProcessStep as ProcessStepType } from "@/types/content";
import ProcessStep from "./ProcessStep";

interface ProcessTimelineProps {
  steps: ProcessStepType[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative pl-6 lg:pl-8">
      <div
        className="absolute left-0 top-0 h-full w-px bg-paper/10"
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-0 top-0 w-px bg-accent"
        style={{ height, originY: 0 }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative flex flex-col gap-16 lg:gap-20">
        {steps.map((step) => (
          <div key={step.index} className="relative">
            <span
              className="absolute -left-6 top-10 h-[9px] w-[9px] -translate-x-1/2 rounded-full border border-accent bg-ink lg:-left-8 lg:top-12"
              aria-hidden="true"
            />
            <ProcessStep step={step} />
          </div>
        ))}
      </div>
    </div>
  );
}