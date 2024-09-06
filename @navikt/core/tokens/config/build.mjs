import StyleDictionary from "style-dictionary";
import { kebabCase } from "./kebabCase.mjs";

const V1_DIST = "dist/";
const V2_DIST = "dist/temp/";

const kebabTransform = {
  name: "name/cti/kebab",
  type: "name",
  transform: (prop, options) =>
    kebabCase([options.prefix].concat(prop.path).join(" ")),
};

const dictionaryV1 = new StyleDictionary({
  source: ["src/v1/index.js", "src/v1/**/*.json"],
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

const dictionaryV2Light = new StyleDictionary({
  source: ["src/v2/**/*-light.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: V2_DIST,
      files: [
        {
          destination: "tokens-light.css",
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
      buildPath: V2_DIST,
      files: [
        {
          destination: "tokens-light.d.ts",
          format: "typescript/es6-declarations",
          options: {
            outputStringLiterals: true,
          },
        },
      ],
    },
  },
});

const dictionaryV2Dark = new StyleDictionary({
  source: ["src/v2/**/*-dark.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: V2_DIST,
      files: [
        {
          destination: "tokens-dark.css",
          format: "css/variables",
          options: {
            outputReferences: true,
            selector: ".dark, .dark-theme",
          },
        },
      ],
    },
    ts: {
      transformGroup: "js",
      buildPath: V2_DIST,
      files: [
        {
          destination: "tokens-dark.d.ts",
          format: "typescript/es6-declarations",
          options: {
            outputStringLiterals: true,
          },
        },
      ],
    },
  },
});

async function buildDictionary() {
  await dictionaryV1.hasInitialized;
  dictionaryV1.registerTransform(kebabTransform);
  await dictionaryV1.buildAllPlatforms();

  await dictionaryV2Light.hasInitialized;
  dictionaryV2Light.registerTransform(kebabTransform);
  await dictionaryV2Light.buildAllPlatforms();

  await dictionaryV2Dark.hasInitialized;
  dictionaryV2Dark.registerTransform(kebabTransform);
  await dictionaryV2Dark.buildAllPlatforms();
}

buildDictionary();
