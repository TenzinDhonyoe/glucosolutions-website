import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

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
          background: "#07090A",
          fontFamily: "sans-serif",
          color: "white",
          position: "relative",
        }}
      >
        {/* Single restrained ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(45,190,108,0.32), rgba(19,139,146,0.16) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            position: "relative",
          }}
        >
          {/* Hex outline + flowing wave (matches the brand mark) */}
          <svg width={48} height={48} viewBox="0 0 100 100">
            <defs>
              <linearGradient id="og-grad" x1="80%" y1="0%" x2="20%" y2="100%">
                <stop offset="0%" stopColor="#0E5C7E" />
                <stop offset="55%" stopColor="#138B92" />
                <stop offset="100%" stopColor="#2DBE6C" />
              </linearGradient>
            </defs>
            <polygon
              points="50,5 91,28 91,72 50,95 9,72 9,28"
              fill="none"
              stroke="url(#og-grad)"
              strokeWidth={9}
              strokeLinejoin="round"
            />
            <path
              d="M22,40 C36,28 46,52 60,40 C74,28 82,40 82,40"
              fill="none"
              stroke="url(#og-grad)"
              strokeWidth={8}
              strokeLinecap="round"
            />
            <path
              d="M18,60 C32,72 42,48 56,60 C70,72 78,60 78,60"
              fill="none"
              stroke="url(#og-grad)"
              strokeWidth={8}
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            <span>Gluco</span>
            <span style={{ marginLeft: 2, fontWeight: 800 }}>Solutions</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
            }}
          >
            Prediabetes is silent.
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 400,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.02em",
              lineHeight: 1.0,
              color: "rgba(255,255,255,0.85)",
              marginTop: 4,
            }}
          >
            Until it isn&rsquo;t.
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 24,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            A non-invasive wearable + AI coach for glycemic trend awareness.
          </div>
        </div>
      </div>
    ),
    size
  );
}
