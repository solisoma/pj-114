import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevents iframe embedding
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none';", // Modern alternative for blocking iframes
          },
        ],
      },
    ];
  },
};

export default nextConfig;
