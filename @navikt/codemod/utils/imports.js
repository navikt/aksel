"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportSpecifierName =
  exports.renameImportSpecifier =
  exports.getImportSpecifier =
    void 0;
function getImportSpecifier(j, source, specifier, sourcePath) {
  return source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === sourcePath)
    .find(j.ImportSpecifier)
    .filter((path) => path.value.imported.name === specifier);
}
exports.getImportSpecifier = getImportSpecifier;
function renameImportSpecifier(j, source, specifier, newSpecifier, sourcePath) {
  getImportSpecifier(j, source, specifier, sourcePath).replaceWith(
    j.importSpecifier(j.identifier(newSpecifier))
  );
}
exports.renameImportSpecifier = renameImportSpecifier;
function getImportSpecifierName(j, source, specifier, sourcePath) {
  const specifiers = getImportSpecifier(j, source, specifier, sourcePath);
  return specifiers.length > 0 ? specifiers.nodes()[0].local.name : null;
}
exports.getImportSpecifierName = getImportSpecifierName;
