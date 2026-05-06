import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  /** Optional screen image. When omitted, a labeled placeholder rectangle renders inside. */
  src?: string;
  alt?: string;
  /** Caption shown inside the placeholder when no src is provided. */
  label?: string;
  className?: string;
};

/**
 * CSS-only iPhone-shaped frame. Accepts either a screen image (`src`) or
 * renders a labeled placeholder rectangle. Designed so the user can swap
 * `<PhoneFrame label="Today" />` → `<PhoneFrame src="/screens/today.png" />`
 * with no other code changes once they have screenshots.
 */
export function PhoneFrame({ src, alt = "", label = "", className }: Props) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19.5] w-full max-w-[260px] rounded-[40px] p-[10px]",
        "bg-charcoal border border-charcoal-2 shadow-[0_30px_80px_-20px_rgba(28,28,28,0.45)]",
        className
      )}
    >
      {/* Inner bezel + screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-charcoal">
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-black" />

        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="260px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col">
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-5 text-[10px] text-cream/55 font-mono">
              <span>9:41</span>
              <span className="opacity-50">•••</span>
            </div>
            {/* Placeholder content */}
            <div className="flex flex-1 flex-col justify-center px-6">
              <div className="font-mono text-[11px] tracking-wider text-cream/55 mb-3">
                screen / placeholder
              </div>
              <div className="display-serif text-[26px] leading-[1.05] text-cream">
                {label}
              </div>
              <div className="mt-6 space-y-2.5">
                <div className="h-1.5 w-3/4 rounded-full bg-cream/30" />
                <div className="h-1.5 w-2/3 rounded-full bg-cream/22" />
                <div className="h-1.5 w-1/2 rounded-full bg-cream/15" />
              </div>
              <div className="mt-8 rounded-2xl border border-cream/15 bg-cream/[0.04] p-4">
                <div className="font-mono text-[11px] tracking-wider text-cream/55 mb-2">trend</div>
                <div className="flex items-end gap-1.5 h-12">
                  {[0.4, 0.55, 0.45, 0.7, 0.85, 0.65, 0.8].map((h, i) => {
                    const isPeak = i === 4;
                    return (
                      <span
                        key={i}
                        className={`w-2 rounded-sm ${isPeak ? "bg-sunlit" : "bg-seafoam/85"}`}
                        style={{ height: `${h * 100}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
