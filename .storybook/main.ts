import { defineMain } from "@storybook/react-vite/node";
import FG from "fast-glob";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCsf } from "storybook/internal/csf-tools";
import turbosnap from "vite-plugin-turbosnap";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);
const includeWebsiteStories = process.env.WITH_WEBSITE === "true";

const indexRegex = /export const args = {\s+index: (\d+),/;

const addons = [
  getAbsolutePath("@storybook/addon-a11y"),
  getAbsolutePath("@storybook/addon-themes"),
  getAbsolutePath("@storybook/addon-docs"),
  getAbsolutePath("@storybook/addon-vitest"),
];

if (process.env.NODE_ENV === "development") {
  addons.push(getAbsolutePath("@github-ui/storybook-addon-performance-panel"));
}

export default defineMain({
  experimental_indexers: (indexers) => {
    // Changes here might need to be reflected in aksel.nav.no/website/.storybook/main.ts
    const customIndexer = async (fileName: string, opts: any) => {
      try {
        let code = readFileSync(fileName, "utf-8").toString();

        const index = indexRegex.exec(code)?.[1];

        code = code.split(
          /\/\/ EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE/,
        )[0];

        const templatePath = fileName.split(`pages/templates/`)[1];
        if (!templatePath) {
          console.warn(`[Storybook] Invalid template path: ${fileName}`);
          return [];
        }

        const [templateName, name] = templatePath
          .replace(".tsx", "")
          .split("/");

        if (!templateName || !name) {
          console.warn(
            `[Storybook] Could not parse template name from: ${fileName}`,
          );
          return [];
        }

        const storyName = process.env.CHROMATIC
          ? `${templateName} [${index ?? "0"}] ${name}` // Chromatic does not support folders, and doesn't like |
          : `${index ?? "0"} | ${name}`;

        code += `
        export default { title: "Templates/${templateName}/${storyName}" };
        export const Demo = { render: Example };
        Demo.storyName = "${storyName}";`;

        return loadCsf(code, {
          ...opts,
          fileName,
        }).parse().indexInputs;
      } catch (error) {
        console.error(`[Storybook] Failed to index ${fileName}:`, error);
        return [];
      }
    };

    return [
      ...(indexers || []),
      {
        test: /pages\/templates\/.+?.tsx$/,
        createIndex: customIndexer,
      },
    ];
  },

  staticDirs: ["./public"],

  stories: resolveStoriesPaths(),

  addons,

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  typescript: {
    check: false,
    reactDocgen: false,
  },

  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      build: { cssMinify: "lightningcss" },
      resolve: {
        tsconfigPaths: true,
      },
      plugins:
        configType === "PRODUCTION"
          ? [
              turbosnap({
                rootDir: config.root ?? process.cwd(),
              }),
            ]
          : [],
    } satisfies typeof config);
  },

  /* Lets us preview Roboto-flex font in storybook. */
  previewHead: (head) => `
  ${head}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">`,

  features: {
    actions: false,
  },
});

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}

function resolveStoriesPaths() {
  const paths = [
    "../@navikt/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "./docs/*.mdx",
    "./docs/*.stories.tsx",
  ];

  if (includeWebsiteStories) {
    paths.push("../aksel.nav.no/website/pages/templates/**/*.tsx");
  }

  return FG.sync(paths, {
    cwd: __dirname,
    ignore: [
      "../**/node_modules/**",
      "**/dist",
      "**/build",
      "**/.next",
      "**/esm",
      "**/cjs",
    ],
  });
}
