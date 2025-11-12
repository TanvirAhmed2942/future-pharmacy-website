import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // for Vercel hosting
  trailingSlash: false, // optional
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withNextIntl(nextConfig);
