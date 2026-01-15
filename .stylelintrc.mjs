import { createRequire } from "node:module";
import { dirname } from "node:path";

const require = createRequire(import.meta.url);

/* Use require.resolve to get absolute path - works regardless of CWD in monorepo */
const tokensPath =
  dirname(require.resolve("@navikt/ds-tokens")) + "/tokens.css";

export default {
  overrides: [
    {
      files: ["@navikt/core/css/**/*"],
      rules: {
        "aksel/design-token-no-global-override": null,
        "aksel/no-internal-tokens": null,
        "aksel/no-class-override": null,
      },
    },
    {
      files: ["aksel.nav.no/website/**/*.module.css"],
      rules: {
        "selector-pseudo-class-no-unknown": [
          true,
          {
            ignorePseudoClasses: ["global"],
          },
        ],
      },
    },
    {
      files: ["**/*.module.css"],
      rules: {
        "selector-class-pattern": [
          "^[a-z][a-zA-Z0-9]+$",
          {
            message: "Expected class selector to be camelCase",
          },
        ],
      },
    },
  ],
  extends: [
    "stylelint-config-standard",
    "./@navikt/aksel-stylelint/dist/recommended",
  ],
  plugins: [
    "stylelint-value-no-unknown-custom-properties",
    "stylelint-declaration-block-no-ignored-properties",
  ],
  rules: {
    "declaration-property-value-no-unknown": true,
    "plugin/declaration-block-no-ignored-properties": true,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "keyframes-name-pattern": null,
    "function-url-quotes": null,
    "property-no-vendor-prefix": null,
    "alpha-value-notation": "number",
    "media-feature-range-notation": "prefix",
    "import-notation": "string",
    "declaration-block-no-redundant-longhand-properties": [
      true,
      {
        ignoreShorthands: ["grid-template"],
      },
    ],
    "declaration-property-value-disallowed-list": {
      "justify-content": ["start", "end"],
      "align-items": ["start", "end"],
    },
    "value-keyword-case": [
      "lower",
      {
        camelCaseSvgKeywords: true,
      },
    ],
    "csstools/value-no-unknown-custom-properties": [
      true,
      {
        importFrom: [tokensPath],
      },
    ],
  },
  ignoreFiles: [
    "**/dist/**",
    "**/@navikt/codemod/**",
    "**/@navikt/aksel/**",
    "**/examples/**",
    "plugin.js",
  ],
};
