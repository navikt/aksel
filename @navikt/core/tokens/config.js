module.exports = {
  source: ["src/index.js", "src/**/*.json"],
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
};
