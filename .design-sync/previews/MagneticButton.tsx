import { MagneticButton } from "gluco_website";
export const PrimaryCta = () => (
  <div style={{ padding: 48, background: "#F6F1E6", display: "flex", justifyContent: "center" }}>
    <MagneticButton
      href="#waitlist"
      className="shine inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3.5 text-[15px] font-medium text-paper"
    >
      Join the waitlist
    </MagneticButton>
  </div>
);
export const Ghost = () => (
  <div style={{ padding: 48, background: "#F6F1E6", display: "flex", justifyContent: "center" }}>
    <MagneticButton className="inline-flex items-center gap-2 rounded-full border border-stone-2 px-7 py-3.5 text-[15px] font-medium text-charcoal">
      See how it works
    </MagneticButton>
  </div>
);
