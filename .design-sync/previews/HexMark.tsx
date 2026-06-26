import { HexMark } from "gluco_website";
export const Sizes = () => (
  <div style={{ display: "flex", gap: 28, alignItems: "center", padding: 36 }}>
    <HexMark size={28} /><HexMark size={44} /><HexMark size={72} />
  </div>
);
export const Knockout = () => (
  <div style={{ display: "flex", gap: 28, alignItems: "center", padding: 36, background: "#1C1C1C", borderRadius: 14 }}>
    <HexMark size={44} knockout /><HexMark size={72} knockout />
  </div>
);
