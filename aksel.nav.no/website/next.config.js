const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")();

const cdnUrl = "https://cdn.nav.no";
const hotjarUrl = "https://*.hotjar.com";
const dekoratorUrl = "https://www.nav.no";

const ContentSecurityPolicy = `
  default-src 'self' 'unsafe-inline' ${cdnUrl};
  font-src 'self' ${cdnUrl} ${hotjarUrl} data:;
  img-src 'self' cdn.sanity.io ${dekoratorUrl} https://avatars.githubusercontent.com data: ${cdnUrl} ${hotjarUrl};
  script-src 'self' ${dekoratorUrl} ${cdnUrl} ${hotjarUrl} https://in2.taskanalytics.com/tm.js 'nonce-4e1aa203a32e' 'unsafe-eval';
  style-src 'self' ${dekoratorUrl} ${cdnUrl} ${hotjarUrl} 'unsafe-inline';
  connect-src 'self' ${dekoratorUrl} ${cdnUrl} ${hotjarUrl} https://*.hotjar.io wss://*.hotjar.com https://raw.githubusercontent.com/navikt/ https://hnbe3yhs.apicdn.sanity.io wss://hnbe3yhs.api.sanity.io cdn.sanity.io *.api.sanity.io https://umami.nav.no https://in2.taskanalytics.com/03346;
  frame-ancestors 'self' localhost:3000;
  media-src 'self' ${cdnUrl} cdn.sanity.io;
  frame-src 'self' https://web.microsoftstream.com localhost:3000 https://aksel.ekstern.dev.nav.no;
`;

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer-when-downgrade",
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

const useCdn = process.env.USE_CDN_ASSETS === "true";
const isProduction = process.env.PRODUCTION === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@navikt/ds-tokens", "react-hotjar"],
  publicRuntimeConfig: {
    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    UMAMI_TRACKING_ID: isProduction
      ? "fb69e1e9-1bd3-4fd9-b700-9d035cbf44e1"
      : "7b9fb2cd-40f4-4a30-b208-5b4dba026b57",
  },
  assetPrefix: useCdn ? "https://cdn.nav.no/designsystem/website" : undefined,
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/studio",
        destination: "/admin",
        permanent: true,
      },
      {
        source: "/storybook",
        destination: "https://main--66b4b3beb91603ed0ab5c45e.chromatic.com/",
        permanent: false,
      },
      {
        source: "/darkside",
        destination:
          "https://main--66b4b3beb91603ed0ab5c45e.chromatic.com/?path=/docs/docs-become-a-pilot-team-1-intro--docs",
        permanent: false,
      },
      {
        source: "/prinsipper",
        destination: "/",
        permanent: false,
      },
      {
        source: "/preview/:slug*",
        destination: "/api/preview?slug=:slug*",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
    largePageDataBytes: 128 * 2000,
  },
};

module.exports =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
