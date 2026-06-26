import { cn } from "@/lib/utils";

/**
 * Page container — the design system's single content measure with consistent
 * side gutters, so every page (home and subpages) lines up on the same side
 * margins. The width + gutter standard is defined once in globals.css
 * (`--container-measure` / `--container-narrow`, paired with the px-6 · md:px-10
 * gutters here). Pass `narrow` for a tighter editorial / reading column.
 */
export function Container({
  children,
  className,
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        narrow ? "max-w-narrow" : "max-w-measure",
        className,
      )}
    >
      {children}
    </div>
  );
}
