import path from "node:path";
import { writeComponentNames } from "./component-names";
import { packageRoot } from "./paths";

/**
 * CLI entry (used by lint-staged) that regenerates the `ComponentName` union
 * from every `*.meta.ts` file. Any file arguments passed by lint-staged are
 * ignored — the union is always rebuilt from the full set.
 */
const { path: generatedPath, changed } = writeComponentNames();
const relPath = path.relative(packageRoot, generatedPath);

console.info(
  changed
    ? `Regenerated ${relPath}`
    : `ComponentName union already up to date (${relPath})`,
);
