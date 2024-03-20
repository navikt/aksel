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

const config: StorybookConfig = {
  storyIndexers: (indexers) => {
    const csfIndexer = async (fileName: string, opts) => {
      const code = readFileSync(fileName, "utf-8").toString();
      return loadCsf(code, { ...opts, fileName }).parse();
    };

    const exampleIndexer = async (fileName: string, opts) => {
      let code = readFileSync(fileName, "utf-8").toString();

      code = code.replace(
        /^\s*export default withDsExample\(Example[\s\S]*?;\s*/gm,
        "",
      );

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
