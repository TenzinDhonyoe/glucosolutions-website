"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  as?: "section" | "div";
  ariaLabelledBy?: string;
};

export function MotionSection({
  children,
  className,
  id,
  delay = 0,
  as = "section",
  ariaLabelledBy,
}: Props) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    return (
      <Component id={id} aria-labelledby={ariaLabelledBy} className={cn(className)}>
        {children}
      </Component>
    );
  }

  // Content is visible from first paint; the animation is a subtle entrance
  // polish that runs only when the section is scrolled into view, with no
  // initial-hidden state that would penalize SSR or non-JS readers.
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(className)}
      initial={{ opacity: 0.6, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
