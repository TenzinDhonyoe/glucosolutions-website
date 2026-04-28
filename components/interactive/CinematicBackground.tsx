"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "hero" | "problem" | "waitlist" | "section";

type Props = {
  variant?: Variant;
  className?: string;
};

/**
 * Cinematic atmospheric background. Mimics the warm-golden / motion-blur
 * editorial-photography aesthetic using static CSS gradient blobs +
 * lightweight CSS-only animations.
 *
 * Performance: only ONE motion element animates per background (the main
 * golden-hour glow). Everything else is static or driven by a single
 * shared CSS keyframe — keeps the GPU cost minimal so multiple sections
 * can use this simultaneously without lag.
 */
export function CinematicBackground({
  variant = "hero",
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const isHero = variant === "hero";
  const isWaitlist = variant === "waitlist";
  const isProblem = variant === "problem";

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Base canvas — warm-to-cool gradient mood */}
      <div
        className="absolute inset-0"
        style={{
          background: isHero
            ? "linear-gradient(160deg, #1a0e08 0%, #0f0d0a 25%, #07090A 55%, #0A1216 100%)"
            : isWaitlist
            ? "radial-gradient(ellipse at center, #0E1318 0%, #07090A 80%)"
            : isProblem
            ? "linear-gradient(170deg, #150e0a 0%, #0a0907 50%, #07090A 100%)"
            : "linear-gradient(180deg, #07090A 0%, #0A0E10 100%)",
        }}
      />

      {/* GOLDEN HOUR sun — the ONE animated element. Big saturated amber
          blob upper-left. Single breathing animation via framer-motion. */}
      <motion.div
        className="absolute -top-[15%] -left-[10%] h-[80vh] w-[80vh] rounded-full"
        style={{
          background: isHero
            ? "radial-gradient(closest-side, rgba(255, 165, 70, 0.55), rgba(245, 130, 60, 0.30) 40%, transparent 75%)"
            : isProblem
            ? "radial-gradient(closest-side, rgba(255, 150, 80, 0.40), rgba(220, 110, 60, 0.20) 45%, transparent 75%)"
            : "radial-gradient(closest-side, rgba(255, 200, 110, 0.25), transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform, opacity",
        }}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.85, 1, 0.85],
                scale: [1, 1.06, 1],
              }
        }
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Static peach atmospheric haze — no animation, just paints once */}
      <div
        className="absolute top-[5%] left-[35%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255, 140, 80, 0.28), rgba(255, 100, 60, 0.13) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Static brand teal/green ambient — bottom-right, balances amber */}
      <div
        className="absolute -bottom-[15%] -right-[10%] h-[80vh] w-[80vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45, 190, 108, 0.32), rgba(19, 139, 146, 0.20) 40%, transparent 72%)",
          filter: "blur(100px)",
        }}
      />

      {/* Static cobalt blue counter-glow — middle-left */}
      <div
        className="absolute top-[45%] left-[10%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45, 90, 160, 0.24), rgba(30, 60, 130, 0.12) 50%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      {/* HORIZONTAL LIGHT STREAK — static lens-flare, hero only */}
      {isHero && (
        <div
          className="absolute top-[18%] -left-[10%] right-[-10%] h-[120px] opacity-65"
          style={{
            background:
              "linear-gradient(100deg, transparent 0%, rgba(255, 200, 130, 0.35) 30%, rgba(255, 220, 160, 0.5) 50%, rgba(255, 200, 130, 0.35) 70%, transparent 100%)",
            transform: "rotate(-6deg)",
            filter: "blur(40px)",
          }}
        />
      )}

      {/* STATIC bokeh — pure CSS, no motion components.
          A single SVG with pre-positioned dots. Zero animation cost. */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        <defs>
          <filter id="bokehBlur">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>
        <g filter="url(#bokehBlur)">
          {STATIC_BOKEH.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill={d.fill}
              opacity={d.o}
            />
          ))}
        </g>
      </svg>

      {/* Static vignette — softens edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}

// Pre-computed static bokeh — rendered once via SVG, no animation overhead.
const STATIC_BOKEH = [
  { x: 8, y: 14, r: 0.6, fill: "rgba(255, 200, 110, 0.85)", o: 0.7 },
  { x: 78, y: 22, r: 0.45, fill: "rgba(255, 180, 100, 0.85)", o: 0.65 },
  { x: 35, y: 38, r: 0.3, fill: "rgba(255, 220, 160, 0.8)", o: 0.55 },
  { x: 88, y: 62, r: 0.4, fill: "rgba(61, 219, 126, 0.7)", o: 0.55 },
  { x: 22, y: 75, r: 0.5, fill: "rgba(255, 200, 130, 0.7)", o: 0.5 },
  { x: 65, y: 8, r: 0.3, fill: "rgba(255, 220, 150, 0.85)", o: 0.6 },
  { x: 4, y: 50, r: 0.3, fill: "rgba(255, 200, 130, 0.7)", o: 0.5 },
  { x: 95, y: 38, r: 0.5, fill: "rgba(255, 170, 90, 0.8)", o: 0.65 },
  { x: 18, y: 30, r: 0.4, fill: "rgba(255, 190, 110, 0.7)", o: 0.55 },
  { x: 72, y: 78, r: 0.55, fill: "rgba(45, 190, 108, 0.55)", o: 0.45 },
  { x: 92, y: 5, r: 0.25, fill: "rgba(255, 220, 150, 0.85)", o: 0.6 },
  { x: 28, y: 5, r: 0.45, fill: "rgba(255, 200, 130, 0.7)", o: 0.5 },
  { x: 85, y: 50, r: 0.3, fill: "rgba(255, 230, 170, 0.85)", o: 0.6 },
  { x: 50, y: 4, r: 0.2, fill: "rgba(255, 250, 200, 0.95)", o: 0.7 },
  { x: 70, y: 45, r: 0.3, fill: "rgba(255, 210, 140, 0.8)", o: 0.55 },
  { x: 30, y: 65, r: 0.4, fill: "rgba(255, 180, 100, 0.7)", o: 0.5 },
];
