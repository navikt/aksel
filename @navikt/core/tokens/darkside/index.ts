import StyleDictionary from "style-dictionary";
import { buildFigmaConfig } from "./figma/figma-config";
import { completeGlobalLightScale } from "./tokens/global";
import { tokenConfigForUniqueTokens } from "./tokens/token-configs";
import { tokensForAllRoles, tokensWithPrefix } from "./util";

const DARKSIDE_DIST = "./dist/darkside/";

/*             selector: ".dark, .dark-theme",
 */
const SDictionary = new StyleDictionary({
  tokens: tokensWithPrefix({
    ...completeGlobalLightScale(),
    ...tokensForAllRoles(),
    ...tokenConfigForUniqueTokens(),
  }),
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: DARKSIDE_DIST,
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
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
          format: "typescript/es6-declarations",
          options: {
            outputStringLiterals: true,
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
          format: "javascript/es6",
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "tokens-cjs.js",
          format: "javascript/module-flat",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

const main = async () => {
  await buildFigmaConfig();

  await SDictionary.hasInitialized;

  await SDictionary.buildAllPlatforms();
};

main();
