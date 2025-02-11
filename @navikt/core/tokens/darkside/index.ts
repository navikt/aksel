import fs from "fs";
import { bundle } from "lightningcss";
import _ from "lodash";
import StyleDictionary from "style-dictionary";
import { DesignTokens, Filter } from "style-dictionary/types";
import { ColorRolesList, SemanticColorRoles } from "../types";
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
import { tokensWithPrefix } from "./tokens.util";
import {
  globalDarkTokens,
  globalLightTokens,
} from "./tokens/colors/global.tokens";
import { semanticTokensForRole } from "./tokens/colors/semantic-role.tokens";
import { semanticThemedBaseTokens } from "./tokens/colors/semantic-themed-base.tokens";

/* Temporary project location */
const DARKSIDE_DIST = "./dist/darkside/";

const filenames = {
  light: {
    css: "light-tokens.css",
    semanticCss: "semantic-light-tokens.css",
    js: "tokens.js",
    ts: "tokens.d.ts",
  },
  dark: {
    css: "dark-tokens.css",
    semanticCss: "semantic-dark-tokens.css",
  },
  semantic: {
    css: "semantic-tokens.css",
  },
  root: {
    css: "root-tokens.css",
  },
};

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
    platforms: {
      css: {
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
}

/**
 * StyleDictionary configuration
 * This configuration will generate tokens for CSS, JS and TS.
 * The CSS tokens will be exported as CSS variables.
 * The JS and TS tokens will be exported as an object with the token name as key and the CSS variable as value.
 *
 *
 * @note We currrently avoid exporting 'static' tokens, as this step might not be needed.
 * In the current implementation we don't account for light and dark mode for static exports. This will need to be added if we want static exports.
 */

const SDRootTokens = new StyleDictionary({
  tokens: rootTokens(),
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "root-tokens.css",
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

const themedRoleConfig = async (role: SemanticColorRoles) => {
  const SDDictionary = new StyleDictionary({
    tokens: tokensWithPrefix(
      [
        globalLightTokens,
        semanticTokensForRole(role),
        semanticThemedBaseTokens(role),
      ].reduce((acc, config) => _.merge(acc, config), {}),
    ),
    /* We get warnings for filtering out referenced tokens now */
    log: { warnings: "disabled" },
    platforms: {
      css: {
        transformGroup: "css",
        transforms: ["name/alpha-suffix"],
        buildPath: DARKSIDE_DIST,
        files: [
          {
            destination: `role-${role}.css`,
            format: "css/variables",
            filter: async (token) => token.type === "themed-role",
            options: {
              outputReferences: true,
              selector: `[data-color-role=${role}]`,
            },
          },
        ],
      },
    },
  });

  await Promise.all([SDDictionary.hasInitialized]);
  SDDictionary.registerTransform(transformCSS);
  await Promise.all([SDDictionary.buildAllPlatforms()]);
};

const createThemedRoleConfigs = async () => {
  await Promise.all(
    ColorRolesList.map((role) => themedRoleConfig(role as SemanticColorRoles)),
  );
};

const main = async () => {
  /**
   * Global tokens only for "light"-mode
   * We set this to :root and :host as to make this the fallback and default.
   */
  await buildCSSBundleForTokens({
    tokens: globalLightTokens,
    filename: filenames.light.css,
    selector: ":root, :host, .light",
  });

  /**
   * Global tokens only for "dark"-mode
   */
  await buildCSSBundleForTokens({
    tokens: globalDarkTokens,
    filename: filenames.light.css,
    selector: ".dark, .dark-theme",
  });

  /**
   * Semantic "root" tokens for "light"-mode
   * This includes shadows, default backgrounds etc
   */
  await buildCSSBundleForTokens({
    tokens: lightModeTokens(false),
    filename: filenames.light.semanticCss,
    selector: ":root, :host, .light",
    filter: async (token) => token.type !== "global-color",
  });

  /**
   * Semantic "root" tokens for "dark"-mode
   * This includes shadows, default backgrounds etc
   */
  await buildCSSBundleForTokens({
    tokens: darkModeTokens(false),
    filename: filenames.dark.semanticCss,
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
    filename: filenames.semantic.css,
    selector: ":root, :host, .light, .dark",
    filter: async (token) => token.type !== "global-color",
  });

  await Promise.all([
    SDRootTokens.hasInitialized,
    SDDictionaryNonCSSFormats.hasInitialized,
  ]);

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

  await Promise.all([
    SDRootTokens.buildAllPlatforms(),
    SDDictionaryNonCSSFormats.buildAllPlatforms(),
  ]);

  const importPaths = Object.values(filenames)
    .map((scope) => scope.css)
    .filter(Boolean);

  fs.writeFileSync(
    `${DARKSIDE_DIST}tokens.css`,
    [
      ...importPaths.map((path) => `@import "${path}";`),
      ...ColorRolesList.map((role) => `@import "role-${role}.css";`),
    ].join("\n"),
  );

  await createThemedRoleConfigs();

  const { code } = bundle({
    filename: `${DARKSIDE_DIST}tokens.css`,
    minify: false,
  });

  fs.writeFileSync(`${DARKSIDE_DIST}tokens.css`, code);
};

main();
