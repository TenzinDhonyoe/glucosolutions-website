"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/* The house easing — a long, soft ease-out. Everything reveals with the same
   curve so the page reads as one choreography, not a pile of effects. */
const EASE = [0.22, 0.61, 0.21, 1] as const;
const DURATION = 0.7;

export type RevealVariant =
  | "up"
  | "fade"
  | "left"
  | "right"
  | "scale"
  | "blur";

const HIDDEN: Record<RevealVariant, Record<string, number | string>> = {
  up: { opacity: 0, y: 30 },
  fade: { opacity: 0 },
  left: { opacity: 0, x: -44 },
  right: { opacity: 0, x: 44 },
  scale: { opacity: 0, scale: 0.94 },
  blur: { opacity: 0, y: 22, filter: "blur(10px)" },
};

const SHOWN = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
};

type Tag = "div" | "section" | "span" | "p" | "li" | "ul" | "h2" | "h3";

const TAGS: Record<Tag, React.ElementType> = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  p: motion.p,
  li: motion.li,
  ul: motion.ul,
  h2: motion.h2,
  h3: motion.h3,
};

/**
 * Reveal — fades a block into place the first time it scrolls into view. Pick a
 * `variant` for direction. Honors reduced-motion (a plain quick fade, no travel).
 */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = DURATION,
  amount = 0.3,
  once = true,
  as = "div",
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  as?: Tag;
  /** Play the entrance on mount (page load) instead of waiting to scroll into
   *  view. Use for content near the top that should animate in right away. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const Comp = TAGS[as];

  const trigger = immediate
    ? { animate: SHOWN }
    : {
        whileInView: SHOWN,
        viewport: { once, amount, margin: "0px 0px -8% 0px" },
      };

  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : HIDDEN[variant]}
      {...trigger}
      transition={{ duration: reduce ? 0.3 : duration, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/* ---- Stagger: a container whose children reveal one after another ---- */

const containerVariants = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

const itemVariants = (
  variant: RevealVariant,
  reduce: boolean,
): Variants => ({
  hidden: reduce ? { opacity: 0 } : HIDDEN[variant],
  show: {
    ...SHOWN,
    transition: { duration: reduce ? 0.3 : DURATION, ease: EASE },
  },
});

/**
 * Stagger — wrap a list; each `StaggerItem` child eases in slightly after the
 * previous one. Drives the "rows fill in one by one" feel.
 */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  amount = 0.25,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
  as?: Tag;
}) {
  const Comp = TAGS[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={containerVariants(stagger, delayChildren)}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Comp = TAGS[as];
  return (
    <Comp className={className} variants={itemVariants(variant, !!reduce)}>
      {children}
    </Comp>
  );
}

/**
 * DrawLine — a hairline rule that wipes in from its start edge the first time it
 * scrolls into view. Give it the line's own color/size via `className`
 * (e.g. "h-px w-full bg-line"). Editorial accent under section headers.
 */
export function DrawLine({
  className,
  vertical = false,
  duration = 0.9,
  delay = 0,
}: {
  className?: string;
  vertical?: boolean;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ originX: 0, originY: 0 }}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 1, scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }
      }
      whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduce ? 0.3 : duration, ease: EASE, delay }}
    />
  );
}
