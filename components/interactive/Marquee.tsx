"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Items to render in the loop. They get duplicated so the strip is seamless. */
  items: string[];
  /** Seconds per full loop. Slower = calmer. */
  duration?: number;
  /** Optional className applied to each item. */
  itemClassName?: string;
  className?: string;
};

/**
 * Edge-to-edge horizontal marquee strip. Items render twice so the loop is
 * seamless. Brand-LED dots act as separators.
 *
 * Used between Hero and Problem to fill the transition with a hint of motion
 * and to reinforce the brand attributes (non-invasive, AI coach, etc.) without
 * adding another wordy section.
 */
export function Marquee({
  items,
  duration = 38,
  className,
  itemClassName,
}: Props) {
  const reduce = useReducedMotion();
  const all = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-white/[0.06] bg-ink-0 py-5 ${
        className ?? ""
      }`}
    >
      <motion.div
        className="flex shrink-0 items-center gap-12 whitespace-nowrap will-change-transform"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {all.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex items-center gap-12 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-white/55 ${
              itemClassName ?? ""
            }`}
          >
            <span>{item}</span>
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-brand-led/60 shrink-0"
              style={{ boxShadow: "0 0 8px rgba(61,219,126,0.4)" }}
            />
          </span>
        ))}
      </motion.div>

      {/* Edge fade so items disappear into the canvas rather than chopping */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-0 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-0 to-transparent"
      />
    </div>
  );
}
