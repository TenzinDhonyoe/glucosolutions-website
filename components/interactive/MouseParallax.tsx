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
  /** Max pixels of translation in each direction. */
  strength?: number;
  /** Optional rotation amount in degrees, applied as a tilt. */
  tilt?: number;
  className?: string;
};

/**
 * Wraps children with cursor-tracking parallax. The element follows the cursor
 * by `strength` pixels (and optionally tilts by `tilt` degrees). Spring-smoothed
 * so it feels alive rather than glued to the cursor. Falls back to static when
 * the user prefers reduced motion.
 */
export function MouseParallax({
  children,
  strength = 14,
  tilt = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 20, mass: 0.6 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);
  const srx = useSpring(rx, springConfig);
  const sry = useSpring(ry, springConfig);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      // Normalised cursor offset from the element centre, range roughly [-1, 1]
      // when the cursor sits at the edge of the viewport.
      const cx = (e.clientX - rect.left - rect.width / 2) / (window.innerWidth / 2);
      const cy = (e.clientY - rect.top - rect.height / 2) / (window.innerHeight / 2);
      x.set(cx * strength);
      y.set(cy * strength * 0.6);
      if (tilt) {
        ry.set(cx * tilt);
        rx.set(-cy * tilt * 0.5);
      }
    }

    function onLeave() {
      x.set(0);
      y.set(0);
      rx.set(0);
      ry.set(0);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, strength, tilt, x, y, rx, ry]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: sx,
        y: sy,
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
