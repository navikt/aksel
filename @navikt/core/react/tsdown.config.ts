import { isAbsolute } from "node:path";
import { type Options, defineConfig } from "tsdown";

const entry = [
  "src/**/*.{ts,tsx}",
  "!src/**/*.test.{ts,tsx}",
  "!src/**/*.test-d.ts",
  "!src/**/*.bench.{ts,tsx}",
  "!src/**/*.stories.tsx",
  "!src/**/renderStoriesForChromatic.tsx",
  "!src/**/*.d.ts",
];

const shared: Options = {
  entry,
  unbundle: true,
  dts: true,
  sourcemap: true,
  minify: false,
  target: "es2020",
  platform: "neutral",
  clean: false,
  // Transpile-only: keep every bare package import external (like `tsc`), so
  // nothing from node_modules is bundled into the output.
  external: (id: string) =>
    !id.startsWith("\0") && !id.startsWith(".") && !isAbsolute(id),
  inputOptions: {
    transform: {
      // Classic JSX transform (React.createElement) for React 17 compatibility.
      jsx: "react",
    },
  },
};

export default defineConfig([
  {
    ...shared,
    format: "esm",
    outDir: "esm",
    // Root package.json has no "type" field, so ESM would default to `.mjs`.
    // Force `.js` and rely on the generated `esm/package.json` `{"type":"module"}`.
    outExtensions: () => ({ js: ".js", dts: ".d.ts" }),
  },
  {
    ...shared,
    format: "cjs",
    outDir: "cjs",
    outExtensions: () => ({ js: ".js", dts: ".d.ts" }),
  },
]);
