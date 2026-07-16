import { ArrowUp, Sparkles } from "lucide-react";

/* =============================================================================
   product-ui — shared, presentational primitives that render the real
   GlucoSolutions clinician UI in its own cool-porcelain / sky palette
   (design-tokens.ts), pinned as literals so the marketing site's warm cream
   theme can't leak in. Used by every product depiction on the home page
   (Showcase, HowItWorks, Capabilities) so they read as ONE product.
   ========================================================================== */

export const C = {
  canvas: "#F3F5F8",
  surface: "#FFFFFF",
  raised: "#F7F9FB",
  sunk: "#ECEFF4",
  border: "#E4E8EE",
  borderLight: "#ECEFF3",
  text: "#1B1F26",
  text2: "#49515C",
  textLight: "#9CA4B2",
  primary: "#127399",
  sky100: "#DCF0F8",
  sky500: "#2BB0DC",
  sky600: "#1690C2",
  good: "#3F9A63",
  goodInk: "#2E7D50",
  bad: "#C2402B",
  badInk: "#A1331F",
  watch: "#C98A2E",
  watchInk: "#8A5A14",
} as const;

export const mono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" } as const;
export const display = { fontFamily: "var(--font-nunito-sans), ui-sans-serif, system-ui, sans-serif" } as const;

