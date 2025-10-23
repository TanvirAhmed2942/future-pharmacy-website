import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // for Vercel hosting
  trailingSlash: false, // optional
};

export default nextConfig;
