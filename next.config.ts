import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

const nextConfig: NextConfig = {
  trailingSlash: false,
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
