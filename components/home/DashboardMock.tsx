import { FileText, SquarePen } from "lucide-react";
import { GlucoseChart } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  C,
  mono,
  display,
  ScoreRing,
  StatTile,
  InterpretationPanel,
  SignalRow,
} from "./product-ui";

/**
 * DashboardMock — a faithful, presentational 1:1 of the real GlucoSolutions
 * clinician client-detail view, rebuilt from the product's own design tokens
 * (cool porcelain / sky) so it renders crisp and responsive rather than as a
 * screenshot. Real layout, real labels, real palette.
 *
 * `highlight` drives the "How it works" spotlight tour: pass a region index
 * (0 = logged data, 1 = sourced interpretation, 2 = outcomes) and every other
 * region dims so the active part reads as the focus. Omit it to show the whole
 * dashboard at rest.
 */

const REGION = { data: 0, insight: 1, outcomes: 2 } as const;

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
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-2 rounded-2xl ring-2 transition-all duration-500",
          active ? "opacity-100 ring-sky-500/55" : "opacity-0 ring-transparent",
        )}
      />
      {label ? (
        <div
          className={cn(
            "pointer-events-none absolute -top-2.5 left-4 z-20 transition-all duration-500",
            active ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
          )}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-md"
            style={{ ...mono, background: C.primary }}
          >
            {label}
          </span>
        </div>
      ) : null}
      {children}
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
      className={cn("rounded-2xl p-4 shadow-lg", className)}
      style={{ background: C.surface, border: `1px solid ${C.border}`, ...display }}
    >
      {/* masthead */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="grid h-11 w-11 flex-none place-items-center rounded-full text-[15px] font-bold"
            style={{ background: C.sky100, color: C.primary }}
          >
            TD
          </div>
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em]" style={{ ...mono, color: C.primary }}>
              Prediabetes Reversal
            </div>
            <div className="text-[20px] font-medium leading-tight tracking-[-0.01em]" style={{ color: C.text }}>
              Tenzin Dhonyoe
            </div>
            <div className="mt-1 flex items-center gap-2 text-[12px]" style={{ color: C.text2 }}>
              <span style={mono}>RDU-7AEF54</span>
              <span style={{ color: C.textLight }}>·</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.good }} /> Active
              </span>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span
            className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-2 text-[12px] font-semibold"
            style={{ background: C.surface, color: C.text2, border: `1px solid ${C.border}` }}
          >
            <FileText size={14} aria-hidden /> Session brief
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-[10px] px-3.5 py-2 text-[12px] font-semibold text-white"
            style={{ background: C.primary }}
          >
            <SquarePen size={14} aria-hidden /> Edit care plan
          </span>
        </div>
      </div>

      <div className="mt-3.5 space-y-3">
        {/* region 0 — logged data */}
        <Region index={REGION.data} highlight={highlight} label="Logged in Redu">
          <div className="rounded-lg p-4" style={{ background: C.raised, border: `1px solid ${C.border}` }}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12.5px] font-semibold" style={{ color: C.text }}>
                Tenzin · glucose + meals · today
              </span>
              <span className="text-[10px] uppercase tracking-[0.1em]" style={{ ...mono, color: C.textLight }}>
                14-day window
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <StatTile label="Time in range" value="78" unit="%" tone="good" fill={78} />
              <StatTile label="Avg glucose" value="112" unit="mg/dL" tone="good" />
              <StatTile label="Variability" value="24" unit="% CV" tone="good" />
            </div>
            <div className="mt-2.5">
              <GlucoseChart
                title=""
                mealIdx={[3, 7, 10]}
                height={116}
                legend={false}
                className="border-0 bg-transparent p-0 shadow-none"
              />
            </div>
          </div>
        </Region>

        {/* region 1 — sourced interpretation (the near-black panel can't dim like
            the light regions — at 40% it reads as a broken gray slab, so ghost it) */}
        <Region
          index={REGION.insight}
          highlight={highlight}
          label="Sourced insight"
          dimClassName="opacity-[0.18] blur-[1px]"
        >
          <InterpretationPanel
            meta={
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/55" style={mono}>
                data through 2026-07-15
              </span>
            }
          >
            <SignalRow
              first
              label="Post-lunch response"
              sub="last 14 days · n=11"
              value="138"
              unit="mg/dL"
              status="needs_attention"
              delta={{ was: "116", dir: "worsening" }}
            />
            <SignalRow
              label="Morning walk days"
              sub="last 14 days · n=9"
              value="+22"
              unit="mg/dL steadier"
              status="on_track"
              delta={{ was: "flat", dir: "improving" }}
            />
          </InterpretationPanel>
        </Region>

        {/* region 2 — pre-session outcomes */}
        <Region index={REGION.outcomes} highlight={highlight} label="Pre-session outcomes">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ScoreRing score={94} />
            <StatTile label="Fibre intake" value="27" unit="g/day" tone="good" fill={72} />
            <StatTile label="Sleep" value="7.2" unit="h/night" tone="good" fill={80} />
            <StatTile label="Daily steps" value="8,924" unit="/day" fill={76} />
          </div>
        </Region>
      </div>
    </div>
  );
}
