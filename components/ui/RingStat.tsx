import { cn } from "@/lib/utils";
import type { GlucoseState } from "./types";

const STROKE: Record<GlucoseState, string> = {
  good: "#3F9A63",
  warn: "#C98A2E",
  high: "#C2402B",
  low: "#4E72A8",
  info: "#5E6B7A",
};

const DOT: Record<GlucoseState, string> = {
  good: "text-good",
  warn: "text-warn",
  high: "text-high",
  low: "text-low",
  info: "text-info",
};

type Segment = { label: string; value: number; state: GlucoseState };

/**
 * RingStat — the time-in-range donut. Segments are drawn as stacked arcs in
 * their glucose-semantic colors over a sunken track, with a mono value in the
 * middle and a legend alongside.
 */
export function RingStat({
  segments,
  centerValue,
  size = 96,
  className,
}: {
  segments: Segment[];
  centerValue: string;
  size?: number;
  className?: string;
}) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  let offset = 0;
  const arcs = segments.map((s) => {
    const len = (s.value / total) * c;
    const arc = {
      dash: `${len} ${c - len}`,
      dashoffset: -offset,
      color: STROKE[s.state],
    };
    offset += len;
    return arc;
  });

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 96 96"
          role="img"
          aria-label={segments.map((s) => `${s.label} ${s.value}%`).join(", ")}
        >
          <circle cx="48" cy="48" r={r} fill="none" stroke="#EFEAE0" strokeWidth="10" />
          {arcs.map((a, i) => (
            <circle
              key={i}
              cx="48"
              cy="48"
              r={r}
              fill="none"
              stroke={a.color}
              strokeWidth="10"
              strokeLinecap="butt"
              strokeDasharray={a.dash}
              strokeDashoffset={a.dashoffset}
              transform="rotate(-90 48 48)"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="tnum text-2xl font-medium leading-none text-ink-900">
            {centerValue}
          </span>
        </div>
      </div>
      <ul className="space-y-1 text-[13px] text-ink-500">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className={cn("text-base leading-none", DOT[s.state])} aria-hidden>
              ●
            </span>
            <span>
              {s.label} · <span className="tnum text-ink-700">{s.value}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
