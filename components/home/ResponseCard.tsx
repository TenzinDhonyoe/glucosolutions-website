import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * A single meal, as the app would show it: what you ate, the shape of the
 * response, and one thing that helped. The line is gold while glucose is
 * rising and turns leaf green as it settles back to steady.
 *
 * With `animate`, the curve draws on load and each label appears as the line
 * reaches it. This is the page's one orchestrated motion moment.
 */
export function ResponseCard({
  animate = false,
  note,
  className,
}: {
  animate?: boolean;
  note?: string;
  className?: string;
}) {
  const id = useId();
  const at = (delay: number) =>
    animate ? { className: "fade-at", style: { animationDelay: `${delay}s` } } : {};

  return (
    <figure
      className={cn(
        "w-[min(100%,21rem)] rounded-[22px] bg-pine/60 p-5 text-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/15 backdrop-blur-xl",
        animate && "card-in",
        className
      )}
    >
      <div className="flex items-baseline justify-between gap-4 text-[13px] text-white/65">
        <span>Breakfast</span>
        <span className="tnum">8:10 am</span>
      </div>
      <p className="mt-1 text-[17px] font-semibold leading-snug">Oatmeal with berries</p>

      <svg viewBox="0 0 280 104" className="mt-4 block h-auto w-full overflow-visible" role="img" aria-label="Glucose rose for about 40 minutes after breakfast, then settled back to steady.">
        <defs>
          <linearGradient id={`${id}-stroke`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#f5a623" />
            <stop offset="0.42" stopColor="#f5a623" />
            <stop offset="0.7" stopColor="#1dc37e" />
            <stop offset="1" stopColor="#1dc37e" />
          </linearGradient>
          <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f5a623" stopOpacity="0.22" />
            <stop offset="1" stopColor="#f5a623" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* steady band */}
        <rect x="0" y="66" width="280" height="16" rx="8" fill="white" fillOpacity="0.07" />
        <path
          d="M0 74 C 34 74 48 72 62 54 S 88 18 104 18 S 146 42 170 62 S 212 74 280 74 L 280 104 L 0 104 Z"
          fill={`url(#${id}-fill)`}
          {...at(1.2)}
        />
        <path
          d="M0 74 C 34 74 48 72 62 54 S 88 18 104 18 S 146 42 170 62 S 212 74 280 74"
          pathLength={1}
          fill="none"
          stroke={`url(#${id}-stroke)`}
          strokeWidth="3"
          strokeLinecap="round"
          className={animate ? "draw-curve" : undefined}
        />

        <g {...at(1.15)}>
          <circle cx="104" cy="18" r="4.5" fill="#f5a623" />
          <text x="114" y="14" fill="white" fillOpacity="0.9" fontSize="12.5" fontWeight="600">
            Rising
          </text>
        </g>
        <g {...at(2.35)}>
          <circle cx="212" cy="73" r="4.5" fill="#1dc37e" />
          <text x="212" y="98" fill="white" fillOpacity="0.9" fontSize="12.5" fontWeight="600" textAnchor="middle">
            Back to steady
          </text>
        </g>
      </svg>

      <figcaption
        className={cn(
          "mt-4 border-t border-white/12 pt-4 text-[14.5px] leading-snug text-white/80",
          animate && "fade-at"
        )}
        style={animate ? { animationDelay: "2.7s" } : undefined}
      >
        Settled in 1 h 20 min. On days you walked after breakfast, it took 25 minutes less.
        {note ? <span className="mt-3 block text-[12.5px] text-white/50">{note}</span> : null}
      </figcaption>
    </figure>
  );
}
