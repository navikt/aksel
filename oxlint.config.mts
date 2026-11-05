import { defineConfig } from "oxlint";

const restrictedImportPaths = [
  {
    name: "react",
    importNames: [
      "useId",
      "useInsertionEffect",
      "useSyncExternalStore",
      "useDeferredValue",
      "useTransition",
      "startTransition",
    ],
    message:
      "React 18+ API not allowed. We currently only support React-features accesible in React 17. To add new features, we will need to update peerDependencies (breaking change).",
  },
  {
    name: "react",
    importNames: [
      "useOptimistic",
      "useActionState",
      "use",
      "cache",
      "useEffectEvent",
      "ViewTransition",
      "addTransitionType",
    ],
    message:
      "React 19+ API not allowed. We currently only support React-features accesible in React 17. To add new features, we will need to update peerDependencies (breaking change).",
  },
  {
    name: "react-dom/client",
    importNames: ["createRoot", "hydrateRoot"],
    message: "React 18+ API not allowed (targeting React 17).",
  },
];

const restrictedReactProperties = restrictedImportPaths
  .filter((path) => path.name === "react")
  .flatMap((path) =>
    path.importNames.map((property) => ({
      object: "React",
      property,
      message: path.message,
    })),
  );

const restrictedImportPatterns = [
  {
    group: ["**/esm/**", "**/cjs/**"],
    message:
      "Do not import from build output directories. Import from source instead.",
  },
];

