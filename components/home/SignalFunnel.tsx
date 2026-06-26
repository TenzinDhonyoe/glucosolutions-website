"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Utensils, Droplet, Footprints, Moon, Wheat, Smile } from "lucide-react";
import { Container, Eyebrow, type IconType } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { GlucoseChart } from "@/components/ui/GlucoseChart";
import { DashboardWheel } from "./DashboardWheel";

/**
 * SignalFunnel — the Capabilities centerpiece. A full-height band: six source
 * signals sit in a column on the left and flow rightward down thin converging
 * hairlines into one personalized dashboard (data dots stream along the lines).
 * A large dashboard wheel fills the right, spanning the full screen height and
 * turning as you scroll. Stacks to an icon row + card on small screens. Lines
 * static / dots hidden under reduced motion.
 */

const VB_W = 500;
const VB_H = 600;
const NECK_X = 500;
const NECK_Y = 300;
const NODE_X = 130;
const LINE_START = 168;
const NODE_Y = [60, 156, 252, 348, 444, 540];

const EASE = [0.22, 0.61, 0.21, 1] as const;

const SOURCES: { label: string; icon: IconType }[] = [
  { label: "Meals", icon: Utensils },
  { label: "Glucose", icon: Droplet },
  { label: "Movement", icon: Footprints },
  { label: "Sleep", icon: Moon },
  { label: "Fibre", icon: Wheat },
  { label: "Mood", icon: Smile },
];

const STATS = [
  { k: "Steps", v: "8,924" },
  { k: "Sleep", v: "7.2h" },
  { k: "Fibre", v: "27g" },
];

const CAPTION =
  "Meals, glucose, movement, sleep, and more, organized into one read on the weeks between sessions.";

function pathFor(y: number) {
  return `M ${LINE_START},${y} C 320,${y} 380,${NECK_Y} ${NECK_X},${NECK_Y}`;
}

function Heading() {
  return (
    <>
      <Reveal>
        <Eyebrow slash>Capabilities</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display-serif mt-5 max-w-2xl text-[clamp(2rem,4.4vw,3.2rem)] text-ink-900 text-balance">
          Every signal they log, in one personalized view.
        </h2>
      </Reveal>
    </>
  );
}

function NodeBadge({ icon: Icon }: { icon: IconType }) {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-ink-600 shadow-[0_1px_3px_rgba(43,38,32,0.06)] sm:h-12 sm:w-12">
      <Icon size={18} strokeWidth={1.6} aria-hidden />
    </span>
  );
}

function Funnel() {
  const reduce = useReducedMotion() === true;
  const uid = useId().replace(/[:]/g, "");

  return (
    <div className="relative aspect-[5/6] w-[270px] shrink-0">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1690c2" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1690c2" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {NODE_Y.map((y, i) => {
          const pid = `${uid}-p${i}`;
          return (
            <g key={i}>
              <motion.path
                id={pid}
                d={pathFor(y)}
                fill="none"
                stroke={`url(#${uid}-line)`}
                strokeWidth={1}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: EASE }}
              />
              {reduce
                ? null
                : [0, 1].map((d) => {
                    const begin = `${0.9 + i * 0.22 + d * 1.2}s`;
                    return (
                      <circle key={d} r={4} fill="#1690c2" opacity={0}>
                        <animateMotion
                          dur="2.4s"
                          begin={begin}
                          repeatCount="indefinite"
                          keyPoints="0;1"
                          keyTimes="0;1"
                          calcMode="linear"
                        >
                          <mpath href={`#${pid}`} />
                        </animateMotion>
                        <animate
                          attributeName="opacity"
                          dur="2.4s"
                          begin={begin}
                          repeatCount="indefinite"
                          values="0;0.95;0.95;0"
                          keyTimes="0;0.12;0.82;1"
                        />
                      </circle>
                    );
                  })}
            </g>
          );
        })}

        <motion.circle
          cx={NECK_X}
          cy={NECK_Y}
          r={4}
          fill="#fff"
          stroke="#1690c2"
          strokeWidth={1.4}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.85, ease: EASE }}
        />
      </svg>

      {SOURCES.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(NODE_X / VB_W) * 100}%`, top: `${(NODE_Y[i] / VB_H) * 100}%` }}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
        >
          <span className="absolute right-full top-1/2 mr-2.5 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-400">
            {s.label}
          </span>
          <NodeBadge icon={s.icon} />
        </motion.div>
      ))}
    </div>
  );
}

function Dashboard() {
  const reduce = useReducedMotion() === true;
  return (
    <motion.div
      className="relative z-10 rounded-2xl border border-line bg-card p-5 shadow-lg"
      initial={reduce ? false : { opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-[13px] font-semibold text-sky-800">
            ER
          </span>
          <div className="leading-tight">
            <div className="font-serif text-[15px] text-ink-900">Elena Rodriguez</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">
              This week
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-good-bg px-2 py-0.5 text-[11px] font-semibold text-good">
          <span className="h-1.5 w-1.5 rounded-full bg-good" /> Live
        </span>
      </div>

      <div className="mt-4">
        <GlucoseChart
          title="Glucose · this week"
          height={130}
          mealIdx={[3, 7]}
          legend={false}
          className="border-0 bg-transparent p-0 shadow-none"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {STATS.map((s) => (
          <div key={s.k} className="rounded-lg border border-line bg-page/60 px-3 py-2">
            <div className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-400">
              {s.k}
            </div>
            <div className="tnum mt-0.5 text-[15px] font-medium text-ink-900">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-sky-50 px-3.5 py-2.5 text-[13px] leading-snug text-ink-700">
        Walk before lunch keeps her afternoons steady.
      </div>
    </motion.div>
  );
}

export function SignalFunnel() {
  return (
    <>
      {/* desktop — a full-height band. The wheel spans the whole screen height on
          the right; heading sits top-left, funnel + focal card centre-left. */}
      <div className="relative hidden h-[100svh] min-h-[680px] w-full overflow-hidden lg:block">
        <DashboardWheel className="absolute inset-y-0 right-0 z-0 w-[58%]" />
        <Container className="relative z-10 flex h-full flex-col">
          <div className="pt-28">
            <Heading />
          </div>
          <div className="flex flex-1 items-center">
            <Funnel />
            <div className="relative z-10 -ml-4 w-[400px] shrink-0">
              <Dashboard />
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm pb-10 text-[15px] leading-relaxed text-ink-500">
              {CAPTION}
            </p>
          </Reveal>
        </Container>
      </div>

      {/* mobile — heading, a compact icon row, then the dashboard */}
      <div className="px-6 py-16 lg:hidden">
        <Heading />
        <div className="mx-auto mb-7 mt-10 flex max-w-sm flex-wrap items-start justify-center gap-x-5 gap-y-4">
          {SOURCES.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <NodeBadge icon={s.icon} />
              <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-ink-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-[440px]">
          <Dashboard />
        </div>
        <p className="mx-auto mt-6 max-w-md text-center text-[15px] leading-relaxed text-ink-500">
          {CAPTION}
        </p>
      </div>
    </>
  );
}
