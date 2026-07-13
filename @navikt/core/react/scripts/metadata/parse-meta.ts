import fg from "fast-glob";
import path from "node:path";
import ts from "typescript";
import { META_GLOB, packageRoot, tsconfigPath } from "./paths";

/** A single component/util entry resolved from a meta file's map. */
interface ResolvedEntry {
  /** Display label from the meta map key, e.g. `"Accordion.Item"`. */
  label: string;
  /** Resolved declaration name used to match docgen output, e.g. `AccordionItem`. */
  realName: string;
  /** Absolute path of the file declaring the component/util. */
  fileName: string;
  overridable: boolean;
  /**
   * Name of the entry's type symbol, e.g. `OverridableComponent` or a compound
   * `*Component` interface. Fed to `react-docgen-typescript` as a
   * `customComponentType` so it documents such components even when the value
   * is re-exported via a bottom-of-file `export { }` (see `extract-props.ts`).
   */
  typeName?: string;
}

/** The structured contents of one `*.meta.ts` file. */
interface ParsedMeta {
  name: string;
  /** Directory of the meta file, relative to the package root, e.g. `src/accordion`. */
  dir: string;
  /** Path of the meta file, relative to the package root (for error messages). */
  metaFile: string;
  keywords: string[];
  related: string[];
  components: ResolvedEntry[];
  utils: ResolvedEntry[];
}

/**
 * Extracts exported "metadata" object through AST
 */
function findMetadataObject(sourceFile: ts.SourceFile) {
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
}

function getObjectProperty(node: ts.ObjectLiteralExpression, name: string) {
  return node.properties.find(
    (prop): prop is ts.PropertyAssignment | ts.ShorthandPropertyAssignment =>
      (ts.isPropertyAssignment(prop) ||
        ts.isShorthandPropertyAssignment(prop)) &&
      ((ts.isIdentifier(prop.name) && prop.name.text === name) ||
        (ts.isStringLiteral(prop.name) && prop.name.text === name)),
  );
}

function readStringLiteralProperty(
  node: ts.ObjectLiteralExpression,
  name: string,
) {
  const prop = getObjectProperty(node, name);
  if (
    prop &&
    ts.isPropertyAssignment(prop) &&
    ts.isStringLiteral(prop.initializer)
  ) {
    return prop.initializer.text;
  }
  return undefined;
}

function readStringArrayProperty(
  node: ts.ObjectLiteralExpression,
  name: string,
) {
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
}

/**
 * Detects whether a declared value is (or extends) `OverridableComponent`
 */
function isOverridableComponent(type: ts.Type): boolean {
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
}

function createProgram(metaFiles: string[]): ts.Program {
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
  return ts.createProgram({
    rootNames: metaFiles,
    options: parsedConfig.options,
  });
}

/**
 * Reads every `*.meta.ts` file under the package and resolves its
 * `components`/`utils` identifiers to their declarations.
 */
function parseMetaFiles(): ParsedMeta[] {
  const metaFiles = fg
    .sync(META_GLOB, { cwd: packageRoot, absolute: true })
    .sort();

  if (metaFiles.length === 0) {
    return [];
  }

  const program = createProgram(metaFiles);
  const checker = program.getTypeChecker();

  const resolveAliasedSymbol = (symbol: ts.Symbol | undefined) => {
    let current = symbol;
    while (current && current.flags & ts.SymbolFlags.Alias) {
      current = checker.getAliasedSymbol(current);
    }
    return current;
  };

  function resolveEntries(
    mapExpression: ts.ObjectLiteralExpression,
    metaFile: string,
  ): ResolvedEntry[] {
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
        typeName: (type.aliasSymbol ?? type.getSymbol())?.getName(),
      });
    }

    return entries;
  }

  /**
   * Reads a `components`/`utils` map from the metadata object and resolves its
   * entries. Throws when a required map is missing or either map is not an
   * object literal.
   */
  function resolveEntryMap(
    metadataNode: ts.ObjectLiteralExpression,
    key: "components" | "utils",
    metaFile: string,
    relMeta: string,
    required: boolean,
  ): ResolvedEntry[] {
    const prop = getObjectProperty(metadataNode, key);
    if (!prop) {
      if (required) {
        throw new Error(
          `[${relMeta}] metadata.${key} must be an object literal.`,
        );
      }
      return [];
    }
    if (
      !ts.isPropertyAssignment(prop) ||
      !ts.isObjectLiteralExpression(prop.initializer)
    ) {
      throw new Error(
        `[${relMeta}] metadata.${key} must be an object literal.`,
      );
    }
    return resolveEntries(prop.initializer, metaFile);
  }

  function parseMetaFile(metaFile: string): ParsedMeta {
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

    return {
      name,
      dir: path.relative(packageRoot, path.dirname(metaFile)),
      metaFile: relMeta,
      keywords: readStringArrayProperty(metadataNode, "keywords"),
      related: readStringArrayProperty(metadataNode, "related"),
      components: resolveEntryMap(
        metadataNode,
        "components",
        metaFile,
        relMeta,
        true,
      ),
      utils: resolveEntryMap(metadataNode, "utils", metaFile, relMeta, false),
    };
  }

  return metaFiles.map(parseMetaFile);
}

export { parseMetaFiles };
export type { ResolvedEntry, ParsedMeta };
