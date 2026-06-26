import { GlucoseChart } from "@/components/ui/GlucoseChart";
import { RingStat } from "@/components/ui/RingStat";
import { StatusPill, FeatureStatus } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";

const CASELOAD = [
  { initials: "ME", name: "Maya Ellison", meta: "Type 2 · week 6", state: "good" as const, label: "On track", tone: "sky" as const },
  { initials: "JR", name: "Jordan Reyes", meta: "Prediabetes · week 2", state: "warn" as const, label: "Review", tone: "green" as const },
  { initials: "SK", name: "Sam Khan", meta: "Type 1 · week 11", state: "high" as const, label: "Alert", tone: "low" as const },
];

/**
 * HeroDashboard — a real RD-dashboard composite built from DS primitives (not a
 * screenshot). Stands in as the hero's product visual and doubles as a live
 * demo of the component system.
 */
export function HeroDashboard() {
  return (
    <div className="rounded-xl border border-line bg-card p-5 shadow-lg sm:p-6">
      {/* header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials="ME" tone="sky" size={38} />
          <div>
            <div className="text-sm font-semibold text-ink-900">Maya Ellison</div>
            <div className="text-[12px] text-ink-500">Type 2 · week 6</div>
          </div>
        </div>
        <StatusPill state="good" live>
          In range
        </StatusPill>
      </div>

      <GlucoseChart className="border-0 p-0 shadow-none" title="Today · continuous glucose" />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-card-2 p-4">
          <div className="mono-label mb-3">Time in range</div>
          <RingStat
            size={84}
            centerValue="78%"
            segments={[
              { label: "In range", value: 78, state: "good" },
              { label: "Elevated", value: 16, state: "warn" },
              { label: "Low", value: 6, state: "low" },
            ]}
          />
        </div>
        <div className="rounded-lg border border-line bg-card-2 p-4">
          <div className="mono-label mb-3">Caseload — today</div>
          <ul className="space-y-2.5">
            {CASELOAD.map((p) => (
              <li key={p.initials} className="flex items-center gap-2.5">
                <Avatar initials={p.initials} tone={p.tone} size={28} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-ink-900">{p.name}</div>
                </div>
                <StatusPill state={p.state} dot={false} className="px-2 py-0.5 text-[11px]">
                  {p.label}
                </StatusPill>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-sunken px-4 py-2.5">
        <span className="text-[13px] text-ink-700">Outcomes report</span>
        <FeatureStatus status="in-development" />
      </div>
    </div>
  );
}
