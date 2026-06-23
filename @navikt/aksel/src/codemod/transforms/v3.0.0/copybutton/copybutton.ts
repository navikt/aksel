import chalk from "chalk";
import type { API, Collection, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";
import moveAndRenameImport from "../../../utils/packageImports";
import removePropsFromComponent from "../../../utils/removeProps";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  let root: Collection<any>;
  try {
    root = j(file.source);
  } catch {
    return file.source;
  }

  const toName = "CopyButton";
  const localName = moveAndRenameImport(j, root, {
    fromImport: "@navikt/ds-react-internal",
    toImport: "@navikt/ds-react",
    fromName: "CopyToClipboard",
    toName,
    ignoreAlias: true,
  });

  if (localName === null) {
    return root.toSource(getLineTerminator(file.source));
  }

  /* Finds and replaces import from CopyToClipboard -> CopyButton */

  if (root.findJSXElements(localName)) {
    removePropsFromComponent(j, root, localName, [
      "popoverText",
      "popoverPlacement",
      "iconPosition",
      "variant",
    ]);

    const component = root.findJSXElements(localName);

    component.forEach((node) => {
      const children = node.node.children;
      let flagged = false;
      if (
        children &&
        children.length > 0 &&
        !node.node.openingElement.attributes?.some(
          (attr) => attr.type === "JSXAttribute" && attr.name.name === "text",
        )
      ) {
        if (children.length === 1 && children[0].type === "JSXText") {
          node.node.openingElement.attributes?.push(
            j.jsxAttribute(
              j.jsxIdentifier("text"),
              j.literal(children[0].value.trim()),
            ),
          );
        } else {
          flagged = true;
          console.info(
            chalk.yellow(
              `\n\nWarning: Detected advanced children-type!\nCodemod can't convert into "text" prop so you will need to update this manually.`,
            ),
          );
        }
      }

      if (!flagged) {
        node.node.children = [];
        node.node.openingElement.selfClosing = true;
        node.node.closingElement = null;
      }
    });

    const compRoot = root.find(j.JSXElement, {
      openingElement: { name: { name: localName } },
    });

    compRoot.forEach((x) => {
      const openingName = x.node.openingElement.name;
      if (openingName.type === "JSXIdentifier") {
        openingName.name = "CopyButton";
      }
      if (x.node.children && x.node.children.length > 0) {
        const closingName = x.node.closingElement?.name;
        if (closingName?.type === "JSXIdentifier") {
          closingName.name = "CopyButton";
        }
      }
    });
  }

  return root.toSource(getLineTerminator(file.source));
}
