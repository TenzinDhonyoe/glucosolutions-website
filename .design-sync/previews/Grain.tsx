import { Grain } from "gluco_website";
export const OverPanel = () => (
  <div style={{ position: "relative", height: 220, background: "#2D8059", borderRadius: 14, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <span style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#F6F1E6" }}>Paper grain overlay</span>
    <Grain />
  </div>
);
