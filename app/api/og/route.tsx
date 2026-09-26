import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(req: Request) {
  const { origin } = new URL(req.url);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img
          alt="GlucoSolutions"
          src={`${origin}/brand/wordmark-white.png`}
          width={224}
          height={35}
          style={{ position: "relative" }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1.03,
              maxWidth: 720,
            }}
          >
            See what moves your blood sugar.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 640,
            }}
          >
            A needle-free glucose band for people with prediabetes.
          </div>
          <div style={{ display: "flex", marginTop: 34 }}>
            <div
              style={{
                display: "flex",
                background: "#ffffff",
                color: "#0a0a0a",
                fontSize: 24,
                fontWeight: 700,
                padding: "14px 28px",
                borderRadius: 999,
              }}
            >
              Join the waitlist
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
