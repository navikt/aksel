import fs from "fs";
import { bundle } from "lightningcss";
import _ from "lodash";
import StyleDictionary from "style-dictionary";
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
} from "./tokens.config";
import { tokensWithPrefix } from "./tokens.util";
import { globalColorLightModeConfig } from "./tokens/global";
import { configForRole, themedConfigForRole } from "./tokens/semantic-roles";

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
  root: {
    css: "root-tokens.css",
  },
};

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
        globalColorLightModeConfig,
        configForRole(role),
        themedConfigForRole(role),
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
  await Promise.all([
    SDictionaryLightMode.hasInitialized,
    SDictionaryDarkMode.hasInitialized,
    SDRootTokens.hasInitialized,
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
    SDictionaryLightMode.buildAllPlatforms(),
    SDictionaryDarkMode.buildAllPlatforms(),
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
