import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";
import renameProps from "../../../utils/rename-props";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let localName = "SpeechBubble";

  const root = j(file.source);

  /* Finds and replaces import from SpeechBubble -> Chat */
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers?.forEach((x) => {
        if (x.type !== "ImportSpecifier") return;
        if (x.imported.name === "SpeechBubble") {
          if (x.local && x.local.name !== x.imported.name) {
            localName = String(x.local.name);
            x.imported.name = "Chat";
          } else {
            x.imported.name = "Chat";
            if (x.local) {
              x.local.name = "Chat";
            }
          }
        }
      });
    });

  if (j(file.source).findJSXElements(localName)) {
    renameProps({
      root,
      componentName: localName,
      props: {
        illustrationBgColor: "avatarBgColor",
        illustration: "avatar",
        topText: "name",
      },
    });

    /* Find and replace name of all <SpeechBubble />*/
    const compRoot = root.find(j.JSXElement, {
      openingElement: { name: { name: localName } },
    });

    compRoot.forEach((x) => {
      if (localName !== "SpeechBubble") return;
      const opening = x.node.openingElement.name;
      if (opening.type === "JSXIdentifier") {
        opening.name = "Chat";
      }
      const closing = x.node.closingElement?.name;
      if (closing?.type === "JSXIdentifier") {
        closing.name = "Chat";
      }
    });

    /* Need to handle dot-notations differently */
    const child = root.find(j.JSXElement);

    child.forEach((x) => {
      const openingName = x.value.openingElement.name;
      if (
        openingName.type === "JSXMemberExpression" &&
        openingName.object.type === "JSXIdentifier" &&
        openingName.object.name === "SpeechBubble"
      ) {
        openingName.object.name = "Chat";
        const closingName = x.value.closingElement?.name;
        if (
          closingName?.type === "JSXMemberExpression" &&
          closingName.object.type === "JSXIdentifier"
        ) {
          closingName.object.name = "Chat";
        }
      }
    });
  }

  return root.toSource(getLineTerminator(file.source));
}
