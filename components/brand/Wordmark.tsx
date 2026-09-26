import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Source SVG is 1440 × 225 (≈6.4:1), cyan→green gradient wordmark.
const RATIO = 1440 / 225;

/**
 * Brand wordmark — the real GlucoSolutions logo (public/logo.svg).
 * `size` is the rendered box height in px; width scales from the source ratio.
 * The SVG carries the cyan→green gradient, so it sits on light surfaces as-is.
 */
export function Wordmark({
  href = "/",
  className,
  size = 26,
}: {
  href?: string | null;
  className?: string;
  size?: number;
}) {
  const width = Math.round(size * RATIO);
  const img = (
    <Image
      src="/logo.svg"
      alt="GlucoSolutions"
      width={width}
      height={size}
      priority
      unoptimized
      className={cn("block w-auto select-none", className)}
      style={{ height: size }}
    />
  );

  if (!href) return img;
  return (
    <Link href={href} aria-label="GlucoSolutions home" className="inline-flex items-center">
      {img}
    </Link>
  );
}
