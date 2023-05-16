module.exports = {
  plugins: ["."],
  rules: {
    "@navikt/aksel-design-tokens": {
      tokenDefinitionsFile: "./index.css",
      overrideableTokenDefinitionsJSONFile: "./tokens.json",
      controlledPrefixes: [/--ac-.+/, /--a-.+/],
    },
  },
};
