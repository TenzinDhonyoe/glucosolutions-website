import { CounterStat } from "gluco_website";
const Stat = ({ children }: { children: any }) => (
  <div style={{ fontFamily: "var(--font-display)", fontSize: 64, color: "#1C1C1C", lineHeight: 1, letterSpacing: "-0.02em" }}>
    {children}
  </div>
);
export const Percentage = () => (
  <div style={{ padding: 40, background: "#F6F1E6" }}>
    <Stat><CounterStat to={80} suffix="%" /></Stat>
    <div className="eyebrow" style={{ marginTop: 12 }}>of prediabetes is undiagnosed</div>
  </div>
);
export const Decimals = () => (
  <div style={{ padding: 40, background: "#F6F1E6" }}>
    <Stat><CounterStat to={6.2} from={5} decimals={1} suffix="%" /></Stat>
    <div className="eyebrow" style={{ marginTop: 12 }}>average A1C at intake</div>
  </div>
);
