import path from "node:path";
import * as docgen from "react-docgen-typescript";
import type { ComponentDoc, DocumentedEntry } from "./metadata.types";
import type { ResolvedEntry } from "./parse-meta";
import { packageRoot, tsconfigPath } from "./paths";

/**
 * Pulls structured tags (`@example`, `@param`, `@returns`, `@deprecated`,
 * `@see`) out of each prop description and onto dedicated fields. Mirrors the
 * enrichment in the legacy `scripts/docgen.ts`.
 */
function enrichExtraPropFields(doc: ComponentDoc) {
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
}

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

/**
 * Creates a documenter that turns resolved meta entries into their documented
 * props via `react-docgen-typescript`, caching parse results per file (a file
 * may back several entries, e.g. compound components).
 */
function createPropsDocumenter() {
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

  return function documentEntry(
    entry: ResolvedEntry,
    metaFile: string,
  ): DocumentedEntry {
    const docs = getDocsForFile(entry.fileName);
    /**
     * docgen keys components by their runtime `displayName`, which usually
     * equals the resolved symbol name but can be overridden (e.g. the dot-path
     * `"Dropdown.Menu.List"`) or hidden behind a cast (only the pre-cast
     * `*Internal` is visible). Match on the symbol name, then the authored
     * label, then fall back to the sole doc when the file exports just one.
     */
    const doc =
      docs.get(entry.realName) ??
      docs.get(entry.label) ??
      (docs.size === 1 ? [...docs.values()][0] : undefined);
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
}

export { createPropsDocumenter };
export type { DocumentedEntry };
