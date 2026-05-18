import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Performance ── */
  reactStrictMode: true,
  poweredByHeader: false,

  /* ── Development Origins ── */
  allowedDevOrigins: ["10.203.66.233"],

  /* ── Image optimization (for future use) ── */
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /* ── Headers for security & performance ── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
