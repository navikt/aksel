const storyIndexers = require("./indexer");

const path = require("path");
const { mergeConfig } = require("vite");

module.exports = {
  storyIndexers,
  devServer: {
    stats: "errors-only",
  },
  staticDirs: ["./public"],

  stories: () => [
    "../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "./*.stories.mdx",
    ...(process.env.STORYBOOK_STORIES === "all"
      ? [
          "../aksel.nav.no/website/components/**/*.stories.tsx",
          "../aksel.nav.no/website/pages/eksempler/**/*.tsx",
        ]
      : []),
  ],
  addons: [
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html",

    {
      name: "@storybook/addon-storysource",
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
        controls: {
          hideNoControlsWarning: true,
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      define: { "process.env": {} },
      resolve: {
        alias: [
          /*
          // Example
          {
            find: "@components",
            replacement: path.resolve(__dirname, "./src/components"),
          }, */
          {
            find: "components",
            replacement: path.resolve(
              __dirname,
              "../aksel.nav.no/website/components"
            ),
          },
          {
            find: "@utils",
            replacement: path.resolve(
              __dirname,
              "../aksel.nav.no/website/components/website-modules/utils/index.ts"
            ),
          },
          {
            find: "@lib",
            replacement: path.resolve(
              __dirname,
              "../aksel.nav.no/website/lib/index.ts"
            ),
          },
        ],
      },
    });
  },
};

/* "@/components": ["components/index.ts"],
      "@/lib": ["lib/index.ts"],
      "@/pages/*": ["pages/*"],
      "@/sanity-block": ["components/SanityBlockContent.tsx"],
      "@/utils": ["components/website-modules/utils/index.ts"],
      "@/layout": ["components/layout/index.ts"],
      "@/error-boundary": ["components/website-modules/ErrorBoundary.tsx"],
      "@/sanity-client": ["lib/sanity/sanity.server"] */
