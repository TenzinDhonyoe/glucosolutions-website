"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FileText,
  Sparkles,
  TrendingUp,
  Utensils,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion";
import { ProductDashboard } from "./ProductDashboard";

/* =========================================================================
   Showcase — the "all-in-one platform" band. A colorful gradient panel that
   sits directly under the hero (both read in one viewport). A dark pitch card
   holds animated data sources wiring into a floating browser corner of the
   real clinician dashboard; an honest capabilities card sits beside it.
   ========================================================================= */

/* ---- Workflow connector — a dotted "integration" motif that links the pitch
   card to the floating product mockup. Each real input (meals, session notes,
   activity) wires into the product with its own animated dotted line, so the
   section reads as "everything converges into one record." Labels map to what's
   visible in the mockup so nothing is invented. ---- */
const SOURCES = [
  {
    icon: Utensils,
    label: "Meal logs",
    top: "top-[44%]",
    d: "M6 70 C 78 70, 118 90, 190 104",
  },
  {
    icon: FileText,
    label: "Session notes",
    top: "top-[61%]",
    d: "M6 70 C 86 70, 126 64, 190 56",
  },
  {
    icon: Activity,
    label: "Activity",
    top: "top-[78%]",
    d: "M6 70 C 78 70, 118 48, 190 20",
  },
];

// Sequential "pipeline" timing — each source fires a packet in turn, then the
// whole loop pauses briefly before repeating.
const FIRE_DUR = 0.85; // time one packet takes to travel the line
const FIRE_STEP = 0.9; // stagger between one source firing and the next
const FIRE_CYCLE = 3.4; // full loop length (fire, fire, fire, pause)

function SourceNode({
  icon: Icon,
  label,
  top,
  d,
  index,
  reduce,
}: {
  icon: typeof Utensils;
  label: string;
  top: string;
  d: string;
  index: number;
  reduce: boolean;
}) {
  // Same timing drives the traveling packet and the node flash, so the node
  // lights up exactly as its packet launches. Each source is offset by one
  // step, so they fire in order rather than all at once.
  const fire = {
    duration: FIRE_DUR,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatDelay: FIRE_CYCLE - FIRE_DUR,
    delay: index * FIRE_STEP,
  };
  return (
    <div className={`pointer-events-none absolute left-[7%] ${top} hidden md:block`}>
      <div className="relative flex items-center">
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.07] px-2.5 py-2 ring-1 ring-white/10 backdrop-blur-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3fc6cf]/15 text-[#7fe0e6]">
            <Icon size={14} strokeWidth={2} />
          </span>
          <span className="whitespace-nowrap pr-0.5 text-[12px] font-semibold text-white/85">
            {label}
          </span>
        </div>

        {/* dotted line into the product, with a packet that fires in sequence */}
        <svg
          aria-hidden
          width="196"
          height="140"
          viewBox="0 0 196 140"
          fill="none"
          className="absolute left-full top-1/2 -ml-1 -translate-y-1/2"
        >
          {/* faint static base line — the connection always reads */}
          <path
            d={d}
            stroke="rgba(120,220,225,0.28)"
            strokeWidth="1.5"
            strokeDasharray="1.5 7"
            strokeLinecap="round"
          />
          {/* bright packet traveling from the source into the browser */}
          {!reduce && (
            <motion.path
              d={d}
              stroke="rgba(165,242,247,0.95)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="16 160"
              initial={{ strokeDashoffset: 16 }}
              animate={{ strokeDashoffset: [16, -120] }}
              transition={fire}
            />
          )}
          {/* node flash — pulses as this source launches its packet */}
          {!reduce && (
            <motion.circle
              cx="6"
              cy="70"
              r="5"
              fill="none"
              stroke="rgba(165,242,247,0.9)"
              strokeWidth="1.5"
              initial={{ r: 5, opacity: 0 }}
              animate={{ r: [5, 15], opacity: [0.9, 0] }}
              transition={fire}
            />
          )}
          <circle cx="6" cy="70" r="7" fill="rgba(63,198,207,0.22)" />
          <circle cx="6" cy="70" r="4" fill="#3fc6cf" />
        </svg>
      </div>
    </div>
  );
}

