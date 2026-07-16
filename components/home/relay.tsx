"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, FileDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "./PhoneFrame";
import { C, mono, display, DeltaChip } from "./product-ui";

/* =============================================================================
   relay — the three surfaces the record passes through in "How it works".
   Each stage is a DISTINCT, real product artifact (not the same dashboard
   dimmed three ways): the patient's phone, the interpretation engine, and the
   clinician's session brief. The brief is literally built from the two signals
   the engine surfaces, so the section reads as one record handed along.
   ========================================================================== */

/* ---- Stage 1 — the real Redu logging screen, in a phone -------------------- */
export function PhoneStage({ className }: { className?: string }) {
  return (
    <PhoneFrame className={cn("max-w-[184px]", className)}>
      <Image
        src="/screens/redu-log.png"
        alt="The Redu patient app logging screen: log a meal, glucose, or activity, with today's recent entries."
        fill
        sizes="184px"
        className="object-cover object-top"
      />
    </PhoneFrame>
  );
}

/* ---- Stage 2 — the sourced interpretation the engine produces --------------
   Rebuilt as a self-contained dark panel tuned for a narrow column: each signal
   stacks (label + status, then the big figure with its delta, then the sample
   line) so nothing crowds or overlaps the way a wide side-by-side row would. -- */

type Signal = {
  label: string;
  sub: string;
  value: string;
  unit: string;
  status: "needs_attention" | "on_track";
  delta: { was: string; dir: "worsening" | "improving" };
};

const SIGNALS: Signal[] = [
  {
    label: "Post-lunch response",
    sub: "last 14 days · n=11",
    value: "138",
    unit: "mg/dL",
    status: "needs_attention",
    delta: { was: "116", dir: "worsening" },
  },
  {
    label: "Morning walk days",
    sub: "last 14 days · n=9",
    value: "+22",
    unit: "mg/dL steadier",
    status: "on_track",
    delta: { was: "flat", dir: "improving" },
  },
];

const STATUS = {
  needs_attention: { dot: C.bad, ink: "#F0847A", label: "Needs attention" },
  on_track: { dot: C.good, ink: "#7FD3A0", label: "On track" },
} as const;

function CompactSignal({ s, first }: { s: Signal; first?: boolean }) {
  const st = STATUS[s.status];
  return (
    <div
      className="py-3.5"
      style={{ borderTop: first ? undefined : "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* line 1 — the signal + its clinical status */}
      <div className="flex items-center gap-2">
        <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: st.dot }} />
        <span className="text-[13.5px] font-medium leading-tight text-white/90">{s.label}</span>
        <span
          className="ml-auto shrink-0 text-[9px] font-semibold uppercase tracking-[0.12em]"
          style={{ ...mono, color: st.ink }}
        >
          {st.label}
        </span>
      </div>
      {/* line 2 — the figure and how it moved */}
      <div className="mt-2.5 flex items-baseline gap-x-2.5 gap-y-1.5 pl-[15px] flex-wrap">
        <span className="whitespace-nowrap text-[26px] font-semibold leading-none text-white" style={mono}>
          {s.value}
          <span className="ml-1.5 text-[12px] font-medium text-white/55">{s.unit}</span>
        </span>
        <DeltaChip was={s.delta.was} dir={s.delta.dir} />
      </div>
      {/* line 3 — the sample it was computed over */}
      <div className="mt-1.5 pl-[15px] text-[10px] leading-tight text-white/40" style={mono}>
        {s.sub}
      </div>
    </div>
  );
}