/* ---- Metabolic score ring --------------------------------------------- */
export function ScoreRing({
  score = 94,
  size = 64,
  stroke = 7,
  label = "Metabolic score",
}: {
  score?: number;
  size?: number;
  stroke?: number;
  label?: string;
}) {
  const r = size / 2 - stroke;
  const circ = 2 * Math.PI * r;
  const fill = score >= 80 ? C.good : score >= 60 ? C.watch : C.bad;
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[10px] p-3.5"
      style={{ background: C.raised, border: `1px solid ${C.border}` }}
    >
      <div className="relative" style={{ height: size, width: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.sunk} strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={fill}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - score / 100)}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <span className="text-[18px] font-bold" style={{ ...mono, color: C.text }}>
            {score}
          </span>
        </span>
      </div>
      {label ? (
        <div
          className="mt-1.5 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.1em]"
          style={{ ...mono, color: C.text2 }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}

/* ---- Stat tile — eyebrow + big mono value + optional proportion bar ----- */
export function StatTile({
  label,
  value,
  unit,
  tone = "neutral",
  fill,
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "good" | "neutral";
  fill?: number;
}) {
  const ink = tone === "good" ? C.goodInk : C.text;
  const bar = tone === "good" ? C.good : C.sky600;
  return (
    <div
      className="flex flex-col rounded-[10px] p-3.5"
      style={{ background: C.raised, border: `1px solid ${C.border}` }}
    >
      <div className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.1em]" style={{ ...mono, color: C.text2 }}>
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-[22px] font-bold leading-none" style={{ ...mono, color: ink }}>
          {value}
        </span>
        {unit ? <span className="text-[11px]" style={{ ...mono, color: C.textLight }}>{unit}</span> : null}
      </div>
      {fill !== undefined ? (
        <div className="mt-auto pt-3">
          <div className="h-[5px] w-full overflow-hidden rounded-full" style={{ background: C.sunk }}>
            <div className="h-full rounded-full" style={{ width: `${fill}%`, background: bar }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---- Data Interpretation — the dark AI read panel ---------------------- */
export function InterpretationPanel({
  meta,
  children,
  className,
}: {
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label="Data Interpretation"
      className={`relative overflow-hidden rounded-[16px] p-5 text-white shadow-lg ${className ?? ""}`}
      style={{
        border: "1px solid rgba(43,176,220,0.20)",
        background:
          "radial-gradient(130% 150% at 0% 0%, rgba(43,176,220,0.12), rgba(43,176,220,0) 45%), linear-gradient(155deg, #141821 0%, #10131A 58%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(43,176,220,0) 2%, rgba(43,176,220,0.35) 18%, rgba(78,154,107,0.25) 55%, rgba(255,255,255,0) 95%)",
        }}
      />
      <div className="relative">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[-0.01em]">
            <Sparkles size={16} strokeWidth={2.2} className="self-center" style={{ color: C.sky500 }} />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${C.sky500}, ${C.good})` }}
            >
              Data Interpretation
            </span>
          </span>
          {meta}
        </div>
        {children}
      </div>
    </section>
  );
}

const STATUS = {
  needs_attention: { dot: C.bad, ink: "#F0847A", label: "Needs attention" },
  on_track: { dot: C.good, ink: "#7FD3A0", label: "On track" },
} as const;

export function DeltaChip({ was, dir }: { was: string; dir: "worsening" | "improving" }) {
  const tone =
    dir === "worsening"
      ? { bg: "rgba(194,64,43,0.12)", fg: "#F0847A" }
      : { bg: "rgba(63,154,99,0.14)", fg: "#7FD3A0" };
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-[3px] text-[11px] font-medium whitespace-nowrap"
      style={{ ...mono, background: tone.bg, color: tone.fg }}
    >
      <ArrowUp size={11} strokeWidth={2.4} className={dir === "worsening" ? "-scale-y-100" : undefined} />
      was {was}
      <span className="opacity-70">· {dir}</span>
    </span>
  );
}

export function SignalRow({
  label,
  sub,
  value,
  unit,
  delta,
  status = "needs_attention",
  first,
}: {
  label: string;
  sub: string;
  value: string;
  unit: string;
  delta?: { was: string; dir: "worsening" | "improving" };
  status?: keyof typeof STATUS;
  first?: boolean;
}) {
  const s = STATUS[status];
  return (
    <div
      className="flex items-start gap-3 py-3.5"
      style={{ borderTop: first ? undefined : "1px solid rgba(255,255,255,0.07)" }}
    >
      <span className="mt-[6px] h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: s.dot }} />
      <div className="flex min-w-0 flex-1 flex-col gap-y-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2.5">
            <span className="text-[13.5px] font-medium leading-tight text-white/90">{label}</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ ...mono, color: s.ink }}>
              {s.label}
            </span>
          </div>
          <span className="mt-1 block text-[10px] leading-tight text-white/45" style={mono}>
            {sub}
          </span>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-2.5 gap-y-1.5 sm:justify-end">
          <span className="whitespace-nowrap text-[20px] font-semibold leading-none text-white" style={mono}>
            {value}
            <span className="ml-1 text-[12px] font-medium text-white/60">{unit}</span>
          </span>
          {delta ? <DeltaChip was={delta.was} dir={delta.dir} /> : null}
        </div>
      </div>
    </div>
  );
}

/* ---- Logging-consistency heatmap --------------------------------------- */
// A fixed demo fixture: quiet start, dense adherence in Mar and Jun, tapering to
// the current week (last cols upcoming/faint). Levels 0–3 map to the sky scale;
// "f" = an upcoming day.
const WEEKS = [
  "0000000", "0000000", "0000000", "0010000",
  "0000000", "0100000", "0022100", "0233210",
  "2333320", "3333330", "3323330", "2333320",
  "0122100", "0000000", "0010000", "0000000",
  "0000100", "0000000", "0011000", "0122100",
  "2333320", "3333330", "3333230", "2333320",
  "0122100", "0011000", "00fffff", "fffffff",
];
const MONTHS: Record<number, string> = { 0: "JAN", 5: "FEB", 6: "MAR", 13: "APR", 16: "MAY", 19: "JUN", 24: "JUL" };
const CELL: Record<string, string> = {
  "0": C.sunk,
  "1": "rgba(43,176,220,0.30)",
  "2": "rgba(22,144,194,0.60)",
  "3": C.primary,
};
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

export function LoggingHeatmap({ cell = 13, gap = 3, weeks = WEEKS }: { cell?: number; gap?: number; weeks?: string[] }) {
  return (
    <div>
      <div className="mb-1 flex" style={{ paddingLeft: 28 }}>
        {weeks.map((_, col) => (
          <div
            key={col}
            className="text-[10px] font-semibold uppercase tracking-wide"
            style={{ width: cell + gap, flexShrink: 0, color: C.text2 }}
          >
            {MONTHS[col] ?? ""}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="flex flex-col justify-between" style={{ width: 28, height: 7 * (cell + gap) - gap }}>
          {DAY_LABELS.map((l, i) => (
            <div key={i} className="flex items-center text-[10px] font-medium" style={{ height: cell, color: C.text2 }}>
              {l}
            </div>
          ))}
        </div>
        <div className="flex" style={{ gap }}>
          {weeks.map((week, col) => (
            <div key={col} className="flex flex-col" style={{ gap }}>
              {week.split("").map((lvl, row) => {
                const future = lvl === "f";
                const pad = lvl === ".";
                return (
                  <div
                    key={row}
                    className="rounded-[3px]"
                    style={{
                      width: cell,
                      height: cell,
                      background: pad ? "transparent" : future ? "rgba(27,38,56,0.04)" : CELL[lvl],
                      boxShadow: future ? "inset 0 0 0 1px rgba(27,38,56,0.06)" : undefined,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] font-medium" style={{ color: C.text2 }}>
        <span>One cell per day, since the first log</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {["0", "1", "2", "3"].map((l) => (
            <div key={l} className="h-3 w-3 rounded-[3px]" style={{ background: CELL[l] }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
