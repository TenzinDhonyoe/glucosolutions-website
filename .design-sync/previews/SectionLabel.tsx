import { SectionLabel } from "gluco_website";
export const Default = () => (
  <div style={{ display: "grid", gap: 22, padding: 40, background: "#F6F1E6" }}>
    <SectionLabel index={1} label="The problem" />
    <SectionLabel index={2} label="How it works" />
    <SectionLabel index={3} label="The solution" />
  </div>
);
