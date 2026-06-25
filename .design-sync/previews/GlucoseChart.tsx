import { GlucoseChart } from "gluco_website";
export const Live = () => (
  <div style={{ padding: 32, background: "#F6F1E6" }}>
    <GlucoseChart className="w-full" />
  </div>
);
export const Annotated = () => (
  <div style={{ padding: 32, background: "#F6F1E6" }}>
    <GlucoseChart className="w-full" annotations />
  </div>
);
