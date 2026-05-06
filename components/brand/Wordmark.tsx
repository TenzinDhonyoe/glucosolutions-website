import Link from "next/link";
import { HexMark } from "@/components/brand/HexMark";
import { cn } from "@/lib/utils";

type Props = {
  href?: string | null;
  className?: string;
  /** "default" → sage Gluco + seafoam Solutions on Oat. "knockout" → all paper, for dark surfaces. */
  variant?: "default" | "knockout";
  size?: number;
  showMark?: boolean;
};

/**
 * Brand lockup — hexagon mark + "Gluco Solutions" wordmark in Canela.
 * Per DESIGN.md the wordmark is set in Canela Deck with Sage as the primary
 * word color and Seafoam as the secondary on the second word. Until the
 * licensed font lands, Fraunces is the working substitute.
 */
export function Wordmark({
  href = "/",
  className,
  variant = "default",
  size = 26,
  showMark = true,
}: Props) {
  const knockout = variant === "knockout";
  const word1 = knockout ? "text-paper" : "text-sage";
  const word2 = knockout ? "text-paper/80" : "text-seafoam";

  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display leading-none tracking-[-0.015em]",
        className
      )}
      style={{ fontSize: size }}
    >
      {showMark && <HexMark size={Math.round(size * 1.05)} knockout={knockout} />}
      <span className="inline-flex items-baseline gap-[0.2em]">
        <span className={word1}>Gluco</span>
        <span className={word2}>Solutions</span>
      </span>
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="Gluco Solutions home" className="inline-flex items-center">
      {inner}
    </Link>
  );
}
