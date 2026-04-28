"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max pixels of pull toward cursor. */
  strength?: number;
  /** Distance in pixels from button bounds within which the magnet activates. */
  range?: number;
  /** When true, render as <a> with the given href instead of a div. */
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * A pill that subtly pulls toward the cursor when it's near. The pull is
 * spring-smoothed so it feels alive without becoming distracting. Ignores
 * pointer activity when prefers-reduced-motion is set.
 *
 * Use sparingly — reserve for the single highest-priority CTA on a page.
 */
export function MagneticButton({
  children,
  className,
  strength = 12,
  range = 120,
  href,
  onClick,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > range) {
        x.set(0);
        y.set(0);
        return;
      }
      // Pull strength tapers smoothly toward zero at the edge of `range`.
      const pull = (1 - dist / range) * strength;
      x.set((dx / dist) * pull);
      y.set((dy / dist) * pull);
    }

    function onLeave() {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, strength, range, x, y]);

  const Component = motion.div;

  return (
    <Component
      ref={ref}
      style={{ x: sx, y: sy, willChange: "transform", display: "inline-flex" }}
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={className}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className={className}
        >
          {children}
        </button>
      )}
    </Component>
  );
}
