"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ANIMATION } from "@/lib/constants";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const offset = {
  up: 40,
  down: -40,
  left: 40,
  right: -40,
};

const viewportOnce = { once: true, margin: "0px 0px -10% 0px" };

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = ANIMATION.duration.slow,
  distance,
  className,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const travel = distance ?? offset[direction];
  const from = reduce
    ? {}
    : direction === "left" || direction === "right"
      ? { x: travel }
      : { y: travel };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={once ? viewportOnce : { once: false }}
      transition={{ duration, delay, ease: ANIMATION.ease }}
    >
      {children}
    </motion.div>
  );
}
