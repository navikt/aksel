import { readFileSync } from "node:fs";
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

const websiteGlobalsPath = resolve(
  __dirname,
  "aksel.nav.no",
  "website",
  "app",
  "globals.css",
);

const dsCssBrowserslist = JSON.parse(
  readFileSync(
    resolve(__dirname, "@navikt", "core", "css", "package.json"),
    "utf8",
  ),
).browserslist;

/** Runtime custom properties injected via inline styles by `@navikt/ds-react`. */
const dsCssRuntimeCustomProperties = {
  "--__axc-action-menu-content-available-height": "initial",
  "--__axc-action-menu-content-transform-origin": "initial",
  "--__axc-data-table-nested-depth": "initial",
  "--__axc-floating-anchor-width": "initial",
  "--__axc-floating-available-height": "initial",
  "--__axc-floating-transform-origin": "initial",
  "--__axc-nested-level": "initial",
  "--__axc-textarea-height": "initial",
};

export default {
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  reportDescriptionlessDisables: true,
  reportUnscopedDisables: true,
  overrides: [
    {
      files: ["@navikt/core/css/**/*"],
      rules: {
        "aksel/design-token-no-global-override": null,
        "aksel/no-internal-tokens": null,
        "aksel/no-class-override": null,
        "custom-property-pattern": "^(?:ax|__axc)-[a-zA-Z0-9-]+$",
        "csstools/value-no-unknown-custom-properties": [
          true,
          {
            importFrom: [
              tokensPath,
              { customProperties: dsCssRuntimeCustomProperties },
            ],
          },
        ],
        "plugin/no-unsupported-browser-features": [
          true,
          {
            browsers: dsCssBrowserslist,
            ignorePartialSupport: true,
            ignore: [
              /* Lowered by LightningCSS in @navikt/core/css/config/bundle.ts */
              "css-nesting",
              "css-media-range-syntax",
              "css-rrggbbaa",
              /* Progressive enhancements */
              "css3-cursors",
              "css3-cursors-grab",
              "css-resize",
              "css-scrollbar",
              "css-overscroll-behavior",
              "css-grid-animation",
              "css-marker-pseudo",
              "css-touch-action",
              "css-widows-orphans",
              "extended-system-fonts",
            ],
          },
        ],
      },
    },
    {
      files: ["aksel.nav.no/website/**/*"],
      rules: {
        "csstools/value-no-unknown-custom-properties": [
          true,
          {
            importFrom: [tokensPath, websiteGlobalsPath],
          },
        ],
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
    "stylelint-no-unsupported-browser-features",
  ],
  rules: {
    "plugin/declaration-block-no-ignored-properties": true,
    "no-unknown-animations": true,
    "no-unknown-custom-media": true,
    "function-no-unknown": true,
    "unit-no-unknown": true,
    "selector-no-deprecated": true,
    "selector-max-id": 0,
    "max-nesting-depth": 3,
    "selector-max-compound-selectors": 4,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "keyframes-name-pattern": null,
    "property-no-vendor-prefix": null,
    "alpha-value-notation": "number",
    "import-notation": "string",
    "declaration-property-unit-disallowed-list": {
      "font-size": ["px"],
    },
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
    "**/.next/**",
    "**/storybook-static/**",
    "**/@navikt/aksel/**",
    "**/examples/**",
    "**/tailwind4.css",
  ],
};
