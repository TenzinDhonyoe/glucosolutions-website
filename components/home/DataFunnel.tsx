"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Utensils,
  Droplet,
  Footprints,
  Moon,
  Wheat,
  Smile,
} from "lucide-react";
import type { IconType } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * DataFunnel — the Capabilities centerpiece. Everything a patient logs (the six
 * source nodes) streams down converging paths into one personalized dashboard.
 * Lines draw in on scroll; particles flow continuously toward the hub. Built in
 * the warm brand palette (not a copy of any one reference). Static, no streaming
 * particles under reduced motion.
 */

const VB_W = 1000;
const VB_H = 560;
const NODE_Y = 78;
const HUB_X = 500;
const HUB_JOIN = 348; // y where every path meets the hub

const SOURCES: { label: string; icon: IconType; x: number }[] = [
  { label: "Meals", icon: Utensils, x: 100 },
  { label: "Glucose", icon: Droplet, x: 260 },
  { label: "Steps", icon: Footprints, x: 420 },
  { label: "Sleep", icon: Moon, x: 580 },
  { label: "Fibre", icon: Wheat, x: 740 },
  { label: "Mood", icon: Smile, x: 900 },
];

const EASE = [0.22, 0.61, 0.21, 1] as const;

function pathFor(x: number) {
  // Drop straight out of the node, then sweep into the hub's top-centre.
  return `M ${x},100 C ${x},214 ${HUB_X},250 ${HUB_X},${HUB_JOIN}`;
}

export function DataFunnel() {
  const reduce = useReducedMotion();
  const uid = useId().replace(/[:]/g, "");

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
    >
      {/* converging paths + flowing particles */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2bb0dc" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#1690c2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4e9a6b" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {SOURCES.map((s, i) => {
          const pid = `${uid}-p${i}`;
          const d = pathFor(s.x);
          return (
            <g key={s.label}>
              <motion.path
                id={pid}
                d={d}
                fill="none"
                stroke={`url(#${uid}-stroke)`}
                strokeWidth={1.6}
                strokeLinecap="round"
                initial={
                  reduce
                    ? { pathLength: 1, opacity: 0.5 }
                    : { pathLength: 0, opacity: 0 }
                }
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.07, ease: EASE }}
              />
              {/* flowing data particles (skip for reduced motion) */}
              {reduce
                ? null
                : [0, 1].map((d2) => (
                    <circle key={d2} r={3.4} fill="#1690c2">
                      <animateMotion
                        dur="2.8s"
                        begin={`${1 + i * 0.18 + d2 * 1.4}s`}
                        repeatCount="indefinite"
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      >
                        <mpath href={`#${pid}`} />
                      </animateMotion>
                    </circle>
                  ))}
            </g>
          );
        })}
      </svg>

      {/* source nodes */}
      {SOURCES.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          style={{ left: `${(s.x / VB_W) * 100}%`, top: `${(NODE_Y / VB_H) * 100}%` }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-card text-sky-700 shadow-sm sm:h-12 sm:w-12">
            <s.icon size={19} aria-hidden />
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-500">
            {s.label}
          </span>
        </motion.div>
      ))}

      {/* personalized dashboard hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[min(82%,330px)] -translate-x-1/2 -translate-y-1/2"
        style={{ top: `${(430 / VB_H) * 100}%` }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
      >
        {/* brand glow */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-6 rounded-full opacity-25 blur-2xl",
            !reduce && "animate-[pulse_3.5s_ease-in-out_infinite]",
          )}
          style={{ background: "var(--brand-gradient)" }}
        />
        <div className="relative rounded-2xl border border-line bg-card p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="mono-label text-sky-700">Personalized view</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-good-bg px-2 py-0.5 text-[11px] font-semibold text-good">
              <span className="h-1.5 w-1.5 rounded-full bg-good" /> Live
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[15px] font-bold text-white"
              style={{ background: "var(--brand-gradient)" }}
            >
              94
            </span>
            <div className="min-w-0">
              <div className="font-serif text-[17px] leading-tight text-ink-900">
                Elena&apos;s week, made clear
              </div>
              <div className="text-[12px] text-ink-500">Every signal, one read.</div>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-sky-50 px-3 py-2 text-[12px] text-ink-700">
            Walk before lunch keeps her afternoons steady.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
