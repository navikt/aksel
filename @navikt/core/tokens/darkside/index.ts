import fs from "fs";
import { bundle } from "lightningcss";
import StyleDictionary from "style-dictionary";
import { DesignTokens, Filter } from "style-dictionary/types";
import { ColorRolesList } from "../types";
import {
  formatCJS,
  formatES6,
  formatLESS,
  formatSCSS,
  transformCSS,
} from "./style-dictionary.formats";
import {
  allTokens,
  darkModeTokens,
  lightModeTokens,
  rootTokens,
  semanticRoleTokensWithGlobalReference,
} from "./tokens.config";
import { mergeConfigs, tokensWithPrefix } from "./tokens.util";
import {
  globalDarkTokens,
  globalLightTokens,
} from "./tokens/colors/global.tokens";
import { semanticTokensForRole } from "./tokens/colors/semantic-role.tokens";
import { semanticThemedBaseTokens } from "./tokens/colors/semantic-themed-base.tokens";

const DARKSIDE_DIST = "./dist/darkside/";

/* Global accumulator for built CSS-files */
const bundledCSSFiles: string[] = [];

main();

/**
 * This build will generate tokens for CSS, JS and TS.
 * The CSS tokens will be exported as CSS variables.
 * The JS and TS tokens will be exported as an object with the token name as key and the CSS variable as value.
 *
 * @note We currrently avoid exporting 'static' tokens, as this step might not be needed.
 * In the current implementation we don't account for light and dark mode for static exports. This will need to be added if we want static exports.
 */
async function main() {
  /**
   * Global tokens only for "light"-mode
   * We set this to :root and :host as to make this the fallback and default.
   */
  await buildCSSBundleForTokens({
    tokens: tokensWithPrefix(globalLightTokens),
    filename: "light-tokens.css",
    selector: ":root, :host, .light",
  });

  /**
   * Global tokens only for "dark"-mode
   */
  await buildCSSBundleForTokens({
    tokens: tokensWithPrefix(globalDarkTokens),
    filename: "dark-tokens.css",
    selector: ".dark",
  });

  /**
   * Semantic "root" tokens for "light"-mode
   * This includes shadows, default backgrounds etc
   */
  await buildCSSBundleForTokens({
    tokens: lightModeTokens(false),
    filename: "semantic-light-tokens.css",
    selector: ":root, :host, .light",
    filter: async (token) => token.type !== "global-color",
  });

  /**
   * Semantic "root" tokens for "dark"-mode
   * This includes shadows, default backgrounds etc
   */
  await buildCSSBundleForTokens({
    tokens: darkModeTokens(false),
    filename: "semantic-dark-tokens.css",
    selector: ".dark, .dark-theme",
    filter: async (token) => token.type !== "global-color",
  });

  /**
   * Semantic tokens for all modes.
   * Since the "global" layers is updated based on light/dark, we set this to also updated with
   * `.light, .dark` selectors so that they inherit the correct values.
   */
  await buildCSSBundleForTokens({
    tokens: semanticRoleTokensWithGlobalReference(),
    filename: "semantic-tokens.css",
    selector: ":root, :host, .light, .dark",
    filter: async (token) => token.type !== "global-color",
  });

  /**
   * Non-themable tokens like space, typo and breakpoints
   */
  await buildCSSBundleForTokens({
    tokens: rootTokens(),
    filename: "root-tokens.css",
    selector: ":root, :host",
  });

  await buildThemedRolesCSS();
  await buildOtherTokenFormats();

  fs.writeFileSync(
    `${DARKSIDE_DIST}tokens.css`,
    bundledCSSFiles.map((path) => `@import "${path}";`).join("\n"),
  );

  const { code } = bundle({
    filename: `${DARKSIDE_DIST}tokens.css`,
    minify: false,
  });

  fs.writeFileSync(`${DARKSIDE_DIST}tokens.css`, code);

  /* Cleanup temp-files */
  bundledCSSFiles.forEach((path) => fs.unlinkSync(`${DARKSIDE_DIST}${path}`));
}

/**
 * Creates smaller bundles for each role
 * ```
 * [data-color-role="accent"] {
 *   --ax-bg-soft: var(--ax-bg-accent-soft);
 *   --ax-bg-softA: var(--ax-bg-accent-softA);
 *   --ax-bg-moderate: var(--ax-bg-accent-moderate);
 *   ...
 * }
 * ```
 */
