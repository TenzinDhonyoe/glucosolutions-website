import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const BRAND_GRADIENT = "linear-gradient(100deg, #2BB0DC 0%, #34A89A 50%, #4E9A6B 100%)";

// Warm ink legibility wash, mirrored from the real hero overlay.
const HERO_WASH =
  "linear-gradient(95deg, rgba(43,38,32,0.92) 0%, rgba(43,38,32,0.74) 38%, rgba(43,38,32,0.30) 72%, rgba(43,38,32,0.10) 100%)";

const BENEFITS = ["See the weeks between", "Cut the admin", "Prove outcomes"];

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
          background: "#2B2620",
          fontFamily: "sans-serif",
          color: "#F7F3EC",
          position: "relative",
        }}
      >
        {/* the real hero photograph */}
        <img
          src={`${origin}/hero-runner.jpg`}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "60% center",
          }}
        />
        {/* warm ink wash for legibility */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: HERO_WASH,
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
              fontSize: 76,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: 880,
            }}
          >
            Know what your patients do between sessions.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 26,
              color: "rgba(247,243,236,0.82)",
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            Clinical software for dietitians.
          </div>

          {/* benefit chips, mirrored from the hero */}
          <div style={{ display: "flex", marginTop: 34, gap: 14 }}>
            {BENEFITS.map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(247,243,236,0.28)",
                  fontSize: 20,
                  color: "rgba(247,243,236,0.92)",
                }}
              >
                <span style={{ color: "#34A89A" }}>+</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
