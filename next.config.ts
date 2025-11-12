import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withNextIntl(nextConfig);