export function EngineStage({ className }: { className?: string }) {
  return (
    <section
      aria-label="Data Interpretation"
      className={cn(
        "relative w-full overflow-hidden rounded-[18px] p-5 text-white shadow-xl",
        className,
      )}
      style={{
        border: "1px solid rgba(43,176,220,0.22)",
        background:
          "radial-gradient(130% 150% at 0% 0%, rgba(43,176,220,0.14), rgba(43,176,220,0) 46%), linear-gradient(155deg, #141821 0%, #0F1219 62%)",
        ...display,
      }}
    >
      {/* top hairline — the sky→green brand seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(43,176,220,0) 2%, rgba(43,176,220,0.4) 20%, rgba(78,154,107,0.28) 58%, rgba(255,255,255,0) 96%)",
        }}
      />
      <div className="relative">
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[-0.01em]">
            <Sparkles size={16} strokeWidth={2.2} style={{ color: C.sky500 }} />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${C.sky500}, ${C.good})` }}
            >
              Data Interpretation
            </span>
          </span>
          <span className="text-[9.5px] uppercase tracking-[0.12em] text-white/45" style={mono}>
            through 07-15
          </span>
        </div>
        {SIGNALS.map((s, i) => (
          <CompactSignal key={s.label} s={s} first={i === 0} />
        ))}
      </div>
    </section>
  );
}

/* ---- Stage 3 — the session brief, assembled from those two signals --------- */
function BriefLine({
  tone,
  children,
}: {
  tone: "watch" | "good";
  children: React.ReactNode;
}) {
  const dot = tone === "watch" ? C.bad : C.good;
  return (
    <li className="flex items-start gap-2.5">
      <span
        className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full"
        style={{ background: dot }}
      />
      <span className="text-[13px] leading-snug" style={{ color: C.text2 }}>
        {children}
      </span>
    </li>
  );
}

export function BriefStage({ className }: { className?: string }) {
  return (
    <div
      className={cn("w-full rounded-[18px] p-5 shadow-xl", className)}
      style={{ background: C.surface, border: `1px solid ${C.border}`, ...display }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{ ...mono, color: C.primary }}
        >
          Session brief
        </span>
        <span className="text-[10px]" style={{ ...mono, color: C.textLight }}>
          Thu · 2:30 PM
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2.5">
        <span
          className="grid h-8 w-8 flex-none place-items-center rounded-full text-[12px] font-bold"
          style={{ background: C.sky100, color: C.primary }}
        >
          JD
        </span>
        <div className="leading-tight">
          <div className="text-[15px] font-medium" style={{ color: C.text }}>
            John Doe
          </div>
          <div className="text-[11px]" style={{ ...mono, color: C.text2 }}>
            Prediabetes reversal · wk 6
          </div>
        </div>
      </div>

      <div
        className="mt-3.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
        style={{ ...mono, color: C.textLight }}
      >
        Open with
      </div>
      <ul className="mt-2 space-y-2">
        <BriefLine tone="watch">
          Post-lunch response climbed to{" "}
          <b style={{ color: C.text }}>138</b>, up from 116. Ask what changed at
          lunch.
        </BriefLine>
        <BriefLine tone="good">
          Days with a morning walk run <b style={{ color: C.text }}>+22 steadier</b>.
          Reinforce the habit.
        </BriefLine>
      </ul>

      <div
        className="mt-4 flex items-center gap-2 border-t pt-3.5"
        style={{ borderColor: C.borderLight }}
      >
        <span
          className="inline-flex items-center gap-1.5 rounded-[9px] px-2.5 py-1.5 text-[11.5px] font-semibold"
          style={{ background: C.raised, color: C.text2, border: `1px solid ${C.border}` }}
        >
          <MessageSquare size={13} aria-hidden /> Message John
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-[9px] px-2.5 py-1.5 text-[11.5px] font-semibold text-white"
          style={{ background: C.primary }}
        >
          <FileDown size={13} aria-hidden /> Export for referrer
        </span>
      </div>
    </div>
  );
}

/* ---- Connector — a dotted line that carries a packet from one stage to the
   next. It "fires" once the relay reaches this hop, echoing the data-flow
   motif in the Showcase band but running strictly left-to-right. ------------- */
export function Connector({
  lit,
  reduce,
  vertical = false,
}: {
  lit: boolean;
  reduce: boolean;
  vertical?: boolean;
}) {
  const base = "rgba(18,115,153,0.28)";
  const bright = C.sky500;

  if (vertical) {
    return (
      <div
        aria-hidden
        className="relative flex h-9 w-full items-center justify-center"
      >
        <svg width="14" height="40" viewBox="0 0 14 40" fill="none" className="overflow-visible">
          <path
            d="M7 2 V38"
            stroke={base}
            strokeWidth="1.6"
            strokeDasharray="1.5 6"
            strokeLinecap="round"
          />
          {!reduce && lit && (
            <motion.path
              d="M7 2 V38"
              stroke={bright}
              strokeWidth="2.2"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="12 120"
              initial={{ strokeDashoffset: 12 }}
              animate={{ strokeDashoffset: [12, -110] }}
              transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.6 }}
            />
          )}
          <path d="M2.5 32 L7 38 L11.5 32" stroke={lit ? bright : base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="relative flex h-full w-full items-center justify-center"
    >
      <svg
        width="100%"
        height="24"
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        fill="none"
        className="overflow-visible"
      >
        <path
          d="M2 12 H92"
          stroke={base}
          strokeWidth="1.6"
          strokeDasharray="1.5 6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {!reduce && lit && (
          <motion.path
            d="M2 12 H92"
            stroke={bright}
            strokeWidth="2.4"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="14 120"
            initial={{ strokeDashoffset: 14 }}
            animate={{ strokeDashoffset: [14, -120] }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.6 }}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <ArrowRight
        size={16}
        strokeWidth={2.4}
        className={cn(
          "absolute right-0 transition-colors duration-500",
          lit ? "text-sky-500" : "text-ink-400/40",
        )}
        style={lit ? { color: bright } : undefined}
      />
    </div>
  );
}
