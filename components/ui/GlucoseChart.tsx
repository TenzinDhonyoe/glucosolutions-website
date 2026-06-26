import { cn } from "@/lib/utils";

const W = 680;
const PAD_TOP = 10;
const PAD_BOTTOM = 30;

// A believable continuous-glucose day (mg/dL): stable overnight, post-meal rises.
const DEFAULT_VALUES = [96, 92, 95, 128, 116, 100, 105, 142, 120, 102, 99, 110];
const DEFAULT_TICKS = ["12a", "4a", "8a", "12p", "4p", "8p", "now"];

/**
 * GlucoseChart — the DS data-viz panel: a target band (70–140), a smooth
 * glucose line with a soft area fill, and a marker on the day's peak. Purely
 * presentational; pass `values` (mg/dL) to drive it.
 */
export function GlucoseChart({
  values = DEFAULT_VALUES,
  ticks = DEFAULT_TICKS,
  low = 70,
  high = 140,
  yMin = 50,
  yMax = 170,
  title = "Today · continuous glucose",
  mealIdx,
  height = 220,
  className,
}: {
  values?: number[];
  ticks?: string[];
  low?: number;
  high?: number;
  yMin?: number;
  yMax?: number;
  title?: string;
  /** Indices into `values` to mark as meals (white dot ringed in amber, like the real dashboard). */
  mealIdx?: number[];
  /** SVG viewBox height — lower it for a flatter, more compact chart. */
  height?: number;
  className?: string;
}) {
  const H = height;
  const plotH = H - PAD_TOP - PAD_BOTTOM;
  const y = (v: number) => {
    const clamped = Math.max(yMin, Math.min(yMax, v));
    return PAD_TOP + ((yMax - clamped) / (yMax - yMin)) * plotH;
  };
  const x = (i: number) => (values.length === 1 ? 0 : (i / (values.length - 1)) * W);

  const linePts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
  const linePath = `M${linePts.join(" L")}`;
  const areaPath = `M${linePts.join(" L")} L${W},${H - PAD_BOTTOM} L0,${H - PAD_BOTTOM} Z`;

  const peakIdx = values.indexOf(Math.max(...values));
  const bandTop = y(high);
  const bandBottom = y(low);

  return (
    <div className={cn("rounded-lg border border-line bg-card p-7 shadow-sm", className)}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <h3 className="font-serif text-xl text-ink-900">{title}</h3>
        <div className="hidden gap-4 text-xs text-ink-500 sm:flex">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-[3px] w-3.5 rounded-sm bg-sky-700" />
            Glucose
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-good bg-good-bg" />
            Target {low}–{high}
          </span>
          {mealIdx?.length ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[#E0A53A] bg-card" />
              Meals
            </span>
          ) : null}
        </div>
      </div>

      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block overflow-visible"
        role="img"
        aria-label={`Glucose trend, target range ${low} to ${high} mg/dL`}
      >
        <defs>
          <linearGradient id="gluc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1690C2" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1690C2" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y={bandTop} width={W} height={bandBottom - bandTop} fill="#E2F0E7" opacity="0.7" />
        <line x1="0" y1={bandTop} x2={W} y2={bandTop} stroke="#3F9A63" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <line x1="0" y1={bandBottom} x2={W} y2={bandBottom} stroke="#3F9A63" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        <path d={areaPath} fill="url(#gluc-fill)" />
        <path d={linePath} fill="none" stroke="#1690C2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {mealIdx?.length ? (
          mealIdx.map((i) =>
            i >= 0 && i < values.length ? (
              <circle
                key={i}
                cx={x(i)}
                cy={y(values[i])}
                r="5.5"
                fill="#fff"
                stroke="#E0A53A"
                strokeWidth="2.5"
              />
            ) : null,
          )
        ) : peakIdx >= 0 ? (
          <circle cx={x(peakIdx)} cy={y(values[peakIdx])} r="5" fill="#fff" stroke="#C98A2E" strokeWidth="2.5" />
        ) : null}
      </svg>

      <div className="mt-2.5 flex justify-between font-mono text-[10.5px] text-ink-400">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
