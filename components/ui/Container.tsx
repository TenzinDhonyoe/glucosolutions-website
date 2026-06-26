import { cn } from "@/lib/utils";

/**
 * Page container — the design system's 1120px editorial measure with
 * comfortable gutters. `wide` opens it up for full-bleed hero rows.
 */
export function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        wide ? "max-w-[1320px]" : "max-w-[1120px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
