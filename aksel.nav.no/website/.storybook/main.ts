import { loadCsf } from "@storybook/csf-tools";
import type { StorybookConfig } from "@storybook/nextjs";
import { readFileSync } from "fs";
import { resolve } from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const indexRegex = /export const args = {\s+index: (\d+),/;

const sbConfig: StorybookConfig = {
  experimental_indexers: (indexers) => {
    // Changes here might need to be reflected in .storybook/main.ts
    const customIndexer = async (fileName: string, opts) => {
      let code = readFileSync(fileName, "utf-8").toString();

      const isTemplate = fileName.toLowerCase().includes("templates");
      const templatesOrExamples = isTemplate ? "Templates" : "Eksempler";

      const matches = indexRegex.exec(code);
      const prefix = matches ? `${matches[1]} | ` : "";

      code = code.split(
        /\/\/ EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE/,
      )[0];

      const [folder, name] = fileName
        .split(`pages/${templatesOrExamples.toLowerCase()}/`)[1]
        .replace(".tsx", "")
        .split("/");
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
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/nextjs",
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (async (config) => {
    if (!config?.resolve) {
      return config;
    }
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, "../tsconfig.json"),
      }),
    ];
    return config;
  }) satisfies StorybookConfig["webpackFinal"],
};
export default sbConfig;