function WorkflowConnector({ reduce }: { reduce: boolean }) {
  return (
    <>
      {SOURCES.map((s, i) => (
        <SourceNode key={s.label} index={i} reduce={reduce} {...s} />
      ))}
    </>
  );
}

/* ---- App window (browser chrome + real client-detail dashboard) ---- */
function DashboardWindow() {
  return (
    <div className="w-[1120px] overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-[#e6e9ec] bg-[#f7f9fa] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto flex items-center rounded-md bg-white px-4 py-1 text-[12px] text-ink-400 ring-1 ring-[#e6e9ec]">
          app.glucosolutions.ca/roster/john-doe
        </span>
      </div>
      <ProductDashboard />
    </div>
  );
}

const FEATURES = [
  {
    icon: Sparkles,
    label: "Sourced interpretation",
    desc: "Every number traces to its source.",
  },
  {
    icon: CalendarDays,
    label: "Between-session logging",
    desc: "See the weeks between visits.",
  },
  {
    icon: ClipboardList,
    label: "Session briefs",
    desc: "Walk in already caught up.",
  },
  {
    icon: TrendingUp,
    label: "Outcomes reporting",
    desc: "Prove what changed.",
  },
];

export function Showcase() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section className="w-full px-4 pb-8 md:px-6 md:pb-10" style={{ background: "#f6f6f4" }}>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#127399]">
        {/* animated "liquid metal" background — generated metal texture that
            slowly pans, with a diagonal glint sweeping across for the shine */}
        <div className="showcase-bg" aria-hidden />
        <div className="showcase-glint" aria-hidden />

        <div className="relative px-5 pt-10 pb-8 md:px-9 md:pt-12 md:pb-10">
          <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            {/* Left — dark pitch card. Animated data sources wire in from the
                left into a floating browser corner of the real dashboard, which
                bleeds off the card's right edge (the "platform example" shot). */}
            <Reveal variant="up" immediate delay={0.15}>
              <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-[#101114] p-7 md:min-h-[400px] md:p-9">
                <div className="relative z-10 max-w-[260px]">
                  <span className="inline-flex rounded-md bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-white/90 ring-1 ring-white/15">
                    Platform
                  </span>
                  <h3 className="mt-4 text-[26px] font-bold leading-[1.15] text-white md:text-[30px]">
                    All-in-One Clinical Platform
                  </h3>
                </div>

                {/* Dotted "integration" connector wiring the pitch into the product */}
                <WorkflowConnector reduce={reduce} />

                {/* Floating browser corner — bleeds off the card, framed so the
                    sidebar, client masthead and session continuity land in view. */}
                <div className="pointer-events-none absolute left-[4%] top-[41%] md:left-[42%] md:top-[9%]">
                  <div
                    aria-hidden
                    className="origin-top-left scale-[0.56] md:scale-[0.62]"
                  >
                    <DashboardWindow />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right — honest capabilities card, filling its full height */}
            <Reveal variant="up" immediate delay={0.3}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-xl ring-1 ring-black/5 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#127399]">
                    Inside the platform
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-400">
                    One record
                  </span>
                </div>

                <div className="mt-1 flex flex-1 flex-col">
                  {FEATURES.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={f.label}
                        className={`flex flex-1 items-center gap-4 ${
                          i > 0 ? "border-t border-[#eef1f2]" : ""
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1aabb3]/12 text-[#12868c]">
                          <Icon size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <div className="text-[15px] font-semibold text-ink-900">
                            {f.label}
                          </div>
                          <div className="mt-0.5 text-[13px] leading-relaxed text-ink-500">
                            {f.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2 border-t border-[#eef1f2] pt-5">
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#127399] transition-colors hover:text-[#0e6b72]"
                  >
                    Explore the product
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
