import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*", // panggilan fe
        destination: `${API_URL}/:path*` // backend
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
