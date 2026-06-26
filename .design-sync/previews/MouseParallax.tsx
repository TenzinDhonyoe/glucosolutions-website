import { MouseParallax } from "gluco_website";
export const Default = () => (
  <div style={{ padding: 44, background: "#F6F1E6", display: "flex", justifyContent: "center" }}>
    <MouseParallax strength={18} tilt={6}>
      <div style={{ width: 220, padding: 28, background: "#fff", border: "1px solid #D8D4C7", borderRadius: 14 }}>
        <div className="eyebrow">Live</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "#1C1C1C", marginTop: 8 }}>118</div>
        <div style={{ color: "#5B5A52", fontSize: 13 }}>mg/dL · in range</div>
      </div>
    </MouseParallax>
  </div>
);
