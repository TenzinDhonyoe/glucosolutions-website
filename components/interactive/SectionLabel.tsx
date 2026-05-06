import { cn } from "@/lib/utils";

type Props = {
  index: number;
  label: string;
  className?: string;
};

/**
 * ALL CAPS section eyebrow with index numeral. Per DESIGN.md, eyebrows are
 * Suisse Medium, 11–12px, 0.12em tracking, fg-mute or charcoal.
 */
export function SectionLabel({ index, label, className }: Props) {
  return (
    <div className={cn("flex items-baseline gap-3 eyebrow text-charcoal", className)}>
      <span className="text-sage tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
      <span className="h-px w-8 bg-stone" />
      <span>{label}</span>
    </div>
  );
}
