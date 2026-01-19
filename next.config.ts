import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

const nextConfig: NextConfig = {
  trailingSlash: false,
  // swcMinify is removed
  compiler: {
    // Removes console.log & console.info in production
    removeConsole: {
      exclude: ["error", "warn"], // keeps console.error & console.warn
    },
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "10.10.7.65" },
      { hostname: "humayon5002.binarybards.online" },
      { hostname: "future-pharmacy-website.vercel.app" },
      { hostname: "api.optimushs.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
