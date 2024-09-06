import StyleDictionary from "style-dictionary";
import { kebabCase } from "./kebabCase.mjs";

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
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.scss",
          format: "scss/variables",
        },
      ],
    },
    less: {
      transformGroup: "less",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.less",
          format: "less/variables",
        },
      ],
    },
    css: {
      transformGroup: "css",
      buildPath: "dist/",
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
      buildPath: "dist/",
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
      buildPath: "dist/",
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
