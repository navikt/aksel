import moveAndRenameImport from "../../../utils/moveAndRenameImport";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  /*   let localName = "CopyToClipboard"; */

  const root = j(file.source);

  moveAndRenameImport(j, root, {
    fromImport: "@navikt/ds-react-internal",
    toImport: "@navikt/ds-react",
    fromName: "CopyToClipboard",
    toName: "CopyButton",
  });

  /* Finds and replaces import from CopyToClipboard -> CopyButton */
  /* root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react-internal")
    .forEach((imp) => {
      imp.value.specifiers.forEach((x) => {
        if (x.imported.name === "CopyToClipboard") {
          if (x.local.name !== x.imported.name) {
            localName = x.local.name;
            x.imported.name = "CopyButton";
          } else {
            x.imported.name = "CopyButton";
            x.local.name = "CopyButton";
          }
        }
      });
    }); */

  /* if (j(file.source).findJSXElements(localName)) {
    const compRoot = root.find(j.JSXElement, {
      openingElement: { name: { name: localName } },
    });

    compRoot.forEach((x) => {
      if (localName !== "CopyToClipboard") return;
      x.node.openingElement.name.name = "CopyButton";
      x.node.closingElement.name.name = "CopyButton";
    });

    const child = root.find(j.JSXElement);

    child.forEach((x) => {
      if (
        x.value.openingElement.name.type === "JSXMemberExpression" &&
        x.value.openingElement.name.object.name === "CopyToClipboard"
      ) {
        x.value.openingElement.name.object.name = "CopyButton";
        x.value.closingElement.name.object.name = "CopyButton";
      }
    });
  } */

  return root.toSource(options.printOptions);
}
