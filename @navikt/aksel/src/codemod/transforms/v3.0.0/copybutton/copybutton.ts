import chalk from "chalk";
import moveAndRenameImport from "../../../utils/moveAndRenameImport";
import removePropsFromComponent from "../../../utils/removeProps";
import { getLineTerminator } from "../../../utils/lineterminator";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options, ...rest) {
  const j = api.jscodeshift;

  let root: any;
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
  });

  if (localName === null) {
    return root.toSource(options.printOptions);
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
        children.length > 0 &&
        !node.node.openingElement.attributes.some(
          (attr) => attr.name.name === "text"
        )
      ) {
        if (children.length === 1 && children[0].type === "JSXText") {
          node.node.openingElement.attributes.push(
            j.jsxAttribute(
              j.jsxIdentifier("text"),
              j.literal(children[0].value.trim())
            )
          );
        } else {
          flagged = true;
          console.log(
            chalk.yellow(
              `\n\nWarning: Detected advanced children-type!\nCodemod can't convert into "text" prop so you will need to update this manually.`
            )
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
      x.node.openingElement.name.name = "CopyButton";
      if (x.node.children.length > 0) {
        x.node.closingElement.name.name = "CopyButton";
      }
    });
  }

  return root.toSource(getLineTerminator(file.source));
}
