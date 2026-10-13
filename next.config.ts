import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components and Partial Prefetching are left off: they hang in the
  // Cloudflare Workers runtime this site is deployed to. Every page is still
  // prerendered at build time through generateStaticParams.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
