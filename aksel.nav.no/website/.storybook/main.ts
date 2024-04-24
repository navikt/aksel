import { loadCsf } from "@storybook/csf-tools";
import type { StorybookConfig } from "@storybook/nextjs";
import { readFileSync } from "fs";
import { dirname, join, resolve } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const indexRegex = /export const args = {\s+index: (\d+),/;

const config: StorybookConfig = {
  experimental_indexers: (indexers) => {
    const csfIndexer = async (fileName: string, opts) => {
      const code = readFileSync(fileName, "utf-8").toString();
      return loadCsf(code, { ...opts, fileName }).parse().indexInputs;
    };

    const customIndexer = async (fileName: string, opts) => {
      let code = readFileSync(fileName, "utf-8").toString();

      const isTemplate = fileName.toLowerCase().includes("templates");
      const templatesOrExamples = isTemplate ? "Templates" : "Eksempler";

      const matches = indexRegex.exec(code);
      const prefix = matches ? `${matches[1]} | ` : "";

      code = code.split(
        /\/\/ EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE/,
      )[0];

      const folderAndName = fileName
        .split(`pages/${templatesOrExamples.toLowerCase()}/`)[1]
        .replace(".tsx", "")
        .split("/");
      const folder = folderAndName[0];
      const name = folderAndName[1];
      const storyName = `${prefix}${name}`;

      code += `
        export default { title: "${templatesOrExamples}/${folder}/${storyName}" };
        export const Demo = { render: Example };
        Demo.storyName = "${storyName}";`;

      return loadCsf(code, { ...opts, fileName }).parse().indexInputs;
    };

    return [
      ...(indexers || []),
      {
        test: /(stories|story)\.[tj]sx?$/,
        createIndex: csfIndexer,
      },
      {
        test: /pages\/eksempler\/.+?.tsx$/,
        createIndex: customIndexer,
      },
      {
        test: /pages\/templates\/.+?.tsx$/,
        createIndex: customIndexer,
      },
    ];
  },
  staticDirs: ["../public"],
  stories: [
    "../**/*.mdx",
    "../**/*.stories.@(ts|tsx)",
    "../pages/eksempler/**/*.tsx",
    "../pages/templates/**/*.tsx",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (sbConfig: any) => {
    if (!sbConfig.resolve.alias) {
      return sbConfig;
    }
    // Add path aliases
    sbConfig.resolve.alias["@/sb-util"] = resolve(__dirname, "./utils.tsx");
    sbConfig.resolve.alias["@/types"] = resolve(
      __dirname,
      "../components/types/index.ts",
    );
    sbConfig.resolve.alias["@/sanity-block"] = resolve(
      __dirname,
      "../components/website-modules/SanityBlockContent.tsx",
    );
    sbConfig.resolve.alias["@/hooks"] = resolve(
      __dirname,
      "../components/hooks/",
    );
    sbConfig.resolve.alias["@/logging"] = resolve(
      __dirname,
      "../components/logging/index.ts",
    );
    sbConfig.resolve.alias["@/utils"] = resolve(
      __dirname,
      "../components/utils/index.ts",
    );
    sbConfig.resolve.alias["@/utils"] = resolve(
      __dirname,
      "../components/utils/index.ts",
    );
    sbConfig.resolve.alias["@/layout"] = resolve(
      __dirname,
      "../components/layout/",
    );
    sbConfig.resolve.alias["@/auth"] = resolve(
      __dirname,
      "../components/auth/",
    );
    sbConfig.resolve.alias["@/slack"] = resolve(
      __dirname,
      "../components/utils/slack/index.ts",
    );
    sbConfig.resolve.alias["@/assets"] = resolve(
      __dirname,
      "../components/assets/",
    );
    sbConfig.resolve.alias["@/web"] = resolve(
      __dirname,
      "../components/website-modules/",
    );
    sbConfig.resolve.alias["@/cms"] = resolve(
      __dirname,
      "../components/sanity-modules/",
    );
    sbConfig.resolve.alias["@/error-boundary"] = resolve(
      __dirname,
      "../components/website-modules/ErrorBoundary.tsx",
    );
    sbConfig.resolve.alias["@/sanity/config"] = resolve(
      __dirname,
      "../sanity/config.ts",
    );
    sbConfig.resolve.alias["@/sanity/client.server"] = resolve(
      __dirname,
      "../sanity/interface/client.server.js",
    );
    sbConfig.resolve.alias["@/sanity/interface"] = resolve(
      __dirname,
      "../sanity/interface/interface.ts",
    );
    sbConfig.resolve.alias["@/sanity/queries"] = resolve(
      __dirname,
      "../sanity/interface/queries.js",
    );

    return sbConfig;
  },
};
export default config;
