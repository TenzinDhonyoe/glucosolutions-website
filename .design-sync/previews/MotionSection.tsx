import { MotionSection, SectionLabel } from "gluco_website";
export const Default = () => (
  <div style={{ background: "#F6F1E6" }}>
    <MotionSection className="p-10">
      <SectionLabel index={2} label="How it works" />
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 34, color: "#1C1C1C", marginTop: 16, letterSpacing: "-0.02em" }}>
        Reads through your skin.
      </h3>
      <p style={{ color: "#5B5A52", maxWidth: 440, marginTop: 10 }}>
        A scroll-reveal wrapper. Content is visible from first paint; the entrance is a subtle polish.
      </p>
    </MotionSection>
  </div>
);
