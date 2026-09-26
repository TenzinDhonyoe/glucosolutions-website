import { cn } from "@/lib/utils";

/**
 * Section opener: a small sentence-case kicker, a left-aligned headline, and
 * an optional lede that sits to the right on wide screens.
 */
export function SectionHeader({
  kicker,
  title,
  lede,
  id,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <div className="lg:col-span-7">
        <p className="text-[13px] font-medium text-ink-400">{kicker}</p>
        <h2
          id={id}
          className="mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink-900 text-balance"
        >
          {title}
        </h2>
      </div>
      {lede ? (
        <p className="max-w-[28rem] text-[16px] leading-relaxed text-ink-500 lg:col-span-5 lg:justify-self-end">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
