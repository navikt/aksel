const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@navikt/ds-react", "@navikt/aksel-icons"],
};

module.exports = withBundleAnalyzer(nextConfig);
