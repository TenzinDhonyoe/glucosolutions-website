import { Sparkles, SquarePen, ShieldCheck } from "lucide-react";
import { Avatar, GlucoseChart } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * DashboardMock — a faithful, presentational recreation of the real
 * GlucoSolutions clinician dashboard (the `gluco-pro` client-detail view),
 * rebuilt from its own design tokens so it renders crisp and responsive rather
 * than as a screenshot. Real layout, real labels, real palette.
 *
 * `highlight` drives the "How it works" spotlight tour: pass a region index
 * (0 = logged data, 1 = sourced interpretation, 2 = outcomes) and every other
 * region dims so the active part reads as the focus. Omit it to show the whole
 * dashboard at rest.
 */

const REGION = {
  data: 0,
  insight: 1,
  outcomes: 2,
} as const;

function Region({
  index,
  highlight,
  label,
  children,
  className,
  dimClassName = "opacity-40 blur-[1px] saturate-[0.85]",
}: {
  index: number;
  highlight?: number;
  label?: string;
  children: React.ReactNode;
  className?: string;
  dimClassName?: string;
}) {
  const dimmed = highlight !== undefined && highlight !== index;
  const active = highlight === index;
  return (
    <div
      className={cn(
        "relative transition-all duration-500 ease-out",
        dimmed ? dimClassName : "opacity-100",
        active && "z-10",
        className,
      )}
    >
      {/* spotlight ring */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-2 rounded-2xl ring-2 transition-all duration-500",
          active ? "opacity-100 ring-sky-500/55" : "opacity-0 ring-transparent",
        )}
      />
      {/* part annotation */}
      {label ? (
        <div
          className={cn(
            "pointer-events-none absolute -top-2.5 left-4 z-20 transition-all duration-500",
            active ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
          )}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-700 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-md">
            {label}
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
}

function ScoreCard() {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const pct = 0.94;
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-line bg-card-2 p-3.5">
      <div className="relative h-[64px] w-[64px]">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--color-sunken)" strokeWidth="7" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke="#3F9A63"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <span className="tnum text-[18px] font-bold text-ink-900">94</span>
        </span>
      </div>
      <div className="mono-label mt-1.5 text-center text-[9px] leading-tight">
        Metabolic score
      </div>
    </div>
  );
}

function StatTile({
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
  fill: number;
}) {
  const ink = tone === "good" ? "text-good" : "text-ink-900";
  const bar = tone === "good" ? "bg-good" : "bg-sky-600";
  return (
    <div className="flex flex-col rounded-lg border border-line bg-card-2 p-3.5">
      <div className="mono-label text-[9.5px] leading-tight">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={cn("tnum text-[22px] font-bold leading-none", ink)}>{value}</span>
        {unit ? <span className="tnum text-[11px] text-ink-400">{unit}</span> : null}
      </div>
      <div className="mt-auto pt-3">
        <div className="h-[5px] w-full overflow-hidden rounded-full bg-sunken">
          <div className={cn("h-full rounded-full", bar)} style={{ width: `${fill}%` }} />
        </div>
      </div>
    </div>
  );
}

export function DashboardMock({
  highlight,
  className,
}: {
  highlight?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card p-4 shadow-lg",
        className,
      )}
    >
      {/* masthead */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar initials="ER" tone="sky" size={44} />
          <div>
            <div className="mono-label text-sky-700">Prediabetes reversal</div>
            <div className="font-serif text-[20px] leading-tight text-ink-900">
              Elena Rodriguez
            </div>
            <div className="mt-1 flex items-center gap-2 text-[12px] text-ink-500">
              <span className="tnum">GS-4821</span>
              <span className="text-line-2">·</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-good" /> Active
              </span>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="inline-flex items-center gap-1.5 rounded-[10px] border border-line-2 bg-card px-3 py-2 text-[12px] font-semibold text-ink-700">
            <Sparkles size={14} aria-hidden /> AI briefing
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-sky-700 px-3.5 py-2 text-[12px] font-semibold text-white">
            <SquarePen size={14} aria-hidden /> Edit care plan
          </span>
        </div>
      </div>

      <div className="mt-3.5 space-y-3">
        {/* region 0 — logged data */}
        <Region index={REGION.data} highlight={highlight} label="Logged in Redu">
          <GlucoseChart
            className="border-line bg-card-2 p-4 shadow-none"
            title="Elena · glucose + meals · today"
            mealIdx={[3, 7, 10]}
            height={150}
          />
        </Region>

        {/* region 1 — sourced interpretation */}
        {/* the near-black card can't dim like the light regions — at 40% it
            reads as a broken gray slab with half-legible text, so ghost it */}
        <Region
          index={REGION.insight}
          highlight={highlight}
          label="Sourced insight"
          dimClassName="opacity-[0.18] blur-[1px]"
        >
          <div className="rounded-lg bg-ink-900 p-5 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-sky-500">
              <Sparkles size={13} aria-hidden /> Interpretation · this week
            </div>
            <p className="mt-2.5 font-serif text-[17px] leading-snug text-page text-pretty">
              Elena&apos;s afternoons run higher on the days she skips her morning walk.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {[
                ["Source", "14 days CGM + step logs"],
                ["Computation", "138 vs 116 mg/dL"],
              ].map(([k, v]) => (
                <span
                  key={k}
                  className="inline-flex items-center gap-1.5 rounded-md bg-page/10 px-2.5 py-1.5 text-[12px] text-page/85"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-page/55">
                    {k}
                  </span>
                  <span className="tnum">{v}</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-md bg-good/20 px-2.5 py-1.5 text-[12px] font-semibold text-good">
                <ShieldCheck size={12} aria-hidden /> Traceable
              </span>
            </div>
          </div>
        </Region>

        {/* region 2 — pre-session outcomes */}
        <Region index={REGION.outcomes} highlight={highlight} label="Pre-session outcomes">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ScoreCard />
            <StatTile label="Fibre intake" value="27" unit="g/day" tone="good" fill={72} />
            <StatTile label="Sleep" value="7.2" unit="h/night" tone="good" fill={80} />
            <StatTile label="Daily steps" value="8,924" unit="/day" fill={76} />
          </div>
        </Region>
      </div>
    </div>
  );
}
