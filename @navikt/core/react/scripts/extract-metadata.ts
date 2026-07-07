import fg from "fast-glob";
import { writeFileSync } from "node:fs";
import path from "node:path";
import * as docgen from "react-docgen-typescript";
import { type ResolvedEntry, parseMetaFiles } from "./metadata/parse-meta";
import {
  metadataOutputPath,
  packageRoot,
  tsconfigPath,
} from "./metadata/paths";
import { validateMetas } from "./metadata/validate-meta";

/**
 * Extracts curated component documentation from every `*.meta.ts` file.
 *
 * Orchestrates the shared metadata utils: parse -> validate -> regenerate the
 * `ComponentName` union -> run `react-docgen-typescript` on the referenced
 * components/utils -> emit a grouped record per family to `_metadata.json`.
 *
 * Runs alongside `scripts/docgen.ts` during the migration; see
 * `src/utils/types/metadata.ts` for the authoring spec.
 */

interface ComponentDoc extends docgen.ComponentDoc {
  props: {
    [key: string]: docgen.PropItem & {
      example?: string;
      params?: string[];
      return?: string;
      deprecated?: string;
    };
  };
}

const metas = parseMetaFiles();
if (metas.length === 0) {
  console.info("No *.meta.ts files found, nothing to extract.");
  process.exit(0);
}

const errors = validateMetas(metas);
if (errors.length > 0) {
  throw new Error(`Invalid component metadata:\n${errors.join("\n")}`);
}

const enrichExtraPropFields = (doc: ComponentDoc) => {
  for (const prop of Object.values(doc.props)) {
    if (!prop.description) {
      continue;
    }
    const example_regex = /@example((.|\n)*?(?=@[a-z]+\s))|@example((.|\n)*)/;
    const example = prop.description.match(example_regex);
    prop.description = prop.description.replace(example_regex, "");
    // We replace twice as a hack b.c. 'asChild' ends up with two @example-blocks,
    // probably b.c. it's defined two times (discriminated union, see AsChildProps.ts)
    prop.description = prop.description.replace(example_regex, "").trim();
    if (example?.[1] || example?.[3]) {
      prop.example = (example[1] || example[3]).trim();
    }

    const params_regex = /(@param|@argument|@arg)(.*)/g;
    const params = prop.description.match(params_regex);
    prop.description = prop.description.replace(params_regex, "").trim();
    if (params) {
      prop.params = params.map((param) =>
        param.replace(/@param|@argument|@arg/, "").trim(),
      );
    }

    const return_regex = /(@returns?)(.*)/;
    const _return = prop.description.match(return_regex);
    prop.description = prop.description.replace(return_regex, "").trim();
    if (_return) {
      const return_val = _return[2].replace(/@returns?/, "").trim();
      prop.return = return_val ? return_val : "void";
    }

    const link_regex = /@see {@link (http[^ ]+) ([^}]+)}/;
    prop.description = prop.description.replace(link_regex, "[$2]($1)");

    const deprecation_regex = /(@deprecated?)(.*)/;
    const deprecation = prop.description.match(deprecation_regex);
    prop.description = prop.description.replace(deprecation_regex, "").trim();
    if (deprecation) {
      prop.deprecated = deprecation[2].replace(/@deprecated?/, "").trim();
    }
  }
};

const parser = docgen.withCustomConfig(tsconfigPath, {
  savePropValueAsString: true,
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractLiteralValuesFromEnum: true,
  propFilter: (prop) => {
    if (prop.name === "as" && prop.type.name === "undefined") {
      return false;
    }
    if (prop.name === "className" || prop.parent?.name === "RefAttributes") {
      return true;
    }
    if (prop.parent?.fileName.includes("/node_modules/@types/react/")) {
      return false;
    }
    /**
     * Filter out all HTML attributes inherited from React.HTMLAttributes.
     * className is handled separately above.
     */
    if (prop.parent?.name === "HTMLAttributes") {
      return false;
    }
    return true;
  },
});

/** Cache docgen results per file (a file may back several meta entries). */
const docsByFile = new Map<string, Map<string, ComponentDoc>>();

const getDocsForFile = (fileName: string) => {
  let byName = docsByFile.get(fileName);
  if (!byName) {
    byName = new Map<string, ComponentDoc>();
    for (const doc of parser.parse(fileName) as ComponentDoc[]) {
      enrichExtraPropFields(doc);
      byName.set(doc.displayName, doc);
    }
    docsByFile.set(fileName, byName);
  }
  return byName;
};

const documentEntry = (entry: ResolvedEntry, metaFile: string) => {
  const doc = getDocsForFile(entry.fileName).get(entry.realName);
  if (!doc) {
    throw new Error(
      `[${metaFile}] Could not extract props for "${entry.label}" (${entry.realName}) in ${path.relative(packageRoot, entry.fileName)}.`,
    );
  }
  return {
    displayName: entry.label,
    filePath: doc.filePath,
    overridable: entry.overridable,
    props: doc.props,
  };
};

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
