"use client";

import { cn } from "@/lib/utils";

/** Underline tabs — active tab gets ink-900 text + sky-700 underline. */
export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: string[];
  value: string;
  onChange: (next: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 border-b border-line", className)}>
      {tabs.map((t) => {
        const active = t === value;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={cn(
              "-mb-px border-b-2 px-3.5 py-2.5 text-[14.5px] font-semibold transition-colors",
              active
                ? "border-sky-700 text-ink-900"
                : "border-transparent text-ink-500 hover:text-ink-700",
            )}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/** Segmented control — pill track with a raised active segment. */
export function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: {
  options: string[];
  value: string;
  onChange: (next: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex rounded-full bg-sunken p-1", className)}>
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full px-[18px] py-[7px] text-[13.5px] font-semibold transition-all",
              active ? "bg-card text-ink-900 shadow-sm" : "bg-transparent text-ink-500",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
