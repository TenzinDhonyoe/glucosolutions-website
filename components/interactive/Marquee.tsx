"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  items: string[];
  duration?: number;
  itemClassName?: string;
  className?: string;
};

/**
 * Edge-to-edge horizontal marquee. ALL CAPS Suisse Medium with 0.12em
 * tracking, charcoal/fg-mute on Oat, Sunlit dot as separator.
 */
export function Marquee({
  items,
  duration = 60,
  className,
  itemClassName,
}: Props) {
  const reduce = useReducedMotion();
  const all = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-stone bg-oat py-4 ${
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
            className={`flex items-center gap-12 text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal/70 ${
              itemClassName ?? ""
            }`}
          >
            <span>{item}</span>
            <span
              aria-hidden
              className="inline-block h-[6px] w-[6px] rounded-full bg-sunlit shrink-0"
            />
          </span>
        ))}
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-oat to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-oat to-transparent"
      />
    </div>
  );
}
