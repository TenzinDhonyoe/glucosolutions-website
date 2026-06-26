"use client";

import { cn } from "@/lib/utils";

/**
 * Toggle — the DS switch. Controlled; green when on, line-2 track when off.
 */
export function Toggle({
  checked,
  onChange,
  label,
  className,
  id,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  className?: string;
  id?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-[27px] w-[46px] shrink-0 rounded-full transition-colors duration-200",
        checked ? "bg-green-600" : "bg-line-2",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-[3px] h-[21px] w-[21px] rounded-full bg-white shadow-sm transition-[left] duration-200",
          checked ? "left-[22px]" : "left-[3px]",
        )}
      />
    </button>
  );
}
