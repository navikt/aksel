module.exports = {
  plugins: ["."],
  rules: {
    "@navikt/aksel-design-token-exists": {
      tokenDefinitionsFile: "./index.css",
      overrideableTokenDefinitionsJSONFile: "./tokens.json",
      controlledPrefixes: [/^--ac-.+/, /^--a-.+/],
    },
    "@navikt/aksel-no-internal-tokens": [
      true,
      {
        controlledPrefixes: [/^--__ac-.+/],
      },
    ],
  },
};
