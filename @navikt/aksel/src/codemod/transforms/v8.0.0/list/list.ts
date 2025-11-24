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
  let dsReactImportPath: ASTPath<ImportDeclaration> | null = null;

  let localHeadingName = "Heading";
  let hasHeadingImport = false;

  let localBodyShortName = "BodyShort";
  let hasBodyShortImport = false;

  let localBoxName = "Box";
  let hasBoxImport = false;

  // Find the local name for List import
  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === "@navikt/ds-react") {
      dsReactImportPath = path;
      path.node.specifiers?.forEach((specifier) => {
        if (specifier.type === "ImportSpecifier") {
          if (specifier.imported.name === "List") {
            localListName = specifier.local?.name || "List";
            hasListImport = true;
          }
          if (specifier.imported.name === "Heading") {
            localHeadingName = specifier.local?.name || "Heading";
            hasHeadingImport = true;
          }
          if (specifier.imported.name === "BodyShort") {
            localBodyShortName = specifier.local?.name || "BodyShort";
            hasBodyShortImport = true;
          }
          if (specifier.imported.name === "Box") {
            localBoxName = specifier.local?.name || "Box";
            hasBoxImport = true;
          }
        }
      });
    } else if (path.node.source.value === "@navikt/ds-react/List") {
      path.node.specifiers?.forEach((specifier) => {
        if (specifier.type === "ImportSpecifier") {
          if (specifier.imported.name === "List") {
            localListName = specifier.local?.name || "List";
            hasListImport = true;
          }
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

      if (
        attributes.some(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name.name === "data-aksel-migrated-v8",
        )
      ) {
        return;
      }

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
      const listAttributes: JSXAttribute[] = [
        j.jsxAttribute(j.jsxIdentifier("data-aksel-migrated-v8")),
      ];
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
        if (!hasHeadingImport) {
          newImports.add("Heading");
        }
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
          j.jsxOpeningElement(j.jsxIdentifier(localHeadingName), headingAttrs),
          j.jsxClosingElement(j.jsxIdentifier(localHeadingName)),
          children,
        );
        newNodes.push(heading);
      }

      // Create BodyShort
      if (descValue) {
        if (!hasBodyShortImport) {
          newImports.add("BodyShort");
        }
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
          j.jsxOpeningElement(j.jsxIdentifier(localBodyShortName), bodyAttrs),
          j.jsxClosingElement(j.jsxIdentifier(localBodyShortName)),
          children,
        );
        newNodes.push(body);
      }

      // Create Box
      if (!hasBoxImport) {
        newImports.add("Box");
      }
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
        j.jsxOpeningElement(j.jsxIdentifier(localBoxName), boxAttrs),
        j.jsxClosingElement(j.jsxIdentifier(localBoxName)),
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
  if (newImports.size > 0) {
    if (dsReactImportPath) {
      const existingSpecifiers = new Set(
        dsReactImportPath.node.specifiers?.map(
          (specifier) => specifier.local?.name,
        ),
      );

      newImports.forEach((imp) => {
        if (!existingSpecifiers.has(imp)) {
          dsReactImportPath!.node.specifiers?.push(
            j.importSpecifier(j.identifier(imp)),
          );
        }
      });
    } else {
      const specifiers = Array.from(newImports).map((imp) =>
        j.importSpecifier(j.identifier(imp)),
      );
      const newImportDecl = j.importDeclaration(
        specifiers,
        j.stringLiteral("@navikt/ds-react"),
      );

      const lastImport = root.find(j.ImportDeclaration).at(-1);
      if (lastImport.length > 0) {
        lastImport.insertAfter(newImportDecl);
      } else {
        root.get().node.program.body.unshift(newImportDecl);
      }
    }
  }

  return root.toSource(getLineTerminator(file.source));
}
