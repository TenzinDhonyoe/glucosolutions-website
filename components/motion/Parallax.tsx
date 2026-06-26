"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Parallax — drifts its child vertically as the section passes through the
 * viewport, so foreground visuals (the Redu phone, hero cards) move at a
 * slightly different rate than the page. The outer wrapper is the measured,
 * untransformed element; only the inner layer moves, so there's no feedback
 * loop with `useScroll`. Static under reduced motion.
 */
export function Parallax({
  children,
  className,
  offset = 56,
}: {
  children: React.ReactNode;
  className?: string;
  /** Total travel in px across the full pass (top moves down, bottom moves up). */
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
