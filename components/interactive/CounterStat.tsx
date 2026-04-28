"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  /** Final numeric value to count up to. */
  to: number;
  /** Starting value, default 0. */
  from?: number;
  /** Duration of the count-up in milliseconds. */
  duration?: number;
  /** Prefix (e.g. "~") and suffix (e.g. "%") rendered around the number. */
  prefix?: string;
  suffix?: string;
  /** Decimal places. Default 0 (integer). */
  decimals?: number;
  className?: string;
};

/**
 * Counts a number up from `from` to `to` once the element scrolls into view.
 * The animation fires exactly once. Respects prefers-reduced-motion (just shows
 * the final value with no animation in that case).
 *
 * Uses an easeOutCubic curve so the number arrives gracefully rather than
 * abruptly — feels far more premium than a linear count.
 */
export function CounterStat({
  to,
  from = 0,
  duration = 1500,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const delta = to - from;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic: 1 - (1 - t)^3 — fast start, gentle landing.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + delta * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
