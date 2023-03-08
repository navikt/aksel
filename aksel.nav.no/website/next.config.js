/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const cdnUrl = "https://cdn.nav.no";

const ContentSecurityPolicy = `
  default-src 'self' 'unsafe-inline' ${cdnUrl};
  font-src 'self' ${cdnUrl} data:;
  img-src 'self' cdn.sanity.io https://avatars.githubusercontent.com data: ${cdnUrl};
  script-src 'self' ${cdnUrl} https://in2.taskanalytics.com/tm.js 'nonce-4e1aa203a32e' 'unsafe-eval';
  style-src 'self' ${cdnUrl} 'unsafe-inline';
  report-uri https://sentry.gc.nav.no/api/113/envelope/?sentry_key=d35bd60e413c489ca0f2fd389b4e6e5e&sentry_version=7;
  connect-src 'self' ${cdnUrl} https://raw.githubusercontent.com/navikt/ wss://hnbe3yhs.api.sanity.io cdn.sanity.io *.api.sanity.io https://amplitude.nav.no https://sentry.gc.nav.no https://in2.taskanalytics.com/03346;
  frame-ancestors localhost:3333 'self' localhost:3000 https://verktoykasse.sanity.studio/;
  media-src 'self' ${cdnUrl} cdn.sanity.io;
  frame-src 'self' https://web.microsoftstream.com localhost:3000 https://aksel.dev.nav.no/;
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

const config = () =>
  withBundleAnalyzer({
    transpilePackages: ["@navikt/ds-tokens"],
    publicRuntimeConfig: {
      NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    },
    assetPrefix: useCdn ? "https://cdn.nav.no/aksel/website" : undefined,
    async headers() {
      return [
        {
          source: "/:path*",
          headers: securityHeaders,
        },
      ];
    },
    rewrites: async () => [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ],
    async redirects() {
      return [
        {
          source: "/studio",
          destination: "/admin",
          permanent: true,
        },
        {
          source: "/storybook",
          destination: "https://main--5f801fb2aea7820022de2936.chromatic.com/",
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
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
    images: {
      domains: ["cdn.sanity.io", "raw.githubusercontent.com"],
      dangerouslyAllowSVG: true,
    },
  });

if (process.env.NODE_ENV === "production") {
  module.exports = config();
} else {
  module.exports = config();
}
