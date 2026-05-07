import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SOURCE_W = 1920;
const SOURCE_H = 300;

type Props = {
  href?: string | null;
  className?: string;
  /** "default" → charcoal wordmark for paper/light surfaces. "knockout" → white for dark photos. */
  variant?: "default" | "knockout";
  /** Rendered height in px. Width scales from the source aspect. */
  size?: number;
  /** Kept for API compatibility — the new lockup is a single wordmark, no separate hex mark. */
  showMark?: boolean;
};

/**
 * Brand wordmark — single-line "GlucoSolutions" lockup with the hex dot above
 * the i. Renders the supplied PNG asset, recolored white or charcoal.
 */
export function Wordmark({
  href = "/",
  className,
  variant = "default",
  size = 26,
}: Props) {
  const knockout = variant === "knockout";
  const src = knockout ? "/brand/wordmark-white.png" : "/brand/wordmark-charcoal.png";
  const width = Math.round((size * SOURCE_W) / SOURCE_H);

  const inner = (
    <span
      className={cn("inline-flex items-center leading-none", className)}
      style={{ height: size }}
    >
      <Image
        src={src}
        alt="GlucoSolutions"
        width={width}
        height={size}
        priority
        className="h-full w-auto select-none"
      />
    </span>
  );

  if (!href) return inner;
  return (
    <Link
      href={href}
      aria-label="GlucoSolutions home"
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
