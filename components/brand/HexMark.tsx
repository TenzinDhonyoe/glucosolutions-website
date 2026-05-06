import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
  /** When true, renders a knockout (paper) variant for use over Sage/Charcoal. */
  knockout?: boolean;
};

/**
 * Two intersecting strokes inside a hexagon — the working brand mark.
 * Sage stroke crosses Seafoam stroke. Per DESIGN.md the official vector
 * lockup is missing and needs to be commissioned; this is a faithful
 * reconstruction from brand-kit-v1.png intended to ship until then.
 */
export function HexMark({ size = 28, className, knockout = false }: Props) {
  const stroke1 = knockout ? "#F6F1E6" : "#2E5A46";
  const stroke2 = knockout ? "#F6F1E6" : "#5FA7A0";
  const outline = knockout ? "rgba(246,241,230,0.55)" : "rgba(28,28,28,0.18)";

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label="Gluco Solutions"
      className={cn("shrink-0", className)}
    >
      {/* Hexagon outline */}
      <path
        d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
        fill="none"
        stroke={outline}
        strokeWidth="1.25"
      />
      {/* Sage stroke — bottom-left to top-right */}
      <path
        d="M9 22 L22 10"
        stroke={stroke1}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Seafoam stroke — top-left to bottom-right */}
      <path
        d="M10 11 L22 21"
        stroke={stroke2}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
