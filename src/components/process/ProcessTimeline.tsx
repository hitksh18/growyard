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
    offset: ["start 0.8", "end 0.4"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative pl-6 lg:pl-8">
      <div
        className="absolute left-0 top-0 h-full w-px bg-paper/10"
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-0 top-0 w-[2px] bg-accent"
        style={{ height, originY: 0 }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative flex flex-col gap-10 lg:gap-14">
        {steps.map((step) => (
          <div key={step.index} className="relative">
            <span
              className="absolute -left-6 top-7 flex h-4 w-4 -translate-x-1/2 items-center justify-center lg:-left-8 lg:top-9"
              aria-hidden="true"
            >
              <span className="absolute h-4 w-4 rounded-full border border-accent/40 bg-ink transition-colors duration-500" />
            </span>
            <ProcessStep step={step} />
          </div>
        ))}
      </div>
    </div>
  );
}