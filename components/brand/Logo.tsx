import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "dark" | "light";
  href?: string | null;
  size?: number;
  showWordmark?: boolean;
};

export function BrandMark({
  size = 32,
  className,
  ariaHidden = true,
}: {
  size?: number;
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt={ariaHidden ? "" : "GlucoSolutions"}
      width={size}
      height={size}
      className={cn("shrink-0 select-none", className)}
      priority
      aria-hidden={ariaHidden || undefined}
    />
  );
}

export function Logo({
  className,
  variant = "light",
  href = "/",
  size = 30,
  showWordmark = true,
}: Props) {
  const wordmark = variant === "dark" ? "text-ink-0" : "text-white";

  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-bold tracking-tight",
        className
      )}
    >
      <BrandMark size={size} />
      {showWordmark && (
        <span className={cn("text-[17px] leading-none", wordmark)}>
          Gluco<span className="font-extrabold">Solutions</span>
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="GlucoSolutions home" className="inline-flex">
      {inner}
    </Link>
  );
}
