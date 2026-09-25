import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const IMMUTABLE_CACHE = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

// Pages from the dietitian-software era. Sent home rather than 404ing so old
// links (emails, bookmarks, search results) still land somewhere useful.
const RETIRED_PATHS = ["/product", "/redu", "/contact", "/security"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return RETIRED_PATHS.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      {
        source: "/(logo|wordmark|icon|apple-icon)\\.(png|svg|webp|ico)",
        headers: IMMUTABLE_CACHE,
      },
    ];
  },
};

export default nextConfig;
