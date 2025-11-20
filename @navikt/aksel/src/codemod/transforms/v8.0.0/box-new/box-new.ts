import type { API, FileInfo } from "jscodeshift";
import { findComponentImport } from "../../../utils/ast";
import { getLineTerminator } from "../../../utils/lineterminator";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const toSourceOptions = getLineTerminator(file.source);

  const boxLocalName =
    findComponentImport({
      root,
      j,
      name: "Box",
      packageType: "react",
    }) || "Box";

  // Rename <BoxNew ...> to <Box ...>
  root.find(j.JSXOpeningElement).forEach((path) => {
    if (
      path.value.name.type === "JSXIdentifier" &&
      path.value.name.name === "BoxNew"
    ) {
      path.value.name.name = "Box";
    }
    // Rename <Box.New ...> to <Box ...>
    if (
      path.value.name.type === "JSXMemberExpression" &&
      path.value.name.object.type === "JSXIdentifier" &&
      path.value.name.object.name === boxLocalName &&
      path.value.name.property.name === "New"
    ) {
      path.value.name = j.jsxIdentifier(boxLocalName);
    }
  });

  root.find(j.JSXClosingElement).forEach((path) => {
    if (
      path.value.name.type === "JSXIdentifier" &&
      path.value.name.name === "BoxNew"
    ) {
      path.value.name.name = "Box";
    }
    if (
      path.value.name.type === "JSXMemberExpression" &&
      path.value.name.object.type === "JSXIdentifier" &&
      path.value.name.object.name === boxLocalName &&
      path.value.name.property.name === "New"
    ) {
      path.value.name = j.jsxIdentifier(boxLocalName);
    }
  });

  // Handle imports
  const imports = root.find(j.ImportDeclaration).filter((path) => {
    return (
      path.value.source.value === "@navikt/ds-react" ||
      path.value.source.value === "@navikt/ds-react/Box"
    );
  });

  imports.forEach((path) => {
    const specifiers = path.value.specifiers;
    if (!specifiers) return;

    const boxNewIndex = specifiers.findIndex(
      (s) => s.type === "ImportSpecifier" && s.imported.name === "BoxNew",
    );

    if (boxNewIndex !== -1) {
      const boxIndex = specifiers.findIndex(
        (s) => s.type === "ImportSpecifier" && s.imported.name === "Box",
      );

      if (boxIndex !== -1) {
        // Box already imported, remove BoxNew
        const boxNewSpecifier = specifiers[boxNewIndex];
        if (
          boxNewSpecifier.type === "ImportSpecifier" &&
          boxNewSpecifier.local &&
          boxNewSpecifier.local.name !== "BoxNew"
        ) {
          const localName = boxNewSpecifier.local.name;
          root.find(j.JSXOpeningElement).forEach((jsxPath) => {
            if (
              jsxPath.value.name.type === "JSXIdentifier" &&
              jsxPath.value.name.name === localName
            ) {
              jsxPath.value.name.name = boxLocalName;
            }
          });
          root.find(j.JSXClosingElement).forEach((jsxPath) => {
            if (
              jsxPath.value.name.type === "JSXIdentifier" &&
              jsxPath.value.name.name === localName
            ) {
              jsxPath.value.name.name = boxLocalName;
            }
          });
        }
        specifiers.splice(boxNewIndex, 1);
      } else {
        // Rename BoxNew to Box
        const boxNewSpecifier = specifiers[boxNewIndex];
        if (boxNewSpecifier.type === "ImportSpecifier") {
          boxNewSpecifier.imported.name = "Box";
          // If local name is BoxNew, rename it to Box
          if (
            boxNewSpecifier.local &&
            boxNewSpecifier.local.name === "BoxNew"
          ) {
            boxNewSpecifier.local.name = "Box";
          }
        }
      }
    }
  });

  return root.toSource(toSourceOptions);
}
