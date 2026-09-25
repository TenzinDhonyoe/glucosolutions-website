import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// Mirrors the site hero: the breakfast photograph with a pine wash from the
// left, the headline, and the gold waitlist ask.
const WASH =
  "linear-gradient(90deg, rgba(15,43,46,0.94) 0%, rgba(15,43,46,0.78) 42%, rgba(15,43,46,0.15) 78%, rgba(15,43,46,0) 100%)";

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
          background: "#0f2b2e",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img
          alt=""
          src={`${origin}/images/hero-breakfast.jpg`}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "70% center",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: WASH,
          }}
        />

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
              fontSize: 78,
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.03,
              maxWidth: 720,
            }}
          >
            See how your body answers every meal.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 640,
            }}
          >
            A needle-free glucose band for people with prediabetes.
          </div>
          <div style={{ display: "flex", marginTop: 34 }}>
            <div
              style={{
                display: "flex",
                background: "#f5a623",
                color: "#0f2b2e",
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
