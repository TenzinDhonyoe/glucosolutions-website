import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

/**
 * The hexagon mark: two glucose curves crossing inside a hexagon. Drawn inline
 * so it stays crisp at nav size. On light surfaces it uses the logo's
 * navy-to-leaf gradient; on dark surfaces the navy end is lifted to teal so
 * it doesn't disappear into the pine.
 */
export function HexMark({
  tone = "dark",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const id = useId();
  const top = tone === "dark" ? "#0c4e8a" : "#2fc0c6";
  const bottom = tone === "dark" ? "#1dc37e" : "#3ddc93";
  return (
    <svg
      viewBox="210 150 604 720"
      aria-hidden
      className={cn("h-8 w-auto shrink-0", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeLinejoin="miter">
        <path d="M512 199 L772 358 L772 660 L512 824 L251 660 L251 358 Z" strokeWidth="62" />
        <path d="M268 401 C 400 398 440 420 512 466 S 650 598 760 626" strokeWidth="46" strokeLinecap="butt" />
        <path d="M512 466 C 575 420 628 401 760 401" strokeWidth="46" strokeLinecap="butt" />
      </g>
    </svg>
  );
}

export function Logo({
  tone = "dark",
  href = "/",
  className,
}: {
  tone?: Tone;
  href?: string | null;
  className?: string;
}) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <HexMark tone={tone} className="h-[30px]" />
      <Image
        src={tone === "dark" ? "/brand/wordmark-charcoal.png" : "/brand/wordmark-white.png"}
        alt="GlucoSolutions"
        width={1920}
        height={300}
        unoptimized
        className="h-[15px] w-auto select-none"
      />
    </span>
  );
  if (!href) return mark;
  return (
    <Link href={href} aria-label="GlucoSolutions home" className="inline-flex rounded-sm">
      {mark}
    </Link>
  );
}
