import { cn } from "@/lib/utils";

/**
 * The white studio backdrop from the hero: bright in the middle, falling off
 * to the page colour at the edges so a stage section blends into the page
 * around it with no seam.
 */
export const STAGE_BACKGROUND =
  "radial-gradient(ellipse 80% 70% at 50% 42%, var(--stage-center) 0%, var(--stage-mid) 55%, var(--color-page) 100%)";

/**
 * Static twin of the hero's floor: a perspective grid converging on a
 * horizon, fading out as it recedes. `horizon` is where the floor meets the
 * backdrop, as a fraction of the stage height.
 */
export function FloorGrid({ horizon = 0.68, className }: { horizon?: number; className?: string }) {
  const H = 400;
  const top = H * horizon;
  const depth = H - top;
  const rows = Array.from({ length: 16 }, (_, j) => top + depth / (1 + (j + 1) * 0.55));
  const rays = Array.from({ length: 37 }, (_, k) => k - 18);
  return (
    <svg
      aria-hidden
      viewBox={`0 0 1000 ${H}`}
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <linearGradient id="floor-fade" x1="0" x2="0" y1={top} y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--color-ink-900)" }} stopOpacity="0" />
          <stop offset="0.45" style={{ stopColor: "var(--color-ink-900)" }} stopOpacity="0.05" />
          <stop offset="1" style={{ stopColor: "var(--color-ink-900)" }} stopOpacity="0.09" />
        </linearGradient>
      </defs>
      <g stroke="url(#floor-fade)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none">
        {rows.map((y) => (
          <line key={y} x1="0" x2="1000" y1={y} y2={y} vectorEffect="non-scaling-stroke" />
        ))}
        {rays.map((k) => (
          <line key={k} x1="500" y1={top} x2={500 + k * 160} y2={H} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}

/** Soft elliptical contact shadow for an object resting on the floor. */
export function ContactShadow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-[50%]", className)}
      style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.14), rgba(0,0,0,0))" }}
    />
  );
}
