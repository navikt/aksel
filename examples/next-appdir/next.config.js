const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /**
     * https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports
     * https://github.com/vercel/next.js/issues/60246
     * https://github.com/vercel/next.js/issues/44039
     * https://github.com/vercel/next.js/issues/12557
     */
    optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
