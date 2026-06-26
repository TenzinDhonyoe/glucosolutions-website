import { cn } from "@/lib/utils";
import { Card } from "./Card";
import type { IconType } from "./types";

/**
 * StatCard — a single clinical metric: mono value + unit, an optional delta
 * chip, and a footnote. The numerals are tabular so columns of figures align.
 */
export function StatCard({
  label,
  value,
  unit,
  delta,
  deltaDirection = "down",
  footnote,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "flat";
  footnote?: React.ReactNode;
  icon?: IconType;
  className?: string;
}) {
  // For glucose, "down" is generally the improvement → green.
  const good = deltaDirection !== "up";
  return (
    <Card className={cn("p-6", className)}>
      <div className="mono-label mb-4 flex items-center gap-2">
        {Icon ? <Icon size={13} aria-hidden /> : null}
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="tnum text-[42px] font-medium leading-none text-ink-900">{value}</span>
        {unit ? <span className="tnum text-sm text-ink-500">{unit}</span> : null}
      </div>
      {delta ? (
        <div
          className={cn(
            "mt-3.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-semibold",
            good ? "bg-green-100 text-green-600" : "bg-warn-bg text-warn",
          )}
        >
          <span aria-hidden>{deltaDirection === "up" ? "↗" : deltaDirection === "down" ? "↘" : "→"}</span>
          {delta}
        </div>
      ) : null}
      {footnote ? <div className="mt-4 text-[13px] text-ink-500">{footnote}</div> : null}
    </Card>
  );
}
