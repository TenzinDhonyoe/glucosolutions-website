import { TrendPill } from "gluco_website";
export const Inline = () => (
  <div style={{ padding: 44, background: "#F6F1E6", fontFamily: "var(--font-display)", fontSize: 30, color: "#1C1C1C", lineHeight: 1.4 }}>
    Your glucose is <TrendPill /> right now.
  </div>
);
