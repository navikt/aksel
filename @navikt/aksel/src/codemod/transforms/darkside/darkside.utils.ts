import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  JSXElement,
  JSXOpeningElement,
} from "jscodeshift";

/**
 *
 */
function findComponent(input: { j: API["j"]; file: FileInfo; name: string }) {
  const { j, file, name: _name } = input;

  /* Account for sub-components */
  const name = _name.includes(".") ? _name.split(".")[0] : _name;

  const root = j(file.source);

  let foundName: string | null = null;

  root.find(j.ImportDeclaration).forEach((path) => {
    if (!isAkselReactImport(path)) {
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

function findProp(input: {
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

function isAkselReactImport(path: ASTPath<ImportDeclaration>) {
  const importSource = path.node.source.value;
  return (
    typeof importSource === "string" &&
    importSource.startsWith("@navikt/ds-react")
  );
}

export { findComponent, findJSXElement, findProp };
