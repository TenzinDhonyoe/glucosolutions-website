import { cn } from "@/lib/utils";
import type { GlucoseState, IconType } from "./types";

const STATE_STYLE: Record<GlucoseState, { text: string; bg: string; dot: string }> = {
  good: { text: "text-good", bg: "bg-good-bg", dot: "bg-good" },
  warn: { text: "text-warn", bg: "bg-warn-bg", dot: "bg-warn" },
  high: { text: "text-high", bg: "bg-high-bg", dot: "bg-high" },
  low: { text: "text-low", bg: "bg-low-bg", dot: "bg-low" },
  info: { text: "text-info", bg: "bg-sunken", dot: "bg-info" },
};

/**
 * StatusPill — glucose-semantic pill with a leading dot ("In range",
 * "Elevated", "High", "Low"). Color carries meaning; never decoration.
 */
export function StatusPill({
  state,
  children,
  dot = true,
  live = false,
  className,
}: {
  state: GlucoseState;
  children: React.ReactNode;
  dot?: boolean;
  live?: boolean;
  className?: string;
}) {
  const s = STATE_STYLE[state];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold",
        s.text,
        s.bg,
        className,
      )}
    >
      {dot ? (
        <span className={cn("relative h-1.5 w-1.5 rounded-full", s.dot, live && "pulse-dot")} />
      ) : null}
      {children}
    </span>
  );
}

type BadgeTone = "brand" | "soft" | "green" | "neutral";

const BADGE_TONE: Record<BadgeTone, string> = {
  brand: "bg-sky-700 text-white",
  soft: "bg-sky-100 text-sky-700",
  green: "bg-green-100 text-green-600",
  neutral: "bg-sunken text-ink-700",
};

/** Badge — small square-cornered label (New / Beta / Goal met). */
export function Badge({
  children,
  tone = "soft",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold",
        BADGE_TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Tag — sunken chip with optional icon, for attributes/filters. */
export function Tag({
  children,
  icon: Icon,
  className,
}: {
  children: React.ReactNode;
  icon?: IconType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm bg-sunken px-3 py-1 text-[13px] font-medium text-ink-700",
        className,
      )}
    >
      {Icon ? <Icon size={13} aria-hidden /> : null}
      {children}
    </span>
  );
}

/**
 * PlusTag — the editorial `+SAVE TIME` micro-label. Geist Mono, uppercase,
 * tracked, with an accent `+`. Used in marquee-style benefit rows and as the
 * capability sub-labels (`+SORT +TRIAGE +SUMMARIZE`). Borderless by default so
 * a row of them reads as a typographic system, not a row of buttons.
 */
export function PlusTag({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-[0.12em]",
        light ? "text-page/75" : "text-ink-500",
        className,
      )}
    >
      <span className={cn("mr-1", light ? "text-sky-500" : "text-sky-600")}>+</span>
      {children}
    </span>
  );
}

/**
 * FeatureStatus — the load-bearing `[Available]` vs `[In development]` tag from
 * content.md. This is what separates shipped features from roadmap in an
 * investor's eyes, so it must always be visible and honest.
 */
export function FeatureStatus({
  status,
  className,
}: {
  status: "available" | "in-development";
  className?: string;
}) {
  const available = status === "available";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
        available ? "bg-good-bg text-good" : "bg-warn-bg text-warn",
        className,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", available ? "bg-good" : "bg-warn")}
      />
      {available ? "Available" : "In development"}
    </span>
  );
}
