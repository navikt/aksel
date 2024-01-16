import { getLineTerminator } from "../../../utils/lineterminator";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  let localName = "Chat";

  const root = j(file.source);

  /* Finds used name for Chat component */
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers.forEach((x) => {
        if (x.imported.name === "Chat" && x.local.name !== x.imported.name) {
          localName = x.local.name;
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
