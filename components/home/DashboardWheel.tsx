"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { MessageSquareText, ClipboardList } from "lucide-react";
import { GlucoseChart } from "@/components/ui/GlucoseChart";
import { cn } from "@/lib/utils";

/**
 * DashboardWheel — a dial that bleeds off the right edge to fill the empty side
 * space. Real dashboard panels orbit the rim; the wheel turns as the section
 * scrolls, so cards travel down through the visible left arc. Geometry is sized
 * in PERCENT of a square that fills the band's height, so the whole wheel always
 * fits vertically (no top/bottom clipping) at any viewport size. Cards stay
 * upright and fade toward the back. Frozen under reduced motion.
 */

const R = 38; // orbit radius, percent of the wheel square
const CARD_W = 224;

function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

function WheelCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-card p-3.5 shadow-[0_10px_30px_-18px_rgba(43,38,32,0.4)]",
        className,
      )}
      style={{ width: CARD_W }}
    >
      {children}
    </div>
  );
}

function GlucoseCard() {
  return (
    <WheelCard>
      <div className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-400">
        Glucose · today
      </div>
      <GlucoseChart
        title=""
        height={88}
        mealIdx={[3, 7]}
        legend={false}
        className="border-0 bg-transparent p-0 shadow-none [&_h3]:hidden"
      />
    </WheelCard>
  );
}

function ScoreCard() {
  return (
    <WheelCard className="flex items-center gap-3.5">
      <span
        className="grid h-13 w-13 shrink-0 place-items-center rounded-full text-[17px] font-semibold text-white"
        style={{ background: "var(--brand-gradient)", height: 52, width: 52 }}
      >
        94
      </span>
      <div>
        <div className="font-serif text-[15px] text-ink-900">On track</div>
        <div className="text-[12px] text-ink-500">Time in range, up 6% this week.</div>
      </div>
    </WheelCard>
  );
}

function MessageCard() {
  return (
    <WheelCard>
      <div className="mb-2 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-400">
        <MessageSquareText size={12} aria-hidden /> In-app note
      </div>
      <p className="text-[12.5px] leading-snug text-ink-700">
        Nice work pairing carbs with protein at lunch. That flattened your
        afternoon.
      </p>
    </WheelCard>
  );
}

function StatsCard() {
  return (
    <WheelCard>
      <div className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-400">
        This week
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: "Steps", v: "8,924" },
          { k: "Sleep", v: "7.2h" },
          { k: "Fibre", v: "27g" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-line bg-page/60 px-2 py-1.5">
            <div className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-ink-400">
              {s.k}
            </div>
            <div className="tnum mt-0.5 text-[13px] font-medium text-ink-900">{s.v}</div>
          </div>
        ))}
      </div>
    </WheelCard>
  );
}

function SummaryCard() {
  return (
    <WheelCard>
      <div className="mb-2 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-400">
        <ClipboardList size={12} aria-hidden /> Pre-session
      </div>
      <ul className="space-y-1.5 text-[12px] text-ink-700">
        {["Steadier on weekdays", "Logged 6 of 7 days", "Two post-dinner spikes"].map((t) => (
          <li key={t} className="flex gap-2">
            <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-sky-600" />
            {t}
          </li>
        ))}
      </ul>
    </WheelCard>
  );
}

function AdherenceCard() {
  return (
    <WheelCard>
      <div className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-400">
        Logging streak
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="tnum font-serif text-[22px] text-ink-900">6</span>
        <span className="text-[12px] text-ink-500">of 7 days</span>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {[1, 1, 1, 0, 1, 1, 1].map((on, i) => (
          <span
            key={i}
            className={cn("h-1.5 flex-1 rounded-full", on ? "bg-sky-600" : "bg-line-2")}
          />
        ))}
      </div>
    </WheelCard>
  );
}

const PANELS = [
  { angle: 178, node: <GlucoseCard /> },
  { angle: 130, node: <ScoreCard /> },
  { angle: 90, node: <StatsCard /> },
  { angle: 226, node: <MessageCard /> },
  { angle: 270, node: <SummaryCard /> },
  { angle: 314, node: <AdherenceCard /> },
];

function OrbitPanel({
  rotation,
  angle,
  children,
}: {
  rotation: MotionValue<number>;
  angle: number;
  children: ReactNode;
}) {
  const left = useTransform(rotation, (r) => `${50 + Math.cos(rad(angle + r)) * R}%`);
  const top = useTransform(rotation, (r) => `${50 + Math.sin(rad(angle + r)) * R}%`);
  // visible on the left arc (cos < 0); fade and shrink toward the back/right.
  // Cards at the top/bottom of the orbit (cos near 0) sit on the band's clip
  // edge, so they must be close to transparent before they get cut off.
  const opacity = useTransform(rotation, (r) => {
    const c = Math.cos(rad(angle + r));
    return c < -0.35 ? 1 : c < 0.05 ? (0.05 - c) / 0.4 : 0;
  });
  const scale = useTransform(rotation, (r) => 0.92 - Math.cos(rad(angle + r)) * 0.08);

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left, top, opacity }}
    >
      <motion.div style={{ scale }}>{children}</motion.div>
    </motion.div>
  );
}

export function DashboardWheel({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-46, 70]);
  const rotation = useSpring(raw, { stiffness: 70, damping: 22, restDelta: 0.01 });

  return (
    <div ref={ref} className={cn("pointer-events-none", className)} aria-hidden>
      {/* a square sized to the band height, centred on the right edge */}
      <div className="absolute right-0 top-1/2 aspect-square h-full -translate-y-1/2 translate-x-[34%]">
        {/* concentric hairline rings */}
        {[100, 80, 58].map((d, i) => (
          <div
            key={d}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line"
            style={{ width: `${d}%`, height: `${d}%`, opacity: i === 1 ? 0.9 : 0.45 }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-600/30"
          style={{ width: "80%", height: "80%", rotate: reduce ? 0 : rotation }}
        />

        {PANELS.map((p) =>
          reduce ? (
            <div
              key={p.angle}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + Math.cos(rad(p.angle)) * R}%`,
                top: `${50 + Math.sin(rad(p.angle)) * R}%`,
              }}
            >
              {p.node}
            </div>
          ) : (
            <OrbitPanel key={p.angle} rotation={rotation} angle={p.angle}>
              {p.node}
            </OrbitPanel>
          ),
        )}
      </div>
    </div>
  );
}
