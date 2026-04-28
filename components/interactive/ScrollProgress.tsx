"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Top-edge scroll progress indicator. A thin brand-gradient bar that fills
 * left-to-right as the user scrolls down the page. Spring-smoothed so it feels
 * physical rather than tracked-1:1 to the scrollbar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="brand-gradient pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX }}
    />
  );
}
