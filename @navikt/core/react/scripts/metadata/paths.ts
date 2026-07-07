import path from "node:path";
import { fileURLToPath } from "node:url";

/* @ts-expect-error improver module handling */
const currentDir = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the `@navikt/core/react` package root. */
export const packageRoot = path.resolve(currentDir, "../..");

export const tsconfigPath = path.resolve(packageRoot, "tsconfig.esm.json");

export const metadataOutputPath = path.resolve(packageRoot, "_metadata.json");

export const generatedComponentNamesPath = path.resolve(
  packageRoot,
  "src/utils/types/component-names.generated.ts",
);

/** Glob (relative to {@link packageRoot}) matching every component meta file. */
export const META_GLOB = "src/**/*.meta.ts";
