"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const WIDTH = 560;
const HEIGHT = 200;
const PADDING = { top: 18, right: 18, bottom: 28, left: 36 };

// Y range in mg/dL. Roughly maps to a real continuous glucose monitor.
const Y_MIN = 70;
const Y_MAX = 180;
const TARGET_LO = 95;
const TARGET_HI = 140;

const PADDED_W = WIDTH - PADDING.left - PADDING.right;
const PADDED_H = HEIGHT - PADDING.top - PADDING.bottom;

function yToPx(value: number) {
  const t = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return PADDING.top + (1 - t) * PADDED_H;
}

/** A plausible 24-hour glucose curve — meal spikes at breakfast, lunch, dinner. */
function buildSeries(samples: number, drift: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    // Three meal bumps centred at 0.18, 0.5, 0.78 with falling tails.
    const bump = (centre: number, height: number, width: number) => {
      const d = (t - centre) / width;
      return height * Math.exp(-d * d);
    };
    const baseline = 100;
    const value =
      baseline +
      bump(0.18, 38, 0.07) + // breakfast
      bump(0.5, 28, 0.08) + // lunch
      bump(0.78, 32, 0.07) + // dinner
      Math.sin(t * Math.PI * 18) * 3 + // small noise
      drift;
    const x = PADDING.left + t * PADDED_W;
    const y = yToPx(Math.max(Y_MIN + 5, Math.min(Y_MAX - 5, value)));
    pts.push({ x, y });
  }
  return pts;
}

function pathFromPoints(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  const d: string[] = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const cx = (prev.x + cur.x) / 2;
    d.push(`Q ${prev.x} ${prev.y} ${cx} ${(prev.y + cur.y) / 2}`);
    d.push(`T ${cur.x} ${cur.y}`);
  }
  return d.join(" ");
}

/**
 * An animated SVG glucose trend chart. Draws on first scroll-in via SVG path
 * stroke-dashoffset, then enters a slow undulation (Y values drift gently)
 * to communicate "live data" without ever being distracting.
 *
 * Used in the Science section as the supporting visual for the trend-classification
 * story.
 */
export function GlucoseChart({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();
  const [drift, setDrift] = useState(0);

  // Subtle perpetual undulation — drift oscillates with a 12s period.
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let start = 0;
    function tick(now: number) {
      if (!start) start = now;
      const elapsed = (now - start) / 1000;
      setDrift(Math.sin(elapsed / 1.9) * 1.6 + Math.cos(elapsed / 3.1) * 1.1);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const points = buildSeries(72, drift);
  const path = pathFromPoints(points);
  const areaPath =
    path +
    ` L ${PADDING.left + PADDED_W} ${PADDING.top + PADDED_H}` +
    ` L ${PADDING.left} ${PADDING.top + PADDED_H} Z`;

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        aria-label="Illustrative 24-hour glycemic trend"
        role="img"
      >
        <defs>
          <linearGradient id="gc-stroke" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#2BA3D6" />
            <stop offset="50%" stopColor="#138B92" />
            <stop offset="100%" stopColor="#3DDB7E" />
          </linearGradient>
          <linearGradient id="gc-area" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#3DDB7E" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3DDB7E" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Target band */}
        <rect
          x={PADDING.left}
          y={yToPx(TARGET_HI)}
          width={PADDED_W}
          height={yToPx(TARGET_LO) - yToPx(TARGET_HI)}
          fill="rgba(61, 219, 126, 0.06)"
        />
        <line
          x1={PADDING.left}
          x2={PADDING.left + PADDED_W}
          y1={yToPx(TARGET_HI)}
          y2={yToPx(TARGET_HI)}
          stroke="rgba(255,255,255,0.08)"
          strokeDasharray="3 4"
        />
        <line
          x1={PADDING.left}
          x2={PADDING.left + PADDED_W}
          y1={yToPx(TARGET_LO)}
          y2={yToPx(TARGET_LO)}
          stroke="rgba(255,255,255,0.08)"
          strokeDasharray="3 4"
        />

        {/* Y axis labels */}
        {[180, 140, 95, 70].map((v) => (
          <text
            key={v}
            x={PADDING.left - 8}
            y={yToPx(v) + 4}
            textAnchor="end"
            className="fill-white/30"
            fontSize="10"
            fontFamily="var(--font-sans)"
          >
            {v}
          </text>
        ))}

        {/* Time axis labels */}
        {[
          { t: 0, label: "6a" },
          { t: 0.25, label: "10a" },
          { t: 0.5, label: "2p" },
          { t: 0.75, label: "6p" },
          { t: 1, label: "10p" },
        ].map(({ t, label }) => (
          <text
            key={label}
            x={PADDING.left + t * PADDED_W}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-white/30"
            fontSize="10"
            fontFamily="var(--font-sans)"
          >
            {label}
          </text>
        ))}

        {/* Filled area below the curve */}
        <motion.path
          d={areaPath}
          fill="url(#gc-area)"
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
        />

        {/* Trend line draws in on first view */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#gc-stroke)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.4 },
          }}
        />

        {/* Live cursor — pulsing dot at the most recent point */}
        {!reduce && inView && (
          <motion.circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={4}
            fill="#3DDB7E"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.4 }}
          >
            <animate
              attributeName="r"
              values="3;6;3"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.circle>
        )}
      </svg>
    </div>
  );
}
