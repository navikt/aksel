import BundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import path from "path";
import packageJson from "../package.json";

const cdnUrl = "https://cdn.nav.no";
const dekoratorUrl = "https://www.nav.no";
const tempChromaticRedirect =
  "https://main--66b4b3beb91603ed0ab5c45e.chromatic.com";

const cspHeader = `
    default-src 'self' 'unsafe-inline' ${cdnUrl};
    script-src 'self' 'unsafe-eval' 'unsafe-inline' ${dekoratorUrl} ${cdnUrl};
    font-src 'self' ${cdnUrl} data:;
    style-src 'self' 'unsafe-inline' ${dekoratorUrl} ${cdnUrl} https://cdn.jsdelivr.net;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://codesandbox.io/api/v1/sandboxes/define;
    frame-ancestors 'self' localhost:3000;
    frame-src 'self' localhost:3000 https://aksel.ansatt.dev.nav.no;
    media-src 'self' ${cdnUrl} cdn.sanity.io;
    upgrade-insecure-requests;
    img-src 'self' blob: data: cdn.sanity.io ${dekoratorUrl} https://avatars.githubusercontent.com data: ${cdnUrl};
    connect-src 'self' ${dekoratorUrl} ${cdnUrl} ${tempChromaticRedirect} https://raw.githubusercontent.com/navikt/ https://hnbe3yhs.apicdn.sanity.io wss://hnbe3yhs.api.sanity.io cdn.sanity.io *.api.sanity.io https://umami.nav.no https://main--66b4b3beb91603ed0ab5c45e.chromatic.com;
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
    value: cspHeader.replace(/\n/g, ""),
  },
];

const useCdn = process.env.USE_CDN_ASSETS === "true";
const isProduction = process.env.PRODUCTION === "true";
const akselVersion = packageJson.dependencies["@navikt/ds-react"].replace(
  "^",
  "",
);

if (akselVersion === null) {
  throw new Error(
    "Invalid version of @navikt/ds-react. Please check the version in package.json.",
  );
}

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ["@navikt/ds-tokens", "react-hotjar"],
  /* Deprecated */
  publicRuntimeConfig: {
    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    UMAMI_TRACKING_ID: isProduction
      ? "fb69e1e9-1bd3-4fd9-b700-9d035cbf44e1"
      : "7b9fb2cd-40f4-4a30-b208-5b4dba026b57",
  },
  /**
   * @important: These are always included in JS-bundle!
   * Only use for public runtime config that is not sensitive
   */
  env: {
    aksel_version: akselVersion,
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
      /* TODO: Use icon-page redirects after release */
      /* {
        source: "/ikoner",
        destination: "/dev/grunnleggende/ikoner",
        permanent: false,
      },
      {
        source: "/ikoner/:slug*",
        destination: "/dev/komponenter/ikoner?iconName=:slug*",
        permanent: false,
      }, */
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
  outputFileTracingRoot: path.join(__dirname, "../../"),
  experimental: {
    optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
    largePageDataBytes: 128 * 2000,
  },
};

module.exports =
  process.env.ANALYZE === "true" ? BundleAnalyzer()(nextConfig) : nextConfig;
