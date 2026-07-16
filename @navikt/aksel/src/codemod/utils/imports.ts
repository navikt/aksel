import type core from "jscodeshift";
import type { Collection } from "jscodeshift";

export function getImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  sourcePath: string,
) {
  return source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === sourcePath)
    .find(j.ImportSpecifier)
    .filter((path) => path.value.imported.name === specifier);
}

export function renameImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  newSpecifier: string,
  sourcePath: string,
) {
  getImportSpecifier(j, source, specifier, sourcePath).replaceWith(
    j.importSpecifier(j.identifier(newSpecifier)),
  );
}

export function getImportSpecifierName(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  sourcePath: string,
) {
  const specifiers = getImportSpecifier(j, source, specifier, sourcePath);

  if (specifiers.size() === 0) {
    return null;
  }

  return specifiers.nodes()[0]?.local?.name ?? null;
}
