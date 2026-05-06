"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Trend = "rising" | "stable" | "falling";

const TRENDS: { kind: Trend; label: string; arrow: string; color: string; cycleMs: number }[] = [
  { kind: "stable", label: "stable", arrow: "→", color: "#5FA7A0", cycleMs: 5000 },
  { kind: "rising", label: "rising", arrow: "↗", color: "#E1B66E", cycleMs: 4500 },
  { kind: "falling", label: "falling", arrow: "↘", color: "#9B3B2E", cycleMs: 4500 },
];

/**
 * A small inline trend-classification pill that cycles through the three
 * states the wearable detects (rising / stable / falling). Communicates the
 * core product behaviour, not a chart, not a logo. Restrained, no-bg, fits
 * inline next to text.
 */
export function TrendPill() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const current = TRENDS[idx];

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % TRENDS.length);
    }, current.cycleMs);
    return () => clearTimeout(t);
  }, [idx, reduce, current.cycleMs]);

  return (
    <span
      aria-label={`Glycemic trend: ${current.label}`}
      className="inline-flex items-center gap-1.5 align-middle text-[12px] font-semibold uppercase tracking-[0.16em]"
    >
      <motion.span
        key={current.kind + "-dot"}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: current.color, boxShadow: `0 0 8px ${current.color}aa` }}
      />
      <motion.span
        key={current.kind + "-label"}
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ color: current.color }}
      >
        {current.label}
      </motion.span>
      <span className="text-charcoal/60">{current.arrow}</span>
    </span>
  );
}
