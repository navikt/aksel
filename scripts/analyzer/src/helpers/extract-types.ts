import { existsSync } from "node:fs";
import { Project, SyntaxKind } from "ts-morph";

/**
 * Parse a .d.ts file and extract all exported type names
 */
function extractTypesFromDts(dtsPath: string): string[] {
  if (!existsSync(dtsPath)) {
    return [];
  }

  const project = new Project({});
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

export { extractTypesFromDts };
