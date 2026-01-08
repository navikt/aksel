import { existsSync } from "node:fs";
import { getExportsStatic } from "pkg-exports";
import { Project, SyntaxKind } from "ts-morph";
import type { ExportInfo, PackageExports } from "../types.js";
import {
  getPackageData,
  parseExportConfig,
} from "../utilities/package.utils.js";

async function analyzePackage(): Promise<PackageExports> {
  const { exportPaths, packageName, dir, pkgJson } = getPackageData();

  const details: ExportInfo[] = [];
  let totalExports = 0;
  let totalTypes = 0;

  for (const exportPath of exportPaths) {
    const exportConfig = pkgJson.exports?.[exportPath];

    // Check if this is a type-only export (skip runtime analysis)
    const { isTypeOnly, typesPath } = parseExportConfig(exportConfig, dir);

    const fullImportPath =
      exportPath === "."
        ? packageName
        : `${packageName}/${exportPath.replace(/^\.\//, "")}`;

    let runtimeExports: string[] = [];
    if (!isTypeOnly) {
      runtimeExports = await getRuntimeExports(fullImportPath);
    }

    const typeExports = typesPath ? extractTypesFromDts(typesPath) : [];

    details.push({
      path: exportPath,
      exports: runtimeExports,
      types: typeExports,
    });

    totalExports += runtimeExports.length;
    totalTypes += typeExports.length;
  }

  return {
    packageName,
    version: pkgJson.version,
    exportPaths,
    details,
    summary: {
      totalExports,
      totalTypes,
      totalPaths: exportPaths.length,
    },
  };
}

/**
 * Parse a .d.ts file and extract all exported type names
 */
function extractTypesFromDts(dtsPath: string): string[] {
  if (!existsSync(dtsPath)) {
    return [];
  }

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(dtsPath);

  const types: string[] = [];

  for (const [name, declaration] of sourceFile.getExportedDeclarations()) {
    const isTypeOrInterface = declaration.some((decl) => {
      const kind = decl.getKind();
      return (
        kind === SyntaxKind.InterfaceDeclaration ||
        kind === SyntaxKind.TypeAliasDeclaration ||
        kind === SyntaxKind.EnumDeclaration ||
        kind === SyntaxKind.ModuleDeclaration // namespace with types
      );
    });

    isTypeOrInterface && types.push(name);
  }

  return types.sort();
}

/**
 * Get runtime exports for a package path using pkg-exports
 *
 * TODO:
 * - Could consider using ts-morph to analyze runtime exports directly from source files
 *   to avoid potential issues with pkg-exports or packages that don't expose exports correctly.
 */
async function getRuntimeExports(packagePath: string): Promise<string[]> {
  try {
    const exports = await getExportsStatic(packagePath);
    return exports.sort();
  } catch {
    return [];
  }
}

export { analyzePackage };
