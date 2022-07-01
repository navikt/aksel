import renameProps from "../utils/rename-props";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  let localName = "Pagination";

  const root = j(file.source);

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
    renameProps({
      root,
      componentName: localName,
      props: {
        illustrationBgColor: "avatarBgColor",
        illustration: "avatar",
        topText: "name",
      },
    });
  }

  return root.toSource(options.printOptions);
}
