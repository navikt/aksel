import StyleDictionary from "style-dictionary";
import {
  PlatformConfig,
  Transform,
  TransformedToken,
} from "style-dictionary/types";
import { kebabCase } from "./kebabCase";

const V1_DIST = "dist/";

const kebabTransform: Transform = {
  name: "name/cti/kebab",
  type: "name",
  transform: (token: TransformedToken, options: PlatformConfig) =>
    kebabCase([options.prefix].concat(token.path).join(" ")),
};

const dictionaryV1 = new StyleDictionary({
  source: ["src/index.js", "src/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: V1_DIST,
      files: [
        {
          destination: "tokens.scss",
          format: "scss/variables",
        },
      ],
    },
    less: {
      transformGroup: "less",
      buildPath: V1_DIST,
      files: [
        {
          destination: "tokens.less",
          format: "less/variables",
        },
      ],
    },
    css: {
      transformGroup: "css",
      buildPath: V1_DIST,
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
            selector: ":root, :host",
          },
        },
      ],
    },
    ts: {
      transformGroup: "js",
      buildPath: V1_DIST,
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
      buildPath: V1_DIST,
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
        {
          destination: "tokens-cjs.js",
          format: "javascript/module-flat",
        },
      ],
    },
  },
});

async function buildDictionary() {
  await dictionaryV1.hasInitialized;
  dictionaryV1.registerTransform(kebabTransform);
  await dictionaryV1.buildAllPlatforms();
}

buildDictionary();
