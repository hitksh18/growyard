"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ANIMATION } from "@/lib/constants";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const viewportOnce = { once: true, margin: "0px 0px -10% 0px" };

export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
}: FadeInProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: ANIMATION.duration.base,
        delay,
        ease: ANIMATION.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
