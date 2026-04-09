import type { API, FileInfo, JSXElement } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let localName = "Pagination";

  const root = j(file.source);

  function addMigrationTag(node: JSXElement) {
    const attributes = node.openingElement.attributes;
    if (!attributes) return;

    const isMigrated = attributes.find(
      (attr) =>
        attr.type === "JSXAttribute" &&
        attr.name.name === "data-version" &&
        attr.value?.type === "Literal" &&
        attr.value.value === "v1",
    );

    if (!isMigrated) {
      attributes.push(
        j.jsxAttribute(j.jsxIdentifier("data-version"), j.literal("v1")),
      );
    }
  }

  /* https://github.com/mui/material-ui/blob/master/packages/mui-codemod/src/v5.0.0/variant-prop.js */
  function addExplicitStandardProp(node: JSXElement) {
    const attributes = node.openingElement.attributes;
    if (!attributes) return;

    const variant = attributes.find(
      (attr) => attr.type === "JSXAttribute" && attr.name.name === "size",
    );

    if (!variant) {
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
        if (x.type !== "ImportSpecifier") return;
        if (
          x.imported.name === "Pagination" &&
          x.local &&
          x.local.name !== x.imported.name
        ) {
          localName = String(x.local.name);
        }
      });
    });

  if (j(file.source).findJSXElements(localName)) {
    root.findJSXElements(`${localName}`).forEach((parent) => {
      const skip = !!parent.value.openingElement?.attributes?.find(
        (x) =>
          x.type === "JSXAttribute" &&
          x.name.name === "data-version" &&
          x.value?.type === "Literal" &&
          x.value.value === "v1",
      );

      parent.value.openingElement?.attributes?.forEach((x) => {
        let didUpdate = false;
        if (x.type === "JSXAttribute" && x.name.name === "size" && !skip) {
          /* addExplicitStandardProp */
          if (x.value?.type === "Literal" && x.value.value === "medium") {
            x.value = j.literal("small");
            didUpdate = true;
          } else if (x.value?.type === "Literal" && x.value.value === "small") {
            x.value = j.literal("xsmall");
            didUpdate = true;
          }

          if (didUpdate) {
            addMigrationTag(parent.value);
          }
        }
      });
      addExplicitStandardProp(parent.value);
    });
  }

  return root.toSource(getLineTerminator(file.source));
}
