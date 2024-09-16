import fs from "fs";
import StyleDictionary from "style-dictionary";
import { fileHeader } from "style-dictionary/utils";
import { buildFigmaConfig } from "./figma/figma-config";
import { darkModeTokens, lightModeTokens, scaleTokens } from "./util";

/* Temporary project location */
const DARKSIDE_DIST = "./dist/darkside/";

/**
 * StyleDictionary configuration
 * This configuration will generate tokens for CSS, JS and TS.
 * The CSS tokens will be exported as CSS variables.
 * The JS and TS tokens will be exported as an object with the token name as key and the CSS variable as value.
 *
 * Future additions (not needed for testing):
 * - Shadows
 * - Typography
 * - Breakpoints
 */
const SDictionaryLightMode = new StyleDictionary({
  tokens: lightModeTokens(),
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "light-tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
            outputReferenceFallbacks: true,
            selector: ":root, :host, .light, .light-theme",
          },
        },
      ],
    },
    ts: {
      transformGroup: "js",
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "tokens.d.ts",
          format: "format-js-esm",
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "tokens.js",
          format: "format-js-esm",
        },
        {
          destination: "tokens-cjs.js",
          format: "format-js-module-flat",
        },
      ],
    },
  },
});

const SDictionaryDarkMode = new StyleDictionary({
  tokens: darkModeTokens(),
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "dark-tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
            outputReferenceFallbacks: true,
            selector: ".dark, .dark-theme",
          },
        },
      ],
    },
  },
});

const SDictionaryScaleTokens = new StyleDictionary({
  tokens: scaleTokens(),
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "scale-tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
            outputReferenceFallbacks: true,
            selector: ":root, :host",
          },
        },
      ],
    },
  },
});

const main = async () => {
  await buildFigmaConfig();

  await SDictionaryLightMode.hasInitialized;
  await SDictionaryDarkMode.hasInitialized;
  await SDictionaryScaleTokens.hasInitialized;

  /**
   * To support theming in the future, we need to export the tokens as CSS variables.
   * By default StyleDictionary does not support this and only outputs to color-values,
   * so we need to create a custom format.
   */
  SDictionaryLightMode.registerFormat({
    name: "format-js-esm",
    format: async ({ dictionary, file }) => {
      const header = await fileHeader({ file });
      return (
        header +
        dictionary.allTokens
          .map((token) => {
            return `export const ${token.name} = "var(--${token.path.join(
              "-",
            )})";`;
          })
          .join("\n") +
        "\n"
      );
    },
  });

  /**
   * To support theming in the future, we need to export the tokens as CSS variables.
   * By default StyleDictionary does not support this and only outputs to color-values,
   * so we need to create a custom format.
   */
  SDictionaryLightMode.registerFormat({
    name: "format-js-module-flat",
    format: async ({ dictionary, file }) => {
      const header = await fileHeader({ file });
      return (
        header +
        "module.exports = {\n" +
        dictionary.allTokens
          .map((token, idx, arr) => {
            return `  "${token.name}": "var(--${token.path.join("-")})"${
              idx !== arr.length - 1 ? "," : ""
            }`;
          })
          .join("\n") +
        "\n};" +
        "\n"
      );
    },
  });

  await SDictionaryLightMode.buildAllPlatforms();
  await SDictionaryDarkMode.buildAllPlatforms();
  await SDictionaryScaleTokens.buildAllPlatforms();

  const importPaths = [
    "light-tokens.css",
    "dark-tokens.css",
    "scale-tokens.css",
  ];

  fs.writeFileSync(
    `${DARKSIDE_DIST}tokens.css`,
    importPaths.map((path) => `@import "${path}";`).join("\n"),
  );
};

main();
