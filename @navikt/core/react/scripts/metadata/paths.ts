import path from "node:path";
import { fileURLToPath } from "node:url";

/* @ts-expect-error improve module handling */
const currentDir = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the `@navikt/core/react` package root. */
const packageRoot = path.resolve(currentDir, "../..");

const tsconfigPath = path.resolve(packageRoot, "tsconfig.esm.json");

const metadataOutputPath = path.resolve(packageRoot, "_metadata.json");

const generatedComponentNamesPath = path.resolve(
  packageRoot,
  "src/utils/types/component-names.generated.ts",
);

/** Glob (relative to {@link packageRoot}) matching every component meta file. */
const META_GLOB = "src/**/*.meta.ts";

export {
  packageRoot,
  tsconfigPath,
  metadataOutputPath,
  generatedComponentNamesPath,
  META_GLOB,
};
