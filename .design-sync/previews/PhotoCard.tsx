import { PhotoCard } from "gluco_website";
import food from "./assets/food.jpg";
import leaves from "./assets/leaves.jpg";
export const Default = () => (
  <div style={{ padding: 28, background: "#F6F1E6", maxWidth: 340 }}>
    <PhotoCard src={food} alt="A balanced plate" caption="fig. 02 — what calms you." ratio="4 / 5" />
  </div>
);
export const HexCrop = () => (
  <div style={{ padding: 28, background: "#F6F1E6", maxWidth: 340 }}>
    <PhotoCard src={leaves} alt="Morning light through leaves" caption="fig. 03 — the brand hex crop." ratio="1 / 1" hex />
  </div>
);
