import { namedTypes } from "ast-types";
import jscodeshift, { ASTPath, Collection } from "jscodeshift";
import fs from "node:fs";
import path from "node:path";
// eslint-disable-next-line import/default
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
    .filter((x) => !x.includes("biome-ignore"))
    .join("\n")
    .trim();

  if (filteredCode === "") {
    throw new Error(
      "filterCode returned empty string, this is 99.99% likely to be an error.",
    );
  }

  return injectImportedCode(filteredCode, filePath);
}

// Only imports from these directories will be injected
const codeInjectDir = "/__parts/"; // Will be injected at the end (NB: All code except import/export statements will be injected!)
const jsxInjectDir = "/__parts-inline/"; // JSX that will be inlined in the example JSX (NB: Use arrow function with implicit return!)

/* In the files that will be injected, we only allow imports from the following places. This is mainly to avoid the complexity
of dealing with nested imports, but as a bonus we also avoid importing from 3rd-party packages, which wouldn't work in Playroom. */
const allowedPackages = ["react"];
const allowedPackageScopes = ["@navikt"];

/**
 * Scans the code for imports from the predefined folders, injects the imported code and removes the import statements.
 * Makes some assumptions, see comments bellow for details.
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

    // Handle imported components that should be inlined in the example JSX.
    if (importPath.includes(jsxInjectDir)) {
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
    // Handle imports that should be injected at the end.
    else if (importPath.includes(codeInjectDir)) {
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
 * Only handles imports from a few predefined packages.
 */
function handleDependencies(
  importDeclarations: Collection<namedTypes.ImportDeclaration>,
  currentImportDecl: ASTPath<namedTypes.ImportDeclaration>,
  parsedImportedCode: Collection<any>,
) {
  parsedImportedCode.find(j.ImportDeclaration).forEach((nestedImportDecl) => {
    const packageName = nestedImportDecl.value.source.value?.toString() || "";
    if (
      (!allowedPackageScopes.includes(packageName.split("/")[0]) &&
        !allowedPackages.includes(packageName)) ||
      !nestedImportDecl.value.specifiers // specifiers is the stuff between `import` and `from`. We don't support `import "file.css";`.
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
              (oldSpecifier.type === "ImportDefaultSpecifier" &&
                oldSpecifier.local.name === newSpecifier.local?.name) ||
              (oldSpecifier.type === "ImportSpecifier" &&
                oldSpecifier.local.name === newSpecifier.local?.name),
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
