import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tokensPath = resolve(
  __dirname,
  "@navikt",
  "core",
  "tokens",
  "dist",
  "tokens.css",
);

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
