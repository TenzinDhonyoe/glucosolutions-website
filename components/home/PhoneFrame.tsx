import { cn } from "@/lib/utils";

/**
 * PhoneFrame — a restrained, true-to-life iPhone that looks identical at any
 * size. Every dimension (rim, bezel, corner radius, side buttons, island,
 * shadow) is expressed in container-query width units (`cqw` = 1% of the
 * frame's own width), so a 120px relay phone is a pixel-perfect scale-down of
 * the 320px Redu-section phone instead of a chunky-bezelled miniature. The
 * proportions match a real iPhone 15/16: thin titanium rim, matte bezel,
 * concentric radii, a Dynamic Island seated in the status-bar gap. Pass the app
 * screen as children.
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-[320px]", className)}
      style={{ containerType: "inline-size" }}
    >
      {/* machined side buttons — subtle, tucked just behind the rim */}
      <span
        aria-hidden
        className="absolute left-[-0.5cqw] top-[17%] h-[7.5cqw] w-[0.62cqw] rounded-l-full bg-gradient-to-r from-[#5c5c60] to-[#141416]"
      />
      <span
        aria-hidden
        className="absolute left-[-0.62cqw] top-[26%] h-[12.5cqw] w-[0.62cqw] rounded-l-full bg-gradient-to-r from-[#5c5c60] to-[#141416]"
      />
      <span
        aria-hidden
        className="absolute right-[-0.62cqw] top-[24%] h-[17.5cqw] w-[0.62cqw] rounded-r-full bg-gradient-to-l from-[#5c5c60] to-[#141416]"
      />

      {/* titanium outer rim — thin, uniform, machined edge */}
      <div className="relative rounded-[13cqw] bg-gradient-to-b from-[#7c7c81] via-[#2e2e30] to-[#131315] p-[0.62cqw] shadow-[0_7.5cqw_15.6cqw_-6.9cqw_rgba(20,16,12,0.45)]">
        {/* matte bezel body */}
        <div className="rounded-[12.5cqw] bg-[#0a0a0c] p-[1.9cqw] shadow-[inset_0_0.3cqw_0.5cqw_rgba(255,255,255,0.1)]">
          {/* screen */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[10.5cqw] bg-page">
            {/* Dynamic Island — proportional to the screen (iOS geometry: ~31%
                wide, ~4.3% tall, ~1.4% from top) so it lands exactly in the
                status-bar gap the screenshot already leaves for it, at any size */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[1.4%] z-30 h-[4.3%] w-[31%] -translate-x-1/2 rounded-full bg-black"
            />
            {/* whisper of screen gloss */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/8 via-transparent to-transparent"
            />
            <div className="absolute inset-0 z-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
