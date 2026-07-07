import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as docgen from "react-docgen-typescript";
import ts from "typescript";

/* @ts-expect-error improver module handling */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "../..");
const metaFilePath = path.resolve(__dirname, "Accordion.meta.ts");
const tsconfigPath = path.resolve(packageRoot, "tsconfig.esm.json");
const outputPath = path.resolve(packageRoot, "_docs.from-meta.json");

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
  rootNames: Array.from(new Set([...parsedConfig.fileNames, metaFilePath])),
  options: parsedConfig.options,
});
const checker = program.getTypeChecker();

const metaSourceFile = program.getSourceFile(metaFilePath);
if (!metaSourceFile) {
  throw new Error(`Could not load meta file: ${metaFilePath}`);
}

const resolveAliasedSymbol = (symbol: ts.Symbol | undefined) => {
  if (!symbol) {
    return undefined;
  }
  return symbol.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol)
    : symbol;
};

const resolveSymbol = (node: ts.Node) =>
  resolveAliasedSymbol(checker.getSymbolAtLocation(node));

const findMetadataObject = () => {
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

  visit(metaSourceFile);
  return found;
};

const metadataNode = findMetadataObject();
if (!metadataNode) {
  throw new Error(`Could not find metadata object in ${metaFilePath}`);
}

const getObjectProperty = (node: ts.ObjectLiteralExpression, name: string) =>
  node.properties.find(
    (prop): prop is ts.PropertyAssignment | ts.ShorthandPropertyAssignment =>
      (ts.isPropertyAssignment(prop) ||
        ts.isShorthandPropertyAssignment(prop)) &&
      ((ts.isIdentifier(prop.name) && prop.name.text === name) ||
        (ts.isStringLiteral(prop.name) && prop.name.text === name)),
  );

const componentsProp = getObjectProperty(metadataNode, "components");
if (
  !componentsProp ||
  !ts.isPropertyAssignment(componentsProp) ||
  !ts.isObjectLiteralExpression(componentsProp.initializer)
) {
  throw new Error("metadata.components must be an object literal");
}

const utilsProp = getObjectProperty(metadataNode, "utils");

if (
  utilsProp &&
  (!ts.isPropertyAssignment(utilsProp) ||
    !ts.isObjectLiteralExpression(utilsProp.initializer))
) {
  throw new Error("metadata.utils must be an object literal");
}

/**
 * For each component listed in `metadata.components`, resolve the identifier to
 * its declaration file and record which display names to keep from that file.
 */
const wantedByFile = new Map<string, Set<string>>();

const allProps = [...componentsProp.initializer.properties];

if (
  utilsProp &&
  ts.isPropertyAssignment(utilsProp) &&
  ts.isObjectLiteralExpression(utilsProp.initializer)
) {
  allProps.push(...utilsProp.initializer.properties);
}

for (const entry of allProps) {
  let name: string | undefined;
  let symbol: ts.Symbol | undefined;

  if (ts.isShorthandPropertyAssignment(entry)) {
    name = entry.name.text;
    symbol = resolveAliasedSymbol(
      checker.getShorthandAssignmentValueSymbol(entry),
    );
  } else if (
    ts.isPropertyAssignment(entry) &&
    ts.isIdentifier(entry.initializer)
  ) {
    name = entry.name.getText();
    symbol = resolveSymbol(entry.initializer);
  }

  if (!name || !symbol) {
    continue;
  }

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  const fileName = declaration?.getSourceFile().fileName;
  if (!fileName) {
    continue;
  }

  const relFile = path.relative(packageRoot, fileName);
  const set = wantedByFile.get(relFile) ?? new Set<string>();
  set.add(name);
  wantedByFile.set(relFile, set);
}

const parser = docgen.withCustomConfig(tsconfigPath, {
  savePropValueAsString: true,
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractLiteralValuesFromEnum: true,
});

const docs = Array.from(wantedByFile.entries())
  .sort(([a], [b]) => a.localeCompare(b))
  .flatMap(([filePath, wantedNames]) =>
    parser
      .parse(filePath)
      .filter((component) => wantedNames.has(component.displayName)),
  )
  .map((component) => ({
    filePath: component.filePath,
    displayName: component.displayName,
    props: component.props,
  }));

writeFileSync(outputPath, JSON.stringify(docs, null, 2));

console.info({
  metaFile: path.relative(packageRoot, metaFilePath),
  components: Object.fromEntries(
    Array.from(wantedByFile.entries()).map(([file, names]) => [
      file,
      Array.from(names),
    ]),
  ),
  documented: docs.length,
  output: path.relative(packageRoot, outputPath),
});
