import { cn } from "@/lib/utils";

/**
 * PhoneFrame — a premium, 3D-looking iPhone bezel. Layered for depth: a bright
 * titanium outer rim, a black bezel body with an inset highlight, a rounded
 * screen with a Dynamic Island and a soft gloss, plus machined side buttons and
 * a grounded floating shadow. Pass the app screen as children.
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[320px]", className)}>
      {/* machined side buttons (sit just behind the rim) */}
      <span
        aria-hidden
        className="absolute left-[-2.5px] top-[15%] h-7 w-[2.5px] rounded-l-[2px] bg-gradient-to-r from-[#6c6c70] to-[#1b1b1d]"
      />
      <span
        aria-hidden
        className="absolute left-[-3px] top-[22%] h-12 w-[3px] rounded-l-[2px] bg-gradient-to-r from-[#6c6c70] to-[#1b1b1d]"
      />
      <span
        aria-hidden
        className="absolute left-[-3px] top-[31%] h-12 w-[3px] rounded-l-[2px] bg-gradient-to-r from-[#6c6c70] to-[#1b1b1d]"
      />
      <span
        aria-hidden
        className="absolute right-[-3px] top-[25%] h-16 w-[3px] rounded-r-[2px] bg-gradient-to-l from-[#6c6c70] to-[#1b1b1d]"
      />

      {/* titanium outer rim — the bright machined edge */}
      <div className="relative rounded-[3rem] bg-gradient-to-b from-[#8a8a8f] via-[#3a3a3c] to-[#161618] p-[2.5px] shadow-[0_34px_70px_-18px_rgba(25,20,15,0.5)]">
        {/* black bezel body */}
        <div className="rounded-[2.85rem] bg-[#08080a] p-[10px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.14),inset_0_-1px_2px_rgba(0,0,0,0.6)]">
          {/* screen */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.25rem] bg-page">
            {/* Dynamic Island */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[9px] z-30 h-[23px] w-[80px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_3px_rgba(255,255,255,0.08)]"
            />
            {/* screen gloss */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/12 via-transparent to-transparent"
            />
            <div className="absolute inset-0 z-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
