"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "hero" | "problem" | "waitlist" | "section";

type Props = {
  variant?: Variant;
  className?: string;
};

/**
 * Cinematic atmospheric background. Mimics the warm-golden / motion-blur
 * editorial-photography aesthetic (Apple Vision Pro, Hims & Hers, viral
 * "blurry photo" trend) using pure CSS — large heavily-blurred radial
 * gradient blobs in warm + brand colours, plus a horizontal light streak
 * (lens-flare), bokeh dot field, and grain. Each variant tunes the palette.
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
      {/* Base canvas with warm-to-cool gradient — mimics how golden hour
          light grades from amber up top to cool teal at the floor */}
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

      {/* GOLDEN HOUR sun — large bright amber blob in upper-left,
          significantly more saturated than the previous version */}
      <motion.div
        className="absolute -top-[15%] -left-[10%] h-[80vh] w-[80vh] rounded-full blur-[120px]"
        style={{
          background: isHero
            ? "radial-gradient(closest-side, rgba(255, 165, 70, 0.55), rgba(245, 130, 60, 0.30) 40%, transparent 75%)"
            : isProblem
            ? "radial-gradient(closest-side, rgba(255, 150, 80, 0.40), rgba(220, 110, 60, 0.20) 45%, transparent 75%)"
            : "radial-gradient(closest-side, rgba(255, 200, 110, 0.25), transparent 70%)",
        }}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.85, 1, 0.85],
                scale: [1, 1.06, 1],
                x: [0, 30, 0],
                y: [0, 18, 0],
              }
        }
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Secondary warm bloom — peach/orange in upper-center, simulates
          atmospheric haze around the sun */}
      <motion.div
        className="absolute top-[5%] left-[35%] h-[55vh] w-[55vh] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255, 140, 80, 0.30), rgba(255, 100, 60, 0.15) 45%, transparent 70%)",
        }}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.5, 0.85, 0.5],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 11,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2,
        }}
      />

      {/* Brand teal/green ambient — bottom-right, balances the warm amber */}
      <motion.div
        className="absolute -bottom-[15%] -right-[10%] h-[80vh] w-[80vh] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45, 190, 108, 0.32), rgba(19, 139, 146, 0.20) 40%, transparent 72%)",
        }}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.65, 0.95, 0.65],
                scale: [1, 1.1, 1],
                y: [0, -20, 0],
              }
        }
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Deep cobalt blue counter-glow — middle-left, adds depth */}
      <motion.div
        className="absolute top-[45%] left-[10%] h-[55vh] w-[55vh] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45, 90, 160, 0.28), rgba(30, 60, 130, 0.14) 50%, transparent 75%)",
        }}
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.4, 0.7, 0.4],
                x: [0, -25, 0],
                y: [0, 15, 0],
              }
        }
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1,
        }}
      />

      {/* HORIZONTAL LIGHT STREAK — diagonal lens-flare across the upper
          third of the hero. Mimics the streak of sunlight cutting through
          motion-blurred footage. Only on hero variant. */}
      {isHero && (
        <motion.div
          className="absolute top-[18%] -left-[10%] right-[-10%] h-[120px] blur-[60px] opacity-70"
          style={{
            background:
              "linear-gradient(100deg, transparent 0%, rgba(255, 200, 130, 0.4) 30%, rgba(255, 220, 160, 0.55) 50%, rgba(255, 200, 130, 0.4) 70%, transparent 100%)",
            transform: "rotate(-6deg)",
          }}
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.55, 0.85, 0.55],
                  x: [0, 30, 0],
                }
          }
          transition={{
            duration: 13,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      )}

      {/* Bokeh dot-field — simulates out-of-focus highlights in real
          motion-blur photography */}
      <div className="absolute inset-0">
        {BOKEH_DOTS.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${dot.y}%`,
              left: `${dot.x}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              background: dot.color,
              filter: `blur(${dot.blur}px)`,
              opacity: dot.opacity,
            }}
            animate={
              reduce
                ? undefined
                : {
                    opacity: [
                      dot.opacity * 0.5,
                      dot.opacity,
                      dot.opacity * 0.5,
                    ],
                    scale: [1, 1.2, 1],
                  }
            }
            transition={{
              duration: 6 + (i % 5),
              ease: "easeInOut",
              repeat: Infinity,
              delay: (i % 7) * 0.6,
            }}
          />
        ))}
      </div>

      {/* Grain — fakes lens grain from real photography */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Vignette — softens edges so content reads cleanly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}

const BOKEH_DOTS = [
  { x: 8, y: 14, size: 10, blur: 5, color: "rgba(255, 200, 110, 0.85)", opacity: 0.7 },
  { x: 78, y: 22, size: 7, blur: 4, color: "rgba(255, 180, 100, 0.85)", opacity: 0.65 },
  { x: 35, y: 38, size: 5, blur: 3, color: "rgba(255, 220, 160, 0.8)", opacity: 0.55 },
  { x: 88, y: 62, size: 6, blur: 4, color: "rgba(61, 219, 126, 0.7)", opacity: 0.55 },
  { x: 22, y: 75, size: 8, blur: 6, color: "rgba(255, 200, 130, 0.7)", opacity: 0.5 },
  { x: 65, y: 8, size: 5, blur: 3, color: "rgba(255, 220, 150, 0.85)", opacity: 0.6 },
  { x: 45, y: 88, size: 6, blur: 4, color: "rgba(45, 190, 108, 0.7)", opacity: 0.5 },
  { x: 4, y: 50, size: 5, blur: 3, color: "rgba(255, 200, 130, 0.7)", opacity: 0.5 },
  { x: 95, y: 38, size: 8, blur: 6, color: "rgba(255, 170, 90, 0.8)", opacity: 0.65 },
  { x: 55, y: 22, size: 4, blur: 2, color: "rgba(255, 240, 180, 0.9)", opacity: 0.7 },
  { x: 18, y: 30, size: 6, blur: 4, color: "rgba(255, 190, 110, 0.7)", opacity: 0.55 },
  { x: 72, y: 78, size: 9, blur: 6, color: "rgba(45, 190, 108, 0.55)", opacity: 0.45 },
  { x: 40, y: 60, size: 4, blur: 3, color: "rgba(255, 220, 160, 0.7)", opacity: 0.5 },
  { x: 5, y: 88, size: 6, blur: 4, color: "rgba(255, 180, 100, 0.7)", opacity: 0.45 },
  { x: 92, y: 5, size: 4, blur: 3, color: "rgba(255, 220, 150, 0.85)", opacity: 0.6 },
  { x: 28, y: 5, size: 7, blur: 5, color: "rgba(255, 200, 130, 0.7)", opacity: 0.5 },
  { x: 58, y: 92, size: 6, blur: 4, color: "rgba(255, 190, 110, 0.65)", opacity: 0.45 },
  { x: 85, y: 50, size: 4, blur: 3, color: "rgba(255, 230, 170, 0.85)", opacity: 0.6 },
  { x: 50, y: 4, size: 3, blur: 2, color: "rgba(255, 250, 200, 0.95)", opacity: 0.7 },
  { x: 15, y: 95, size: 7, blur: 5, color: "rgba(45, 190, 108, 0.65)", opacity: 0.5 },
  { x: 70, y: 45, size: 5, blur: 3, color: "rgba(255, 210, 140, 0.8)", opacity: 0.55 },
  { x: 30, y: 65, size: 6, blur: 4, color: "rgba(255, 180, 100, 0.7)", opacity: 0.5 },
];
