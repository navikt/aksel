import type { StorybookConfig } from "@storybook/nextjs";

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { loadCsf } from "@storybook/csf-tools";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  storyIndexers: (indexers) => {
    const csfIndexer = async (fileName: string, opts) => {
      const code = readFileSync(fileName, "utf-8").toString();
      return loadCsf(code, { ...opts, fileName }).parse();
    };

    const exampleIndexer = async (fileName: string, opts) => {
      let code = readFileSync(fileName, "utf-8").toString();

      code = code
        .split("\n")
        .filter((line) => !line.includes("withDsExample"))
        .join("\n");

      code = code.replace("export const args =", "const args =");

      code += `\nexport default { title: "Eksempler/${fileName
        .split("pages/eksempler/")[1]
        .replace(".tsx", "")}"  };\n`;

      return loadCsf(code, { ...opts, fileName }).parse();
    };

    return [
      ...(indexers || []),
      {
        test: /(stories|story)\.[tj]sx?$/,
        indexer: csfIndexer,
      },
      {
        test: /pages\/eksempler\/|(".+")|(.+.tsx)$/,
        indexer: exampleIndexer,
      },
    ];
  },
  staticDirs: ["../public"],
  stories: [
    "../**/*.mdx",
    "../**/*.stories.@(ts|tsx)",
    "../pages/eksempler/**/*.tsx",
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
};
export default config;
