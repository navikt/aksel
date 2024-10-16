import fs from "fs";
import { bundle } from "lightningcss";
import StyleDictionary from "style-dictionary";
import {
  allTokens,
  darkModeTokens,
  lightModeTokens,
  scaleTokens,
} from "./create-configuration";
import { formatCJS, formatES6, transformCSS } from "./sd-format";

/* Temporary project location */
const DARKSIDE_DIST = "./dist/darkside/";

const filenames = {
  light: {
    css: "light-tokens.css",
    js: "tokens.js",
    ts: "tokens.d.ts",
  },
  dark: {
    css: "dark-tokens.css",
  },
  scale: {
    css: "scale-tokens.css",
  },
};

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
      transforms: ["name/alpha-suffix"],
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "light-tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
            selector: ":root, :host, .light, .light-theme",
          },
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
      transforms: ["name/alpha-suffix"],
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "dark-tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
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

const SDDictionaryNonCSSFormats = new StyleDictionary({
  tokens: allTokens(),
  platforms: {
    /* We don't want to build any files with CSS here, only add the formatting support */
    css: {
      transformGroup: "css",
      transforms: ["name/alpha-suffix"],
      files: [
        {
          format: "css/variables",
          options: {
            outputReferences: true,
            outputReferenceFallbacks: true,
          },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "tokens.js",
          format: "format-ES6",
        },
        {
          destination: "tokens-cjs.js",
          format: "format-CJS",
        },
        {
          destination: "tokens.d.ts",
          format: "format-ES6",
        },
      ],
    },
  },
});

const main = async () => {
  await Promise.all([
    SDictionaryLightMode.hasInitialized,
    SDictionaryDarkMode.hasInitialized,
    SDictionaryScaleTokens.hasInitialized,
    SDDictionaryNonCSSFormats.hasInitialized,
  ]);

  SDictionaryLightMode.registerTransform(transformCSS);
  SDictionaryDarkMode.registerTransform(transformCSS);
  SDDictionaryNonCSSFormats.registerTransform(transformCSS);

  /**
   * To support theming in the future, we need to export the tokens as CSS variables.
   * By default StyleDictionary does not support this and only outputs to color-values,
   * so we need to create a custom format.
   */
  SDDictionaryNonCSSFormats.registerFormat({
    name: "format-ES6",
    format: formatES6,
  });

  /**
   * To support theming in the future, we need to export the tokens as CSS variables.
   * By default StyleDictionary does not support this and only outputs to color-values,
   * so we need to create a custom format.
   */
  SDDictionaryNonCSSFormats.registerFormat({
    name: "format-CJS",
    format: formatCJS,
  });

  await Promise.all([
    SDictionaryLightMode.buildAllPlatforms(),
    SDictionaryDarkMode.buildAllPlatforms(),
    SDictionaryScaleTokens.buildAllPlatforms(),
    SDDictionaryNonCSSFormats.buildAllPlatforms(),
  ]);

  const importPaths = Object.values(filenames)
    .map((scope) => scope.css)
    .filter(Boolean);

  fs.writeFileSync(
    `${DARKSIDE_DIST}tokens.css`,
    importPaths.map((path) => `@import "${path}";`).join("\n"),
  );

  const { code } = bundle({
    filename: `${DARKSIDE_DIST}tokens.css`,
    minify: false,
  });

  fs.writeFileSync(`${DARKSIDE_DIST}tokens.css`, code);
};

main();
