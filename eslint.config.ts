import eslintReact from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import vitest from "@vitest/eslint-plugin";
import akselLocal from "eslint-plugin-aksel-local";
import { importX } from "eslint-plugin-import-x";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import babelParser from "@babel/eslint-parser";

/**
 * TODO:
 * - Replace tseslint.configs.recommended with tseslint.configs.recommendedTypeChecked
 * - Look into opinionated stylistic plugin (e.g. tseslint.configs.stylisticTypeChecked)
 * - Consider adding the rule "id-length"
 */

module.exports = defineConfig([
  globalIgnores([
    "**/lib",
    "**/public",
    "**/esm",
    "**/cjs",
    "**/dist",
    "@navikt/aksel/**/*.input.*",
    "@navikt/aksel/**/*.output.*",
    "**/codemod/**/*.js",
    "**/playwright-report/**/*",
    "**/tokens/**/plugin.js",
    "**/.next",
    "**/query-types.ts",
    ".yarn",
    "**/next-env.d.ts",
    "stylelint.config.mjs",
  ]),
  js.configs.recommended,
  eslintReact.configs["recommended-typescript"],
  reactHooks.configs.flat["recommended-latest"],
  storybook.configs["flat/recommended"],
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: { react: { version: "detect" } }, // Allows eslint-plugin-react to detect installed react-version
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      /* "react/jsx-curly-brace-presence": [
        "error",
        { propElementValues: "always" },
      ],
      "react/prop-types": "off", // Temporary
      "react/display-name": "off", // Temporary
      "react-hooks/refs": "off", // Too many false positives
      "react-hooks/exhaustive-deps": [
        "warn",
        { additionalHooks: "(useClientLayoutEffect)" },
      ], */
      "import-x/no-unresolved": "off",
      "import-x/namespace": "off", // Biome has equivalent
      "import-x/no-named-as-default": "off", // Temporary
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      parser: babelParser, // Required for using modern JS features in .js files
      parserOptions: {
        requireConfigFile: false,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Temporary
      "@typescript-eslint/no-unused-expressions": [
        "error",
        /* https://eslint.org/docs/latest/rules/no-unused-expressions#allowshortcircuit-and-allowternary */
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },

  {
    files: ["**/*.test.*", "**/__tests__/*"],
    extends: [testingLibrary.configs["flat/react"], vitest.configs.recommended],
  },
  {
    files: ["aksel.nav.no/website/**"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      /* "react/no-unknown-property": [2, { ignore: ["jsx", "global"] }], */
      /* "react/react-in-jsx-scope": "off", */
      "@next/next/no-html-link-for-pages": [
        "error",
        "aksel.nav.no/website/pages/",
      ],
    },
  },
  {
    files: ["aksel.nav.no/website/pages/eksempler/**"],
    rules: {
      "@next/next/no-img-element": "off",
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
      "aksel-local/args-check": ["error"],
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
      "import-x/no-named-export": "error",
    },
  },
  {
    files: ["@navikt/**"],
    ignores: ["**/*.stories.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: [
                // React 18
                "useId",
                "useInsertionEffect",
                "useSyncExternalStore",
                "useDeferredValue",
                "useTransition",
                "startTransition",
                // React 19
                "useOptimistic",
                "useActionState",
                "use",
                "cache",
                "useEffectEvent",
              ],
              message:
                "We currently only support React-features accesible in React 17. To add new features, we will need to update peerDependencies (breaking change).",
            },
            // react-dom 18+
            {
              name: "react-dom/client",
              importNames: ["createRoot", "hydrateRoot"],
              message: "React 18+ API not allowed (targeting React 17).",
            },
          ],
          patterns: [
            {
              group: ["fs", "path"],
              message:
                'Use `node:` prefix when importing native node modules, e.g. `import path from "node:path"`.',
            },
            {
              group: ["**/esm/**", "**/cjs/**"],
              message:
                "Do not import from build output directories. Import from source instead.",
            },
          ],
        },
      ],

      "no-restricted-properties": [
        "error",
        // React 18
        {
          object: "React",
          property: "useId",
          message: "React 18+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "useInsertionEffect",
          message: "React 18+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "useSyncExternalStore",
          message: "React 18+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "useDeferredValue",
          message: "React 18+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "useTransition",
          message: "React 18+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "startTransition",
          message: "React 18+ API not allowed (targeting React 17).",
        },
        // React 19
        {
          object: "React",
          property: "useOptimistic",
          message: "React 19+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "useActionState",
          message: "React 19+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "use",
          message: "React 19+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "cache",
          message: "React 19+ API not allowed (targeting React 17).",
        },
        {
          object: "React",
          property: "useEffectEvent",
          message: "React 19+ API not allowed (targeting React 17).",
        },
      ],
    },
  },
]);
