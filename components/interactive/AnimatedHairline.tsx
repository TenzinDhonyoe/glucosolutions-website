"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  delay?: number;
};

/**
 * A brand-gradient hairline that draws left-to-right (transform-origin left,
 * scaleX 0 → 1) when scrolled into view. Use as a section divider or as an
 * underline beneath a heading.
 */
export function AnimatedHairline({ className = "", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`brand-gradient origin-left h-px w-full ${className}`}
      initial={reduce ? false : { scaleX: 0, opacity: 0.7 }}
      whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
    />
  );
}
