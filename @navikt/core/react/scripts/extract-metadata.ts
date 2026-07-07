import fg from "fast-glob";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { createPropsDocumenter } from "./metadata/extract-props";
import { parseMetaFiles } from "./metadata/parse-meta";
import { metadataOutputPath, packageRoot } from "./metadata/paths";
import { validateMetas } from "./metadata/validate-meta";

/**
 * Extracts curated component documentation from every `*.meta.ts` file.
 *
 * Orchestrates the metadata utils: parse -> validate -> run
 * `react-docgen-typescript` on the referenced components/utils -> emit a
 * grouped record per family to `_metadata.json`.
 *
 * Runs alongside `scripts/docgen.ts` during the migration; see
 * `src/utils/types/metadata.ts` for the authoring spec.
 */

const metas = parseMetaFiles();
if (metas.length === 0) {
  console.info("No *.meta.ts files found, nothing to extract.");
  process.exit(0);
}

const errors = validateMetas(metas);
if (errors.length > 0) {
  throw new Error(`Invalid component metadata:\n${errors.join("\n")}`);
}

const documentEntry = createPropsDocumenter();

const output = metas
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((meta) => ({
    name: meta.name,
    dir: meta.dir,
    keywords: meta.keywords,
    related: meta.related,
    components: meta.components.map((entry) =>
      documentEntry(entry, meta.metaFile),
    ),
    utils: meta.utils.map((entry) => documentEntry(entry, meta.metaFile)),
  }));

writeFileSync(metadataOutputPath, JSON.stringify(output, null, 2));

const metaDirs = new Set(metas.map((meta) => meta.dir));
const componentDirs = fg
  .sync("src/*/", { cwd: packageRoot, onlyDirectories: true })
  .map((dir) => dir.replace(/\/$/, ""));
const missing = componentDirs.filter((dir) => !metaDirs.has(dir));

console.info({
  families: output.length,
  components: output.reduce((sum, meta) => sum + meta.components.length, 0),
  utils: output.reduce((sum, meta) => sum + meta.utils.length, 0),
  output: path.relative(packageRoot, metadataOutputPath),
});

if (missing.length > 0) {
  console.info(
    `\n${missing.length} component dir(s) still missing a *.meta.ts file:\n${missing
      .map((dir) => `  - ${dir}`)
      .join("\n")}`,
  );
}
