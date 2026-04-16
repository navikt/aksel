import type { API, FileInfo } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let localName = "Chat";

  const root = j(file.source);

  /* Finds used name for Chat component */
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers?.forEach((x) => {
        if (x.type !== "ImportSpecifier") return;
        if (
          x.imported.name === "Chat" &&
          x.local &&
          x.local.name !== x.imported.name
        ) {
          localName = String(x.local.name);
        }
      });
    });

  root
    .find(j.JSXElement, {
      openingElement: {
        name: {
          name: localName,
        },
      },
    })
    .forEach((path) => {
      j(path)
        .find(j.JSXAttribute, {
          name: {
            name: "backgroundColor",
          },
        })
        .remove();
      j(path)
        .find(j.JSXAttribute, {
          name: {
            name: "avatarBgColor",
          },
        })
        .remove();
    });

  root
    .find(j.JSXElement, {
      openingElement: {
        name: {
          type: "JSXMemberExpression",
          object: {
            name: localName,
          },
          property: {
            name: "Bubble",
          },
        },
      },
    })
    .forEach((path) => {
      j(path)
        .find(j.JSXAttribute, {
          name: {
            name: "backgroundColor",
          },
        })
        .remove();
    });

  return root.toSource(getLineTerminator(file.source));
}
