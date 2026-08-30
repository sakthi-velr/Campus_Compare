import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.218.158.209"],
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
