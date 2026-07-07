import fg from "fast-glob";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as docgen from "react-docgen-typescript";
import ts from "typescript";

/**
 * Extracts curated component documentation from every `*.meta.ts` file.
 *
 * For each meta file it resolves the listed `components`/`utils` identifiers to
 * their declarations, runs `react-docgen-typescript` on the owning files
 * (reusing the same prop-filter + JSDoc enrichment as `scripts/docgen.ts`), and
 * emits a grouped record per component family to `_metadata.json`.
 *
 * It also regenerates `src/utils/types/component-names.generated.ts` (the
 * `ComponentName` union used to type `ComponentMetadata.related`).
 *
 * Runs alongside `scripts/docgen.ts` during the migration; see
 * `src/utils/types/metadata.ts` for the authoring spec.
 */

/* @ts-expect-error improver module handling */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const tsconfigPath = path.resolve(packageRoot, "tsconfig.esm.json");
const outputPath = path.resolve(packageRoot, "_metadata.json");
const generatedTypePath = path.resolve(
  packageRoot,
  "src/utils/types/component-names.generated.ts",
);

/** Characters allowed in a Sanity document `_id`. */
const SANITY_ID_PATTERN = /^[A-Za-z0-9_.-]+$/;

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

interface ResolvedEntry {
  /** Display label from the meta map key, e.g. `"Accordion.Item"`. */
  label: string;
  /** The resolved declaration name used to match docgen output, e.g. `AccordionItem`. */
  realName: string;
  /** Absolute path of the file declaring the component/util. */
  fileName: string;
  overridable: boolean;
}

interface ParsedMeta {
  name: string;
  dir: string;
  metaFile: string;
  keywords: string[];
  related: string[];
  components: ResolvedEntry[];
  utils: ResolvedEntry[];
}

const metaFiles = fg
  .sync("src/**/*.meta.ts", { cwd: packageRoot, absolute: true })
  .sort();

if (metaFiles.length === 0) {
  console.info("No *.meta.ts files found, nothing to extract.");
  process.exit(0);
}

const readConfig = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
if (readConfig.error) {
  throw new Error(
    ts.flattenDiagnosticMessageText(readConfig.error.messageText, "\n"),
  );
}

const parsedConfig = ts.parseJsonConfigFileContent(
  readConfig.config,
  ts.sys,
  packageRoot,
);

const program = ts.createProgram({
  rootNames: Array.from(new Set([...parsedConfig.fileNames, ...metaFiles])),
  options: parsedConfig.options,
});
const checker = program.getTypeChecker();

const resolveAliasedSymbol = (symbol: ts.Symbol | undefined) => {
  let current = symbol;
  while (current && current.flags & ts.SymbolFlags.Alias) {
    current = checker.getAliasedSymbol(current);
  }
  return current;
};

