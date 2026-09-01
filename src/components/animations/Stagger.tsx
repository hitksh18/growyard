"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ANIMATION } from "@/lib/constants";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.12,
}: StaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: ANIMATION.duration.base,
        delay,
        ease: ANIMATION.ease,
        staggerChildren: stagger,
        delayChildren: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: ANIMATION.duration.base,
        ease: ANIMATION.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
