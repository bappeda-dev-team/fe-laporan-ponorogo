import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // panggilan fe
        destination: `${API_URL}/api/v1/:path*` // backend
      },
      {
        source: "/auth/:path*",
        destination: `${API_URL}/auth/:path*` // backend
      }
    ]
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.kertaskerja.cc",
        pathname: "/logo/**"
      },
    ],
  },
};

export default nextConfig;
