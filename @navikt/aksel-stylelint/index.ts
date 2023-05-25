/**
 * @type {import('./plugins/coverage').PrimaryOptions} The stylelint-polaris/coverage rule expects a 3-dimensional rule config that groups Stylelint rules by coverage categories. It reports problems with dynamic rule names by appending the category to the coverage plugin's rule name

(e.g., Unexpected named color "blue" - Please use a Polaris color token Stylelint(polaris/colors/color-named)")
*/
/* const stylelintPolarisCoverageOptions = {
  border: [
    {
      "declaration-property-unit-disallowed-list": [],
      "polaris/at-rule-disallowed-list": {
        include: [
          "high-contrast-border",
          "high-contrast-button-outline",
          "high-contrast-outline",
          "focus-ring",
          "no-focus-ring",
        ].map(matchNameRegExp),
      },
      "polaris/custom-property-disallowed-list": {},
    },
    {
      message: "Please use a Polaris border token",
    },
  ],
  color: [
    {
      "color-named": "never",
      "color-no-hex": true,
      "scss/function-color-relative": true,
      "function-disallowed-list": [
        // Include Sass namespace
        // https://regex101.com/r/UdW0oV/1
        "brightness",
        "contrast",
        "hue-rotate",
        "hsl",
        "hsla",
        "invert",
        "rgb",
        "rgba",
        "sepia",
        ...["color-multiply", "color", "filter"].map(matchNameRegExp),
      ],
      "polaris/at-rule-disallowed-list": {
        include: [
          // Legacy mixins
          "recolor-icon",
          "ms-high-contrast-color",
        ].map(matchNameRegExp),
      },
      "polaris/custom-property-disallowed-list": {},
      "polaris/global-disallowed-list": [],
    },
    {
      message: "Please use a Polaris color token",
    },
  ],
  conventions: {
    "selector-disallowed-list": [
      [/class[*^~]?='Polaris-[a-z_-]+'/gi],
      {
        message:
          "Overriding Polaris styles is disallowed. Please consider contributing instead",
      },
    ],
    "polaris/custom-property-allowed-list": {
      // Allows definition of custom properties not prefixed with `--p-`, `--pc-`, or `--polaris-version-`
      allowedProperties: [/--(?!(p|pc|polaris-version)-).+/],
      // Allows use of custom properties prefixed with `--p-` that are valid Polaris tokens
      allowedValues: {
        "/.+/": [
          // Note: Order is important
          // This pattern allows use of `--p-*` custom properties that are valid Polaris tokens
          ...getCustomPropertyNames(tokens),
          // This pattern flags unknown `--p-*` custom properties or usage of deprecated `--pc-*` custom properties private to polaris-react
          /--(?!(p|pc)-).+/,
        ],
      },
    },
  },
  layout: [
    {
      "declaration-property-value-disallowed-list": [],
      "property-disallowed-list": [],
      "function-disallowed-list": [
        "nav-min-window-corrected",
        "control-height",
        "control-slim-height",
        "mobile-nav-width",
        "thumbnail-size",
        "top-bar-height",
      ].map(matchNameRegExp),
      "polaris/at-rule-disallowed-list": {
        include: ["layout-flex-fix", "safe-area-for"].map(matchNameRegExp),
      },
      "polaris/custom-property-disallowed-list": {},
      "polaris/global-disallowed-list": [],
    },
    {
      message:
        "Consider using a Polaris layout component if applicable for this layout style",
    },
  ],
  legacy: [
    {},
    {
      message: "Please use a Polaris token or component",
    },
  ],
  "media-queries": [
    {
      "polaris/media-query-allowed-list": {},
      // Legacy functions
      "function-disallowed-list": [],
      // Legacy mixins
      "polaris/at-rule-disallowed-list": {},
    },
    {
      message: "Please use a Polaris breakpoint token",
    },
  ],
  motion: [
    {},
    {
      message: "Please use a Polaris motion token",
    },
  ],
  shadow: [
    {
      "function-disallowed-list": ["shadow"].map(matchNameRegExp),
      "declaration-property-unit-disallowed-list": [
        {
          "box-shadow": disallowedUnits,
        },
      ],
      "property-disallowed-list": ["text-shadow"],
      "polaris/custom-property-disallowed-list": {
        disallowedProperties: disallowedVarsShadow,
        disallowedValues: { "/.+/": disallowedVarsShadow },
      },
      "polaris/global-disallowed-list": [
        // Legacy mixin map-get data
        /\$shadows-data/,
      ],
    },
    {
      message: "Please use a Polaris shadow token",
    },
  ],
  space: [
    {
      "function-disallowed-list": ["control-vertical-padding"].map(
        matchNameRegExp
      ),
      "declaration-property-unit-disallowed-list": [{}],
      "polaris/custom-property-disallowed-list": {},
      "polaris/global-disallowed-list": [],
    },
    {
      message: "Please use a Polaris space token",
    },
  ],
  typography: [
    {
      "polaris/declaration-property-value-disallowed-list": {
        "font-weight": [/(\$.*|[0-9]+)/],
      },
      "declaration-property-unit-disallowed-list": [
        {
          "/^font/": disallowedUnits,
          "line-height": disallowedUnits,
        },
      ],
      "property-disallowed-list": ["text-transform"],
      "function-disallowed-list": ["font-size", "line-height"].map(
        matchNameRegExp
      ),
      "polaris/at-rule-disallowed-list": {
        include: [
          "truncate",
          "text-breakword",
          "text-emphasis-normal",
          "text-emphasis-strong",
          "text-emphasis-subdued",
          "text-style-body",
          "text-style-button-large",
          "text-style-button",
          "text-style-caption",
          "text-style-display-large",
          "text-style-display-medium",
          "text-style-display-small",
          "text-style-display-x-large",
          "text-style-heading",
          "text-style-input",
          "text-style-subheading",
        ].map(matchNameRegExp),
      },
      "polaris/global-disallowed-list": [
        // Legacy mixin map-get data
        /\$base-font-size/,
        /\$line-height-data/,
        /\$font-size-data/,
        /\$default-browser-font-size/,
      ],
    },
    {
      message: "Please use a Polaris font token or typography component",
    },
  ],
  "z-index": [
    {
      "declaration-property-value-allowed-list": [
        {
          "z-index": Object.keys(tokens.zIndex).map(
            (token) => `var(${createVar(token)})`
          ),
        },
      ],
      "function-disallowed-list": ["z-index"].map(matchNameRegExp),
      "polaris/custom-property-disallowed-list": {
        disallowedProperties: disallowedVarsZIndex,
        disallowedValues: { "/.+/": disallowedVarsZIndex },
      },
      "polaris/global-disallowed-list": [
        // Legacy mixin map-get data
        /\$fixed-element-stacking-order/,
        /\$global-elements/,
      ],
    },
    {
      message: "Please use a Polaris z-index token",
    },
  ],
}; */

/** @type {import('stylelint').Config} */
module.exports = {
  /* reportDescriptionlessDisables: true,
  reportNeedlessDisables: true, */
  reportInvalidScopeDisables: [
    true,
    {
      // Report invalid scope disables for all rules except coverage rules
      // Note: This doesn't affect the default Stylelint behavior/reporting
      // and is only need because we dynamically create these rule names
      except: /^polaris\/.+?\/.+$/,
    },
  ],
  plugins: ["./plugins/coverage", "./plugins/at-rule"],
  rules: {
    "aksel/coverage": {
      test: [
        { "aksel/at-rule-disallowed-list": {} },
        {
          message: "Please work 🙏",
        },
      ],
    },
  },
};
