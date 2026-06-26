"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * CountUp — rolls an integer from `from` to `to` the first time it scrolls into
 * view. Used for the load-bearing figures (e.g. the "29 days" gap). Reduced
 * motion just renders the final number.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reduce) {
      node.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: [0.22, 0.61, 0.21, 1],
      onUpdate(value) {
        node.textContent = `${prefix}${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration, prefix, suffix]);

  // SSR / pre-view render shows the start value to avoid a hydration mismatch.
  return (
    <span ref={ref} className={className}>
      {`${prefix}${reduce ? to : from}${suffix}`}
    </span>
  );
}
