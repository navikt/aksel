const js = require("@eslint/js");
const next = require("@next/eslint-plugin-next");
const vitest = require("@vitest/eslint-plugin");
const akselLocal = require("eslint-plugin-aksel-local");
const importPlugin = require("eslint-plugin-import");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const reactPlugin = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const storybook = require("eslint-plugin-storybook");
const testingLibrary = require("eslint-plugin-testing-library");
const { globalIgnores } = require("eslint/config");
const globals = require("globals");
const tseslint = require("typescript-eslint");

/**
 * TODO:
 * - Replace tseslint.configs.recommended with tseslint.configs.recommendedTypeChecked
 * - Look into opinionated stylistic plugin (e.g. tseslint.configs.stylisticTypeChecked)
 * - Consider adding the rule "id-length"
 */

module.exports = tseslint.config([
  globalIgnores([
    "**/lib",
    "**/public",
    "**/esm",
    "**/cjs",
    "**/dist",
    "@navikt/aksel/**/*.input.*",
    "@navikt/aksel/**/*.output.*",
    "**/codemod/**/*.js",
    "!**/.storybook",
    "**/playwright-report/**/*",
    "**/tokens/**/plugin.js",
    "**/.next",
    "examples/referansesider",
    "examples/astro/.astro",
  ]),
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  //reactPlugin.configs.flat["jsx-runtime"], // Not sure if this will cause problems for projects not using the new JSX transform
  reactHooks.configs["recommended-latest"],
  jsxA11y.flatConfigs.recommended,
  storybook.configs["flat/recommended"],
  {
    settings: { react: { version: "detect" } }, // Allows eslint-plugin-react to detect installed react-version
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "react/jsx-curly-brace-presence": [
        "error",
        { propElementValues: "always" },
      ],
      "react/prop-types": "off", // Temporary
      "react/display-name": "off", // Temporary
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "import/no-unresolved": "off",
      "array-callback-return": "error",
      "object-shorthand": "error",
      "no-else-return": "error",
      "no-console": [
        "warn",
        {
          allow: [
            "info",
            "warn",
            "error",
            "group",
            "groupEnd",
            "table",
            "assert",
            "countReset",
            "count",
            "dir",
            "time",
            "timeEnd",
            "timeStamp",
          ],
        },
      ],
      "import/no-named-as-default": "off", // Temporary
      "@typescript-eslint/no-shadow": ["error", { hoist: "all" }], // TODO: Consider { builtinGlobals: true }
      "@typescript-eslint/no-explicit-any": "off", // Temporary
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        /* https://eslint.org/docs/latest/rules/no-unused-expressions#allowshortcircuit-and-allowternary */
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },

  {
    files: ["**/*.stories.ts?(x)"],
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["aksel.nav.no/website/app/_sanity/query-types.ts"],
    rules: {
      "@typescript-eslint/array-type": "off",
    },
  },
  {
    files: ["**/*.test.*", "**/__tests__/*"],
    extends: [testingLibrary.configs["flat/react"], vitest.configs.recommended],
  },
  {
    files: ["aksel.nav.no/website/**"],
    extends: [next.flatConfig.recommended],

    rules: {
      "react/no-unknown-property": [2, { ignore: ["jsx", "global"] }],
      "react/react-in-jsx-scope": "off",
      "@next/next/no-html-link-for-pages": [
        "error",
        "aksel.nav.no/website/pages/",
      ],
    },
  },
  {
    files: ["aksel.nav.no/website/pages/eksempler/**"],
    rules: {
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
  {
    files: [
      "aksel.nav.no/website/pages/eksempler/**/*.tsx",
      "aksel.nav.no/website/pages/templates/**/*.tsx",
    ],
    plugins: {
      "aksel-local": akselLocal,
    },
    rules: {
      "aksel-local/comment-check": ["error"],
    },
  },
  {
    files: [
      "**/examples/__parts*/*.tsx",
      "**/pages/templates/**/*.tsx",
      "**/pages/eksempler/**/*.tsx",
    ],
    plugins: {
      "aksel-local": akselLocal,
    },
    rules: {
      "aksel-local/import-check": ["error"], // Only allow imports from @navikt and react
    },
  },
  {
    files: ["**/examples/__parts-inline/*.tsx"],
    rules: {
      "arrow-body-style": ["error", "never"],
      "func-style": ["error", "expression"],
      "import/no-named-export": "error",
    },
  },
  {
    files: ["examples/**"],
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);