const findMetadataObject = (sourceFile: ts.SourceFile) => {
  let found: ts.ObjectLiteralExpression | undefined;
  const visit = (node: ts.Node) => {
    if (found) {
      return;
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "metadata" &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      found = node.initializer;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found;
};

const getObjectProperty = (node: ts.ObjectLiteralExpression, name: string) =>
  node.properties.find(
    (prop): prop is ts.PropertyAssignment | ts.ShorthandPropertyAssignment =>
      (ts.isPropertyAssignment(prop) ||
        ts.isShorthandPropertyAssignment(prop)) &&
      ((ts.isIdentifier(prop.name) && prop.name.text === name) ||
        (ts.isStringLiteral(prop.name) && prop.name.text === name)),
  );

const readStringLiteralProperty = (
  node: ts.ObjectLiteralExpression,
  name: string,
) => {
  const prop = getObjectProperty(node, name);
  if (
    prop &&
    ts.isPropertyAssignment(prop) &&
    ts.isStringLiteral(prop.initializer)
  ) {
    return prop.initializer.text;
  }
  return undefined;
};

const readStringArrayProperty = (
  node: ts.ObjectLiteralExpression,
  name: string,
) => {
  const prop = getObjectProperty(node, name);
  if (
    prop &&
    ts.isPropertyAssignment(prop) &&
    ts.isArrayLiteralExpression(prop.initializer)
  ) {
    return prop.initializer.elements
      .filter(ts.isStringLiteral)
      .map((element) => element.text);
  }
  return [];
};

/**
 * Detects whether a declared value is (or extends) `OverridableComponent`,
 * i.e. exposes the `as` polymorphic API.
 */
const isOverridableComponent = (type: ts.Type): boolean => {
  if (type.aliasSymbol?.getName() === "OverridableComponent") {
    return true;
  }
  const symbol = type.getSymbol();
  if (symbol?.getName() === "OverridableComponent") {
    return true;
  }
  for (const declaration of symbol?.getDeclarations() ?? []) {
    if (ts.isInterfaceDeclaration(declaration) && declaration.heritageClauses) {
      for (const clause of declaration.heritageClauses) {
        for (const heritageType of clause.types) {
          if (
            heritageType.expression.getText().includes("OverridableComponent")
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

const resolveEntries = (
  mapExpression: ts.ObjectLiteralExpression,
  metaFile: string,
): ResolvedEntry[] => {
  const entries: ResolvedEntry[] = [];

  for (const entry of mapExpression.properties) {
    let label: string | undefined;
    let symbol: ts.Symbol | undefined;

    if (ts.isShorthandPropertyAssignment(entry)) {
      label = entry.name.text;
      symbol = resolveAliasedSymbol(
        checker.getShorthandAssignmentValueSymbol(entry),
      );
    } else if (
      ts.isPropertyAssignment(entry) &&
      ts.isIdentifier(entry.initializer)
    ) {
      label = ts.isStringLiteral(entry.name)
        ? entry.name.text
        : entry.name.getText();
      symbol = resolveAliasedSymbol(
        checker.getSymbolAtLocation(entry.initializer),
      );
    }

    if (!label) {
      continue;
    }

    const declaration = symbol?.valueDeclaration ?? symbol?.declarations?.[0];
    if (!symbol || !declaration) {
      throw new Error(
        `[${path.relative(packageRoot, metaFile)}] Could not resolve "${label}" to a declaration. Check the import.`,
      );
    }

    const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);

    entries.push({
      label,
      realName: symbol.getName(),
      fileName: declaration.getSourceFile().fileName,
      overridable: isOverridableComponent(type),
    });
  }

  return entries;
};

const parseMetaFile = (metaFile: string): ParsedMeta => {
  const relMeta = path.relative(packageRoot, metaFile);
  const sourceFile = program.getSourceFile(metaFile);
  if (!sourceFile) {
    throw new Error(`Could not load meta file: ${relMeta}`);
  }

  const metadataNode = findMetadataObject(sourceFile);
  if (!metadataNode) {
    throw new Error(`[${relMeta}] Could not find a "metadata" object.`);
  }

  const name = readStringLiteralProperty(metadataNode, "name");
  if (!name) {
    throw new Error(`[${relMeta}] metadata.name must be a string literal.`);
  }

  const componentsProp = getObjectProperty(metadataNode, "components");
  if (
    !componentsProp ||
    !ts.isPropertyAssignment(componentsProp) ||
    !ts.isObjectLiteralExpression(componentsProp.initializer)
  ) {
    throw new Error(
      `[${relMeta}] metadata.components must be an object literal.`,
    );
  }

  const utilsProp = getObjectProperty(metadataNode, "utils");
  if (
    utilsProp &&
    (!ts.isPropertyAssignment(utilsProp) ||
      !ts.isObjectLiteralExpression(utilsProp.initializer))
  ) {
    throw new Error(`[${relMeta}] metadata.utils must be an object literal.`);
  }

  const components = resolveEntries(componentsProp.initializer, metaFile);
  const utils =
    utilsProp &&
    ts.isPropertyAssignment(utilsProp) &&
    ts.isObjectLiteralExpression(utilsProp.initializer)
      ? resolveEntries(utilsProp.initializer, metaFile)
      : [];

  return {
    name,
    dir: path.relative(packageRoot, path.dirname(metaFile)),
    metaFile: relMeta,
    keywords: readStringArrayProperty(metadataNode, "keywords"),
    related: readStringArrayProperty(metadataNode, "related"),
    components,
    utils,
  };
};

const parsedMetas = metaFiles.map(parseMetaFile);

/* ---------------------------------------------------------------- validation */

const nameToMeta = new Map<string, string>();
for (const meta of parsedMetas) {
  if (!SANITY_ID_PATTERN.test(meta.name)) {
    throw new Error(
      `[${meta.metaFile}] metadata.name "${meta.name}" is not a valid Sanity id (allowed: letters, numbers, "." "-" "_").`,
    );
  }
  const existing = nameToMeta.get(meta.name);
  if (existing) {
    throw new Error(
      `Duplicate metadata.name "${meta.name}" in ${meta.metaFile} and ${existing}. Names must be unique.`,
    );
  }
  nameToMeta.set(meta.name, meta.metaFile);

  if (meta.components.length === 0) {
    throw new Error(
      `[${meta.metaFile}] metadata.components must not be empty.`,
    );
  }
  if (meta.keywords.length === 0) {
    throw new Error(`[${meta.metaFile}] metadata.keywords must not be empty.`);
  }
}

for (const meta of parsedMetas) {
  for (const related of meta.related) {
    if (!nameToMeta.has(related)) {
      throw new Error(
        `[${meta.metaFile}] metadata.related references "${related}", which has no matching meta file.`,
      );
    }
  }
}

/* ------------------------------------------------- generated ComponentName type */

const allNames = Array.from(nameToMeta.keys()).sort((a, b) =>
  a.localeCompare(b),
);
const unionBody = allNames.map((name) => `  | "${name}"`).join("\n");
const generatedContent = `/**
 * AUTO-GENERATED — do not edit by hand.
 *
 * Union of every \`name\` declared in a \`*.meta.ts\` file. Regenerated by
 * \`scripts/extract-metadata.ts\` (runs as part of \`yarn docgen\`). Used to type
 * \`ComponentMetadata.related\` so a reference to a non-existent component fails
 * type-checking.
 */
export type ComponentName =
${unionBody};
`;

const existingGenerated = (() => {
  try {
    return readFileSync(generatedTypePath, "utf-8");
  } catch {
    return undefined;
  }
})();
if (existingGenerated !== generatedContent) {
  writeFileSync(generatedTypePath, generatedContent);
}

/* --------------------------------------------------------------- docgen parse */

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

const output = parsedMetas
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

writeFileSync(outputPath, JSON.stringify(output, null, 2));

/* ------------------------------------------------------------------- summary */

const metaDirs = new Set(parsedMetas.map((meta) => meta.dir));
const componentDirs = fg
  .sync("src/*/", { cwd: packageRoot, onlyDirectories: true })
  .map((dir) => dir.replace(/\/$/, ""));
const missing = componentDirs.filter((dir) => !metaDirs.has(dir));

console.info({
  families: output.length,
  components: output.reduce((sum, meta) => sum + meta.components.length, 0),
  utils: output.reduce((sum, meta) => sum + meta.utils.length, 0),
  output: path.relative(packageRoot, outputPath),
});

if (missing.length > 0) {
  console.info(
    `\n${missing.length} component dir(s) still missing a *.meta.ts file:\n${missing
      .map((dir) => `  - ${dir}`)
      .join("\n")}`,
  );
}
