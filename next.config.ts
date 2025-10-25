import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // for Vercel hosting
  trailingSlash: false, // optional
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
