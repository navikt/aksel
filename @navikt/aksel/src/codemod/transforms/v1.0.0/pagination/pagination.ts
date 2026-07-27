import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXElement,
  JSXSpreadAttribute,
} from "jscodeshift";
import { getJSXLiteralValue } from "../../../utils/jsx-value";
import { getLineTerminator } from "../../../utils/lineterminator";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let localName = "Pagination";

  const root = j(file.source);

  function addMigrationTag(node: JSXElement) {
    const attributes = node.openingElement.attributes;
    const isMigrated = attributes?.find(
      (attr: JSXAttribute | JSXSpreadAttribute) =>
        attr.type === "JSXAttribute" &&
        attr.name.name === "data-version" &&
        getJSXLiteralValue(attr.value) === "v1",
    );

    if (!isMigrated && attributes) {
      attributes.push(
        j.jsxAttribute(j.jsxIdentifier("data-version"), j.literal("v1")),
      );
    }
  }

  /* https://github.com/mui/material-ui/blob/master/packages/mui-codemod/src/v5.0.0/variant-prop.js */
  function addExplicitStandardProp(node: JSXElement) {
    const attributes = node.openingElement.attributes;
    const variant = attributes?.find(
      (attr: JSXAttribute | JSXSpreadAttribute) =>
        attr.type === "JSXAttribute" && attr.name.name === "size",
    );

    if (!variant && attributes) {
      attributes.unshift(
        j.jsxAttribute(j.jsxIdentifier("size"), j.literal("small")),
      );
      addMigrationTag(node);
    }
  }

  /* Finds locally used name for Pagination */
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers?.forEach((x) => {
        if (
          x.type === "ImportSpecifier" &&
          x.imported.type === "Identifier" &&
          x.imported.name === "Pagination" &&
          x.local?.name !== x.imported.name &&
          x.local?.name
        ) {
          localName = String(x.local.name);
        }
      });
    });

  if (j(file.source).findJSXElements(localName)) {
    root.findJSXElements(`${localName}`).forEach((parent) => {
      const skip = !!parent.value.openingElement?.attributes?.find(
        (attr: JSXAttribute | JSXSpreadAttribute) =>
          attr.type === "JSXAttribute" &&
          attr.name.name === "data-version" &&
          getJSXLiteralValue(attr.value) === "v1",
      );

      parent.value.openingElement?.attributes?.forEach(
        (x: JSXAttribute | JSXSpreadAttribute) => {
          let didUpdate = false;
          if (x.type === "JSXAttribute" && x.name?.name === "size" && !skip) {
            const value = getJSXLiteralValue(x.value);
            if (value === "medium") {
              x.value = j.literal("small");
              didUpdate = true;
            } else if (value === "small") {
              x.value = j.literal("xsmall");
              didUpdate = true;
            }

            didUpdate && addMigrationTag(parent.value);
          }
        },
      );
      addExplicitStandardProp(parent.value);
    });
  }

  return root.toSource(getLineTerminator(file.source));
}
