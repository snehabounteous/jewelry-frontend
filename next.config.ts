import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "jtq83fl7q0.ufs.sh", // ✅ added your image host
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ added your image host
      },
    ],
  },
};

export default nextConfig;
