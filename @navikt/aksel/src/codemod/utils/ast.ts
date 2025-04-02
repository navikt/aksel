import {
  API,
  ASTPath,
  ImportDeclaration,
  JSXElement,
  JSXOpeningElement,
} from "jscodeshift";

/**
 * Finds a component import, accounting for sub-components and aliases.
 * Returns the local name of the component. If the component is not found, returns null.
 * root should ideally be the root of the file in most cases (imports happen at top level)
 */
function findComponentImport(input: {
  j: API["j"];
  root: ReturnType<API["j"]>;
  name: string;
  packageType?: "react" | "tokens";
}) {
  const { j, root, name: _name, packageType = "react" } = input;

  /* Account for sub-components */
  const name = _name.includes(".") ? _name.split(".")[0] : _name;

  let foundName: string | null = null;

  root.find(j.ImportDeclaration).forEach((path) => {
    if (packageType === "react" && !isAkselReactImport(path)) {
      return;
    }

    if (packageType === "tokens" && !isAkselTokensImport(path)) {
      return;
    }

    path.node.specifiers.forEach((specifier) => {
      if (
        specifier.type === "ImportSpecifier" &&
        specifier.imported.name === name
      ) {
        foundName = specifier.local
          ? specifier.local.name
          : specifier.imported.name;
      }
    });
  });

  return foundName;
}

/**
 * Finds a JSX element in the AST, accounting for sub-components.
 */
function findJSXElement(input: {
  root: ReturnType<API["j"]>;
  j: API["j"];
  name: string;
  originalName: string;
}) {
  const { root, j, name, originalName } = input;

  const isSubComponent = originalName.includes(".");

  const openingElement = (
    isSubComponent
      ? {
          name: {
            type: "JSXMemberExpression",
            object: {
              name,
            },
            property: {
              name: originalName.split(".")[1],
            },
          },
        }
      : {
          name: {
            type: "JSXIdentifier",
            name,
          },
        }
  ) as JSXOpeningElement;

  return root.find(j.JSXElement, {
    openingElement,
  });
}

/**
 * Finds a prop in a JSX element.
 */
function findProps(input: {
  j: API["j"];
  path: ASTPath<JSXElement>;
  name: string;
}) {
  const { j, path, name } = input;

  return j(path).find(j.JSXAttribute, {
    name: {
      name,
    },
  });
}

/**
 * Checks if an import is from @navikt/ds-react.
 */
function isAkselReactImport(path: ASTPath<ImportDeclaration>) {
  const importSource = path.node.source.value;
  return (
    typeof importSource === "string" &&
    importSource.startsWith("@navikt/ds-react")
  );
}

/**
 * Checks if an import is from @navikt/ds-tokens.
 */
function isAkselTokensImport(path: ASTPath<ImportDeclaration>) {
  const importSource = path.node.source.value;
  return (
    typeof importSource === "string" &&
    importSource.startsWith("@navikt/ds-tokens")
  );
}

export { findComponentImport, findJSXElement, findProps };
