import renameProps from "../utils/rename-props";
import addImports from "jscodeshift-add-imports";
import { stringLiteral } from "jscodeshift";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const t = (r) =>
    r
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === "@navikt/ds-react")
      .find(j.ImportSpecifier, {
        local: {
          type: "Identifier",
          name: "SpeechBubble",
        },
      })
      .remove();

  t(root);

  const hasChat = (r) =>
    r
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === "@navikt/ds-react")
      .find(j.ImportSpecifier, {
        local: {
          type: "Identifier",
          name: "SpeechBubble",
        },
      }).length > 0;

  if (!hasChat(root)) {
    addImports(
      root,
      j.importDeclaration(
        [j.importSpecifier(j.identifier("Chat"), j.identifier("Chat"))],
        j.stringLiteral("@navikt/ds-react")
      )
    );
  }

  if (!!j(file.source).findJSXElements("SpeechBubble")) {
    renameProps({
      root,
      componentName: "SpeechBubble",
      props: {
        illustrationBgColor: "avatarBgColor",
        illustration: "avatar",
        topText: "name",
      },
    });

    const update = (path, name) => {
      path.node.openingElement.name.name = name;
      path.node.closingElement.name.name = name;
    };

    // find and update all merge calls
    const w = root.find(j.JSXElement, {
      openingElement: { name: { name: "SpeechBubble" } },
    });

    const child = root.find(
      j.JSXElement /* , {
      type: "JSXMemberExpression",
    } */
    );

    w.forEach((x) => update(x, "Chat"));

    child.forEach((x) => {
      if (x.value.openingElement.name.type === "JSXMemberExpression") {
        x.value.openingElement.name.object.name = "Chat";
        x.value.closingElement.name.object.name = "Chat";
      }
    });
  }

  /* root
    .find(j.JSXElement)
    .forEach((x) => console.log(x.node.openingElement.name)); */
  /* console.log(root.find(j.JSXElement)); */

  return root.toSource(options.printOptions);

  /* return j(file.source)
    .findJSXElements("SpeechBubble")

    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;
      attributes.forEach((node, index) => {
        if (
          node.type === "JSXAttribute" &&
          node.name.name === "color" &&
          (node.value.value === "default" ||
            node.value.expression?.value === "default")
        ) {
          delete attributes[index];
        }
      });
    })
    .toSource(printOptions); */

  /* const root = j(file.source); */

  /*
  const specifiers = root
    .find(j.ImportDeclaration)
    .filter((path) => {
      console.log(path.node.source.value);
      return path.node.source.value === "@fancylib/button";
    })
    .find(j.ImportDefaultSpecifier);
  if (specifiers.length === 0) {
    return;
  } */
}
