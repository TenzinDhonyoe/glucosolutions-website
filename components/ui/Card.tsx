import { cn } from "@/lib/utils";

type Shadow = "none" | "sm" | "md" | "lg";
type Radius = "md" | "lg" | "xl";

const SHADOWS: Record<Shadow, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const RADII: Record<Radius, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

/**
 * Card — the system's resting surface: white (or warm) panel, hairline border,
 * soft warm shadow. `lift` adds the gentle hover-raise used sparingly on
 * interactive cards.
 */
export function Card({
  children,
  className,
  warm = false,
  border = true,
  shadow = "sm",
  radius = "lg",
  lift = false,
}: {
  children: React.ReactNode;
  className?: string;
  warm?: boolean;
  border?: boolean;
  shadow?: Shadow;
  radius?: Radius;
  lift?: boolean;
}) {
  return (
    <div
      className={cn(
        warm ? "bg-card-2" : "bg-card",
        border && "border border-line",
        RADII[radius],
        SHADOWS[shadow],
        lift && "lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
