import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const BRAND_GRADIENT = "linear-gradient(100deg, #2BB0DC 0%, #34A89A 50%, #4E9A6B 100%)";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#F7F3EC",
          fontFamily: "sans-serif",
          color: "#2B2620",
          position: "relative",
        }}
      >
        {/* soft palette-matched accent, top-right */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(43,176,220,0.20), rgba(78,154,107,0.10) 45%, transparent 72%)",
          }}
        />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: BRAND_GRADIENT }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em" }}>
            <span>Gluco</span>
            <span style={{ marginLeft: 1 }}>Solutions</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 78,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            Know what your patients do between sessions.
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 26,
              color: "#847B6F",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Clinical software for dietitians.
          </div>
          <div style={{ marginTop: 34, height: 6, width: 180, borderRadius: 999, background: BRAND_GRADIENT }} />
        </div>
      </div>
    ),
    size,
  );
}
