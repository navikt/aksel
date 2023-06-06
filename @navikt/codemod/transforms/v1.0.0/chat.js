"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const rename_props_1 = __importDefault(require("../../utils/rename-props"));
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
function transformer(file, api, options) {
  const j = api.jscodeshift;
  let localName = "SpeechBubble";
  const root = j(file.source);
  /* Finds and replaces import from SpeechBubble -> Chat */
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers.forEach((x) => {
        if (x.imported.name === "SpeechBubble") {
          if (x.local.name !== x.imported.name) {
            localName = x.local.name;
            x.imported.name = "Chat";
          } else {
            x.imported.name = "Chat";
            x.local.name = "Chat";
          }
        }
      });
    });
  if (j(file.source).findJSXElements(localName)) {
    (0, rename_props_1.default)({
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
      x.node.openingElement.name.name = "Chat";
      x.node.closingElement.name.name = "Chat";
    });
    /* Need to handle dot-notations differently */
    const child = root.find(j.JSXElement);
    child.forEach((x) => {
      if (
        x.value.openingElement.name.type === "JSXMemberExpression" &&
        x.value.openingElement.name.object.name === "SpeechBubble"
      ) {
        x.value.openingElement.name.object.name = "Chat";
        x.value.closingElement.name.object.name = "Chat";
      }
    });
  }
  return root.toSource(options.printOptions);
}
exports.default = transformer;
