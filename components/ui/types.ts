import type { ComponentType, SVGProps } from "react";

/** Shape of a lucide-react icon (and any compatible SVG icon component). */
export type IconType = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number }
>;

/** Glucose-data semantic states — the only place color carries meaning. */
export type GlucoseState = "good" | "warn" | "high" | "low" | "info";
