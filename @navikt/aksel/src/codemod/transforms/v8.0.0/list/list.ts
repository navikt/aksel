import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  JSXAttribute,
  JSXSpreadAttribute,
} from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";

const headingSizeMap = {
  small: "xsmall",
  medium: "small",
  large: "medium",
};

const bodySizeMap = {
  small: "small",
  medium: "medium",
  large: "large",
};

const boxMarginMap = {
  small: "space-12",
  medium: "space-16",
  large: "space-16",
};

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let localListName = "List";
  let hasListImport = false;
  let listImportPath: ASTPath<ImportDeclaration> = null;

  // Find the local name for List import
  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === "@navikt/ds-react") {
      path.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === "ImportSpecifier" &&
          specifier.imported.name === "List"
        ) {
          localListName = specifier.local?.name || "List";
          hasListImport = true;
          listImportPath = path;
        }
      });
    }
  });

  if (!hasListImport) {
    return root.toSource(getLineTerminator(file.source));
  }

  const newImports = new Set<string>();

  root
    .find(j.JSXElement, {
      openingElement: { name: { name: localListName } },
    })
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;

      const titleAttr = attributes.find(
        (attr) => attr.type === "JSXAttribute" && attr.name.name === "title",
      ) as JSXAttribute | undefined;
      const descAttr = attributes.find(
        (attr) =>
          attr.type === "JSXAttribute" && attr.name.name === "description",
      ) as JSXAttribute | undefined;

      if (!titleAttr && !descAttr) {
        return;
      }

      const headingTagAttr = attributes.find(
        (attr) =>
          attr.type === "JSXAttribute" && attr.name.name === "headingTag",
      ) as JSXAttribute | undefined;
      const sizeAttr = attributes.find(
        (attr) => attr.type === "JSXAttribute" && attr.name.name === "size",
      ) as JSXAttribute | undefined;

      // Extract values
      const titleValue = titleAttr?.value;
      const descValue = descAttr?.value;

      let sizeValue = "medium";
      if (sizeAttr && sizeAttr.value?.type === "StringLiteral") {
        sizeValue = sizeAttr.value.value;
      }

      let headingAs = "h3";
      if (headingTagAttr && headingTagAttr.value?.type === "StringLiteral") {
        headingAs = headingTagAttr.value.value;
      }

      // Separate attributes
      const listAttributes: JSXAttribute[] = [];
      const divAttributes: (JSXSpreadAttribute | JSXAttribute)[] = [];

      attributes.forEach((attr) => {
        if (attr.type !== "JSXAttribute") {
          // Spread attributes or others -> move to div
          divAttributes.push(attr);
          return;
        }

        const name = attr.name.name;

        if (
          name === "title" ||
          name === "description" ||
          name === "headingTag"
        ) {
          // Handled separately
          return;
        }

        if (
          name === "size" ||
          name === "as" ||
          name === "aria-label" ||
          name === "aria-labelledby"
        ) {
          listAttributes.push(attr);
        } else {
          divAttributes.push(attr);
        }
      });

      const newNodes = [];

      // Create Heading
      if (titleValue) {
        newImports.add("Heading");
        const headingAttrs = [
          j.jsxAttribute(j.jsxIdentifier("as"), j.stringLiteral(headingAs)),
        ];

        const mappedSize = headingSizeMap[sizeValue];
        if (mappedSize) {
          headingAttrs.push(
            j.jsxAttribute(
              j.jsxIdentifier("size"),
              j.stringLiteral(mappedSize),
            ),
          );
        }

        let children = [];
        if (titleValue.type === "StringLiteral") {
          children = [j.jsxText(titleValue.value)];
        } else if (titleValue.type === "JSXExpressionContainer") {
          children = [titleValue];
        }

        const heading = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier("Heading"), headingAttrs),
          j.jsxClosingElement(j.jsxIdentifier("Heading")),
          children,
        );
        newNodes.push(heading);
      }

      // Create BodyShort
      if (descValue) {
        newImports.add("BodyShort");
        const bodyAttrs = [];
        const mappedSize = bodySizeMap[sizeValue];
        if (mappedSize && mappedSize !== "medium") {
          bodyAttrs.push(
            j.jsxAttribute(
              j.jsxIdentifier("size"),
              j.stringLiteral(mappedSize),
            ),
          );
        }

        let children = [];
        if (descValue.type === "StringLiteral") {
          children = [j.jsxText(descValue.value)];
        } else if (descValue.type === "JSXExpressionContainer") {
          children = [descValue];
        }

        const body = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier("BodyShort"), bodyAttrs),
          j.jsxClosingElement(j.jsxIdentifier("BodyShort")),
          children,
        );
        newNodes.push(body);
      }

      // Create Box
      newImports.add("Box");
      const boxAttrs = [
        j.jsxAttribute(
          j.jsxIdentifier("marginBlock"),
          j.stringLiteral(boxMarginMap[sizeValue] || "space-16"),
        ),
        j.jsxAttribute(j.jsxIdentifier("asChild")),
      ];

      // Reconstruct List element
      const newList = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier(localListName), listAttributes),
        path.node.closingElement,
        path.node.children,
      );

      const box = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier("Box"), boxAttrs),
        j.jsxClosingElement(j.jsxIdentifier("Box")),
        [newList],
      );
      newNodes.push(box);

      // Wrap in div
      const div = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier("div"), divAttributes),
        j.jsxClosingElement(j.jsxIdentifier("div")),
        newNodes,
      );

      j(path).replaceWith(div);
    });

  // Add imports
  if (newImports.size > 0 && listImportPath) {
    const existingSpecifiers = new Set(
      listImportPath.node.specifiers?.map((specifier) => specifier.local?.name),
    );

    newImports.forEach((imp) => {
      if (!existingSpecifiers.has(imp)) {
        listImportPath.node.specifiers?.push(
          j.importSpecifier(j.identifier(imp)),
        );
      }
    });
  }

  return root.toSource(getLineTerminator(file.source));
}