async function buildThemedRolesCSS() {
  for (const role of ColorRolesList) {
    const config = [
      globalLightTokens,
      semanticTokensForRole(role),
      semanticThemedBaseTokens(role),
    ];

    await buildCSSBundleForTokens({
      /* mergeConfigs is strictly typed, so we use any until we potentially update types */
      tokens: tokensWithPrefix(mergeConfigs(config as any)),
      filename: `role-${role}.css`,
      selector: `[data-color-role=${role}]`,
      filter: async (token) => token.type === "themed-role",
    });
  }
}

async function buildOtherTokenFormats() {
  const SDDictionaryNonCSSFormats = new StyleDictionary({
    tokens: allTokens(),
    platforms: {
      /* We don't want to build any files with CSS here, but have to add this for the formatting support */
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
      // jsStatic: {
      //   transformGroup: "js",
      //   buildPath: `${DARKSIDE_DIST}static/`,
      //   files: [
      //     {
      //       destination: "tokens.js",
      //       format: "format-ES6-static",
      //     },
      //     {
      //       destination: "tokens-cjs.js",
      //       format: "format-CJS-static",
      //     },
      //     {
      //       destination: "tokens.d.ts",
      //       format: "format-ES6-static",
      //     },
      //   ],
      // },
      scss: {
        transformGroup: "scss",
        buildPath: DARKSIDE_DIST,

        files: [
          {
            destination: "tokens.scss",
            format: "format-SCSS",
          },
        ],
      },
      // scssStatic: {
      //   transformGroup: "scss",
      //   buildPath: `${DARKSIDE_DIST}static/`,
      //   files: [
      //     {
      //       destination: "tokens.scss",
      //       format: "scss/variables",
      //     },
      //   ],
      // },
      less: {
        transformGroup: "less",
        buildPath: DARKSIDE_DIST,
        files: [
          {
            destination: "tokens.less",
            format: "format-LESS",
          },
        ],
      },
      // lessStatic: {
      //   transformGroup: "less",
      //   buildPath: `${DARKSIDE_DIST}static/`,
      //   files: [
      //     {
      //       destination: "tokens.less",
      //       format: "less/variables",
      //     },
      //   ],
      // },
    },
  });

  await Promise.all([SDDictionaryNonCSSFormats.hasInitialized]);

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

  // SDDictionaryNonCSSFormats.registerFormat({
  //   name: "format-ES6-static",
  //   format: formatES6Static,
  // });

  SDDictionaryNonCSSFormats.registerFormat({
    name: "format-CJS",
    format: formatCJS,
  });

  // SDDictionaryNonCSSFormats.registerFormat({
  //   name: "format-CJS-static",
  //   format: formatCJSStatic,
  // });

  SDDictionaryNonCSSFormats.registerFormat({
    name: "format-SCSS",
    format: formatSCSS,
  });

  SDDictionaryNonCSSFormats.registerFormat({
    name: "format-LESS",
    format: formatLESS,
  });

  await SDDictionaryNonCSSFormats.buildAllPlatforms();
}

/**
 * Utility function to build a CSS bundle for a given set of tokens.
 */
async function buildCSSBundleForTokens({
  tokens,
  filename,
  selector,
  filter,
}: {
  filename: string;
  selector: string;
  tokens: DesignTokens;
  filter?: Filter["filter"];
}) {
  const SDictionary = new StyleDictionary({
    tokens,
    /* Since we end up filtering out references for some tokens, we filter out warnings */
    log: { warnings: "disabled" },
    platforms: {
      [filename]: {
        transformGroup: "css",
        transforms: ["name/alpha-suffix"],
        buildPath: DARKSIDE_DIST,
        files: [
          {
            destination: filename,
            format: "css/variables",
            filter,
            options: {
              outputReferences: true,
              selector,
            },
          },
        ],
      },
    },
  });

  await Promise.all([SDictionary.hasInitialized]);

  SDictionary.registerTransform(transformCSS);
  await SDictionary.buildAllPlatforms();
  bundledCSSFiles.push(filename);
}
