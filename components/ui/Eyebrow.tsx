import { cn } from "@/lib/utils";

/**
 * Editorial eyebrow — Geist Mono, tracked, uppercase, sky-700.
 * Three interchangeable lead-ins, all in the DS label voice:
 *   • `number="02"`  → "02 — How it works"  (numbered section index)
 *   • `slash`        → "~ How it works"      (editorial tilde lead-in)
 *   • neither        → "How it works"
 */
export function Eyebrow({
  children,
  number,
  slash = false,
  className,
}: {
  children: React.ReactNode;
  number?: string;
  slash?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow inline-flex items-center", className)}>
      {number ? <span className="text-ink-400">{number} · </span> : null}
      {slash ? <span className="mr-2 text-ink-400">~</span> : null}
      {children}
    </p>
  );
}
