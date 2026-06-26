import { cn } from "@/lib/utils";

/**
 * Numbered editorial eyebrow — "01 — How it works".
 * Geist Mono, tracked, uppercase, sky-700 (matches the DS section labels).
 */
export function Eyebrow({
  children,
  number,
  className,
}: {
  children: React.ReactNode;
  number?: string;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow", className)}>
      {number ? <span className="text-ink-400">{number} — </span> : null}
      {children}
    </p>
  );
}
