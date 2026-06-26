import { cn } from "@/lib/utils";

type AvatarTone = "sky" | "green" | "low" | "neutral";

const TONE: Record<AvatarTone, string> = {
  sky: "bg-sky-100 text-sky-700",
  green: "bg-green-100 text-green-600",
  low: "bg-low-bg text-low",
  neutral: "bg-sunken text-ink-500",
};

/** Avatar — initials chip, tinted from the brand/status palette. */
export function Avatar({
  initials,
  tone = "sky",
  size = 40,
  ring = false,
  className,
}: {
  initials: string;
  tone?: AvatarTone;
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold leading-none",
        TONE[tone],
        ring && "ring-2 ring-card",
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initials}
    </span>
  );
}

/** AvatarStack — overlapping initials with an optional "+N" overflow chip. */
export function AvatarStack({
  people,
  size = 36,
  overflow,
  className,
}: {
  people: { initials: string; tone?: AvatarTone }[];
  size?: number;
  overflow?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      {people.map((p, i) => (
        <Avatar
          key={`${p.initials}-${i}`}
          initials={p.initials}
          tone={p.tone}
          size={size}
          ring
          className={i > 0 ? "-ml-3" : undefined}
        />
      ))}
      {overflow ? (
        <Avatar initials={`+${overflow}`} tone="neutral" size={size} ring className="-ml-3" />
      ) : null}
    </div>
  );
}