export default defineConfig({
  plugins: ["oxc", "unicorn", "react", "import", "jsx-a11y"],
  options: {
    reportUnusedDisableDirectives: "error",
  },
  jsPlugins: [
    { name: "react-hooks-js", specifier: "eslint-plugin-react-hooks" },
    "eslint-plugin-storybook",
    "eslint-plugin-testing-library",
    "eslint-plugin-aksel-local",
  ],
  // Generated and build output is already covered by .gitignore, which Oxlint respects.
  ignorePatterns: [
    "@navikt/aksel/**/*.input.*",
    "@navikt/aksel/**/*.output.*",
    "**/query-types.ts",
    "**/modal/helpers/dialog-polyfill.ts",
    "apps/figma-icon-plugin/src/ui/vite-env.d.ts",
  ],
  rules: {
    /* Rules to add and fix */
    /* react/jsx-no-constructed-context-values */
    /* END */
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-case-declarations": "error",
    "react/jsx-no-script-url": "error",
    "typescript/no-non-null-assertion": "error",
    "no-new-func": "error",
    "no-empty": "error",
    "no-fallthrough": "error",
    "no-prototype-builtins": "error",
    "no-regex-spaces": "error",
    "no-unexpected-multiline": "error",
    "no-useless-assignment": "error",
    "unicorn/prefer-node-protocol": "error",
    "preserve-caught-error": "error",
    "react/button-has-type": "error",
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-target-blank": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": "error",
    "react/require-render-return": "error",
    "import/no-duplicates": "warn",
    "react/jsx-curly-brace-presence": [
      "error",
      {
        propElementValues: "always",
      },
    ],
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useClientLayoutEffect)",
      },
    ],
    "jsx-a11y/prefer-tag-over-role": "off",
    "react/no-array-index-key": "error",
    "react/no-danger": "error",
    "oxc/no-accumulating-spread": "error",
    "no-else-return": "error",
    "object-shorthand": "error",
    "no-shadow": "error",
    "no-template-curly-in-string": "error",
    "no-return-assign": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "no-array-constructor": "error",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
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
    // React Compiler rules (from eslint-plugin-react-hooks "recommended-latest"). Components that
    // break these rules cannot be optimized by React Compiler and risk subtle bugs.
    // The native oxlint rules (immutability, set-state-in-effect, set-state-in-render,
    // static-components, use-memo, void-use-memo) are enabled through the `correctness` category.
    // Disabled native rules: `react/refs` (too many false positives), `react/purity` (oxlint also
    // flags `new Date()`, which we use deliberately; the ESLint version only flags Date.now/Math.random)
    // and the ones the ESLint plugin below runs instead.
    "react/refs": "off",
    "react/purity": "off",
    "react/globals": "off",
    "react/error-boundaries": "off",
    "react/incompatible-library": "off",
    "react/preserve-manual-memoization": "off",
    // Remaining React Compiler rules, run through the ESLint plugin (jsPlugins) until oxlint has
    // native equivalents. `react-hooks-js/purity` is here because oxlint's native version also flags `new Date()`.
    "react-hooks-js/purity": "error",
    "react-hooks-js/preserve-manual-memoization": "error",
    "react-hooks-js/incompatible-library": "warn",
    "react-hooks-js/globals": "error",
    "react-hooks-js/error-boundaries": "error",
    "react-hooks-js/unsupported-syntax": "warn",
    "react-hooks-js/config": "error",
    "react-hooks-js/gating": "error",
  },
  overrides: [
    {
      files: ["@navikt/**", "tooling/**"],
      rules: {
        "import/no-cycle": "error",
      },
    },
    {
      files: ["**/*.stories.{ts,tsx}", "**/scripts/*.{ts,mts,cts}"],
      rules: {
        "no-console": "off",
      },
    },
    {
      files: [
        "**/*.stories.{ts,tsx,js,jsx,mjs,cjs}",
        "**/*.story.{ts,tsx,js,jsx,mjs,cjs}",
      ],
      rules: {
        "storybook/await-interactions": "error",
        "storybook/context-in-play-function": "error",
        "storybook/default-exports": "error",
        "storybook/hierarchy-separator": "warn",
        "storybook/no-redundant-story-name": "warn",
        "storybook/no-renderer-packages": "error",
        "storybook/prefer-pascal-case": "warn",
        "storybook/story-exports": "error",
        "storybook/use-storybook-expect": "error",
        "storybook/use-storybook-testing-library": "error",
        "react/rules-of-hooks": "off",
      },
    },
    {
      files: ["**/.storybook/main.{js,cjs,mjs,ts}"],
      rules: {
        "storybook/no-uninstalled-addons": "error",
      },
    },
    {
      files: ["**/*.{ts,tsx,mts,cts}"],
      rules: {
        "typescript/ban-ts-comment": "error",
        "typescript/no-empty-object-type": "error",
        "typescript/no-namespace": "error",
        "typescript/no-require-imports": "error",
        "typescript/no-unnecessary-type-constraint": "error",
        "typescript/no-unsafe-function-type": "error",
      },
      plugins: ["typescript"],
    },
    {
      files: ["**/*.test.*", "**/__tests__/*"],
      rules: {
        "testing-library/await-async-events": [
          "error",
          {
            eventModule: "userEvent",
          },
        ],
        "testing-library/await-async-queries": "error",
        "testing-library/await-async-utils": "error",
        "testing-library/no-await-sync-events": [
          "error",
          {
            eventModules: ["fire-event"],
          },
        ],
        "testing-library/no-await-sync-queries": "error",
        "testing-library/no-container": "error",
        "testing-library/no-debugging-utils": "warn",
        "testing-library/no-dom-import": ["error", "react"],
        "testing-library/no-global-regexp-flag-in-query": "error",
        "testing-library/no-manual-cleanup": "error",
        "testing-library/no-node-access": "error",
        "testing-library/no-promise-in-fire-event": "error",
        "testing-library/no-render-in-lifecycle": "error",
        "testing-library/no-unnecessary-act": "error",
        "testing-library/no-wait-for-multiple-assertions": "error",
        "testing-library/no-wait-for-side-effects": "error",
        "testing-library/no-wait-for-snapshot": "error",
        "testing-library/prefer-find-by": "error",
        "testing-library/prefer-presence-queries": "error",
        "testing-library/prefer-query-by-disappearance": "error",
        "testing-library/prefer-screen-queries": "error",
        "testing-library/render-result-naming-convention": "error",
        "vitest/no-commented-out-tests": "error",
        "vitest/no-disabled-tests": "warn",
        "vitest/no-identical-title": "error",
        "vitest/no-import-node-test": "error",
        "vitest/no-interpolation-in-snapshots": "error",
        "vitest/no-mocks-import": "error",
        "vitest/no-unneeded-async-expect-function": "error",
        "vitest/prefer-called-exactly-once-with": "error",
        "vitest/require-mock-type-parameters": "off",
        "vitest/require-to-throw-message": "off",
      },
      plugins: ["vitest"],
    },
    {
      files: ["aksel.nav.no/website/**"],
      rules: {
        "nextjs/google-font-display": "warn",
        "nextjs/google-font-preconnect": "warn",
        "nextjs/next-script-for-ga": "warn",
        "nextjs/no-async-client-component": "warn",
        "nextjs/no-before-interactive-script-outside-document": "warn",
        "nextjs/no-css-tags": "warn",
        "nextjs/no-head-element": "warn",
        "nextjs/no-img-element": "warn",
        "nextjs/no-page-custom-font": "warn",
        "nextjs/no-styled-jsx-in-document": "warn",
        "nextjs/no-sync-scripts": "warn",
        "nextjs/no-title-in-document-head": "warn",
        "nextjs/no-typos": "warn",
        "nextjs/no-unwanted-polyfillio": "warn",
      },
      plugins: ["nextjs"],
    },
    {
      files: ["aksel.nav.no/website/pages/eksempler/**"],
      rules: {
        "nextjs/no-img-element": "off",
      },
      plugins: ["nextjs"],
    },
    {
      files: [
        "aksel.nav.no/website/pages/eksempler/**/*.tsx",
        "aksel.nav.no/website/pages/templates/**/*.tsx",
      ],
      rules: {
        "aksel-local/args-check": "error",
        "aksel-local/comment-check": "error",
      },
    },
    {
      files: [
        "**/examples/__parts*/*.tsx",
        "**/pages/templates/**/*.tsx",
        "**/pages/eksempler/**/*.tsx",
      ],
      rules: {
        "aksel-local/import-check": "error",
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
      files: ["@navikt/**"],
      rules: {
        "no-restricted-imports": [
          "error",
          { paths: restrictedImportPaths, patterns: restrictedImportPatterns },
        ],
        "no-restricted-properties": ["error", ...restrictedReactProperties],
      },
    },
    {
      files: ["@navikt/core/react/src/**/*.{ts,tsx}"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              ...restrictedImportPaths,
              {
                name: "date-fns",
                allowTypeImports: true,
                message:
                  'Import functions from their own path, e.g. `import { format } from "date-fns/format"`. The root barrel makes unbundled Node imports load all of date-fns.',
              },
              {
                name: "date-fns/locale",
                allowTypeImports: true,
                message:
                  'Import locales from their own path, e.g. `import { nb } from "date-fns/locale/nb"`. The barrel makes unbundled Node imports load all locales.',
              },
            ],
            patterns: restrictedImportPatterns,
          },
        ],
      },
    },
    {
      files: ["@navikt/**/*.stories.tsx"],
      rules: {
        "no-restricted-imports": "off",
      },
    },
  ],
});
