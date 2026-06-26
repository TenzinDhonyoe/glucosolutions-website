import { PhoneFrame } from "gluco_website";
import screen from "./assets/runner.jpg";
export const Placeholder = () => (
  <div style={{ padding: 32, background: "#F6F1E6", display: "flex", justifyContent: "center" }}>
    <PhoneFrame label="Today" />
  </div>
);
export const WithScreen = () => (
  <div style={{ padding: 32, background: "#F6F1E6", display: "flex", justifyContent: "center" }}>
    <PhoneFrame src={screen} alt="App home screen" />
  </div>
);
