import { namedTypes } from "ast-types";
import fs from "fs";
import jscodeshift, { ASTPath, Collection } from "jscodeshift";
import path from "path";
import prettier from "prettier";

const j = jscodeshift.withParser("tsx");

const FILTER_STRING = "// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE";

export async function filterCode(code: string, filePath: string) {
  if (!code.includes(FILTER_STRING)) {
    throw new Error(
      `filterCode expects substring "${FILTER_STRING}" in example code.`,
    );
  }

  const filteredCode = code
    .substring(0, code.indexOf(FILTER_STRING))
    .split("\n")
    .filter((x) => !x.includes("examples/withDsExample"))
    .join("\n")
    .trim();

  if (filteredCode === "") {
    throw new Error(
      "filterCode returned empty string, this is 99.99% likely to be an error.",
    );
  }

  return injectImportedCode(filteredCode, filePath);
}

/**
 * Scans the code for imports from /__parts-inline or /__parts, inlines the imported code and removes the imports.
 * NB: Files in __parts-inline should only contain an arrow function with implicit return.
 * NB: Files in __parts should only contain code that is used in all files that import it.
 * See comments bellow for details.
 */
async function injectImportedCode(code: string, filePath: string) {
  const parsedCode = j(code);
  const importDeclarations = parsedCode.find(j.ImportDeclaration);

  const jsxToReplace: Record<string, string> = {};
  const codeToInject: string[] = [];

  importDeclarations.forEach((importDecl) => {
    const importPath = importDecl.value.source.value?.toString() || "";
    if (
      !importPath.includes("/__parts") ||
      !importDecl.value.specifiers?.[0].local // Just to please TS (checks that there's something between "import" and "from"))
    ) {
      return;
    }

    // Read file and parse code
    const importedCode = fs.readFileSync(
      path.resolve(path.dirname(filePath), `${importPath}.tsx`),
      "utf-8",
    );
    const parsedImportedCode = j(importedCode);

    // Imports from the __parts-inline directory are components that should be inlined in the example JSX.
    if (importPath.includes("/__parts-inline/")) {
      // Extract the JSX from the component.
      // We assume it's written as an arrow function with implicit return.
      // This code will only extract the first arrow function in the file. Other code is ignored.
      const arrowFunctions = parsedImportedCode.find(j.ArrowFunctionExpression);
      const arrowFunctionCode = j(arrowFunctions.nodes()[0].body)
        .toSource()
        .slice(1, -1); // Remove leading and trailing parenthesis
      const identifier = importDecl.value.specifiers[0].local.name; // The part between "import" and "from"
      if (!identifier) return;
      jsxToReplace[identifier] = arrowFunctionCode;
    }
    // Imports from the __parts directory are variables/functions that should be injected bellow the example JSX.
    else if (importPath.includes("/__parts/")) {
      // For simplicity, we don't filter out unused code.
      const cleanedCode = importedCode
        .replace(/import [^;]+;/g, "")
        .replace(/export [^;]+;/g, "")
        .trim();
      codeToInject.push(cleanedCode);
    }

    // Copy imports from the imported file to the example code
    handleDependencies(importDeclarations, importDecl, parsedImportedCode);

    // Remove the import declaration for the inlined component
    importDecl.prune();
  });

  if (!Object.keys(jsxToReplace).length && !codeToInject.length) {
    return code;
  }
  code = parsedCode.toSource({ lineTerminator: "\n" });

  // Inject code
  Object.entries(jsxToReplace).forEach(([identifier, arrowFunctionCode]) => {
    const regex = new RegExp(`<${identifier} [^/]*/>`, "g");
    code = code.replace(regex, arrowFunctionCode);
  });
  code += "\n\n" + codeToInject.join("\n\n");

  code = code.replace(/\n\nimport /g, "\nimport "); // prune() adds empty line between imports

  return await prettier.format(code, { parser: "typescript" });
}

/**
 * Copies imports from the imported file to the example code.
 * Only handles aksel/ds and react package imports. (So no recursiveness.)
 */
function handleDependencies(
  importDeclarations: Collection<namedTypes.ImportDeclaration>,
  currentImportDecl: ASTPath<namedTypes.ImportDeclaration>,
  parsedImportedCode: Collection<any>,
) {
  parsedImportedCode.find(j.ImportDeclaration).forEach((nestedImportDecl) => {
    const packageName = nestedImportDecl.value.source.value?.toString() || "";
    if (
      (!packageName.includes("@navikt/") && packageName !== "react") ||
      !nestedImportDecl.value.specifiers // Just to please TS (checks that there's something between "import" and "from")
    ) {
      return;
    }

    // Check if the example file already imports from this package
    const pkgImportDecls = importDeclarations.filter(
      (decl) => decl.node.source?.value === packageName,
    );
    if (pkgImportDecls.length > 1) return; // Multiple import declearations for the same package is not supported

    if (pkgImportDecls.length === 1) {
      // Use existing import declaration
      const pkgImportDecl = pkgImportDecls.get();

      // Create new import specifiers (filter out existing to avoid duplicates)
      const newImportSpecifiers = nestedImportDecl.value.specifiers.filter(
        (newSpecifier) =>
          !pkgImportDecl.node.specifiers.some(
            (oldSpecifier: any) =>
              oldSpecifier.type !== "ImportDefaultSpecifier" &&
              oldSpecifier.imported.name === newSpecifier.local?.name,
          ),
      );

      // Replace the old import declaration with a new one, containing both old and new import specifiers.
      j(pkgImportDecl).replaceWith(
        j.importDeclaration(
          [...pkgImportDecl.node.specifiers, ...newImportSpecifiers],
          pkgImportDecl.node.source,
        ),
      );
    } else {
      // Create new import declaration an insert it
      const newImportDecl = j.importDeclaration(
        nestedImportDecl.value.specifiers,
        j.stringLiteral(packageName),
      );
      currentImportDecl.insertBefore(newImportDecl);
    }
  });
}
