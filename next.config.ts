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
      },
      {
        source: "/user-info",
        destination: `${API_URL}/user-info` // backend
      }
    ]
  },
  output: "standalone",
  images: {
    unoptimized: true,
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
