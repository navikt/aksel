/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  let localName = "Pagination";

  const root = j(file.source);

  function addMigrationTag(node) {
    const attributes = node.openingElement.attributes;
    const isMigrated = attributes.find(
      (node) =>
        node.type === "JSXAttribute" &&
        node.name.name === "data-version" &&
        node.value.value === "v1"
    );

    if (!isMigrated) {
      attributes.push(
        j.jsxAttribute(j.jsxIdentifier("data-version"), j.literal("v1"))
      );
    }
  }

  /* https://github.com/mui/material-ui/blob/master/packages/mui-codemod/src/v5.0.0/variant-prop.js */
  function addExplicitStandardProp(node) {
    const attributes = node.openingElement.attributes;
    const variant = attributes.find(
      (node) => node.type === "JSXAttribute" && node.name.name === "size"
    );

    if (!variant) {
      attributes.unshift(
        j.jsxAttribute(j.jsxIdentifier("size"), j.literal("small"))
      );
      addMigrationTag(node);
    }
  }

  /* Finds locally used name for Pagination */
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers.forEach((x) => {
        if (
          x.imported.name === "Pagination" &&
          x.local.name !== x.imported.name
        ) {
          localName = x.local.name;
        }
      });
    });

  if (!!j(file.source).findJSXElements(localName)) {
    root.findJSXElements(`${localName}`).forEach((parent) => {
      const skip = !!parent.value.openingElement?.attributes.find(
        (x) => x.name.name === "data-version" && x.value.value === "v1"
      );

      parent.value.openingElement?.attributes.forEach((x, index) => {
        let didUpdate = false;
        if (x.name?.name === "size" && x.type === "JSXAttribute" && !skip) {
          /* addExplicitStandardProp */
          if (x.value.value === "medium") {
            x.value = j.literal("small");
            didUpdate = true;
          } else if (x.value.value === "small") {
            x.value = j.literal("xsmall");
            didUpdate = true;
          }

          didUpdate && addMigrationTag(parent.value);
        }
      });
      addExplicitStandardProp(parent.value);
    });
  }

  return root.toSource(options.printOptions);
}
