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
  let localName = "Tabs";
  let iconPositionProp = null;
  const root = j(file.source);
  /* Finds used name for Tabs component */
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers.forEach((x) => {
        if (x.imported.name === "Tabs" && x.local.name !== x.imported.name) {
          localName = x.local.name;
        }
      });
    });
  if (j(file.source).findJSXElements(localName)) {
    (0, rename_props_1.default)({
      root,
      componentName: `${localName}.List`,
      props: {
        loop: "null",
      },
    });
    root.findJSXElements(`${localName}`).forEach((parent) => {
      parent.value.children.forEach((el) => {
        const openingEl = el.openingElement;
        if (
          (openingEl === null || openingEl === void 0
            ? void 0
            : openingEl.name) &&
          openingEl.name.type === "JSXMemberExpression"
        ) {
          if (
            openingEl.name.object.name === localName &&
            openingEl.name.property.name === "List"
          ) {
            /* Move loop-prop */
            el.openingElement.attributes.forEach((x, index) => {
              var _a;
              if (
                ((_a = x.name) === null || _a === void 0 ? void 0 : _a.name) ===
                  "loop" &&
                x.type === "JSXAttribute"
              ) {
                parent.value.openingElement.attributes.push(x);
                delete el.openingElement.attributes[index];
              }
            });
            /* Find and move iconPosition-prop to <Tabs/> */
            el.children.forEach((tab) => {
              const tabEl = tab.openingElement;
              if (
                (tabEl === null || tabEl === void 0 ? void 0 : tabEl.name) &&
                tabEl.name.type === "JSXMemberExpression"
              ) {
                if (
                  tabEl.name.object.name === localName &&
                  tabEl.name.property.name === "Tab"
                ) {
                  tabEl === null || tabEl === void 0
                    ? void 0
                    : tabEl.attributes.forEach((x, index) => {
                        var _a;
                        if (
                          ((_a = x.name) === null || _a === void 0
                            ? void 0
                            : _a.name) === "iconPosition" &&
                          x.type === "JSXAttribute"
                        ) {
                          if (!iconPositionProp) {
                            iconPositionProp = x;
                          }
                          delete tabEl.attributes[index];
                        }
                      });
                }
              }
            });
          }
        }
      });
      iconPositionProp &&
        parent.value.openingElement.attributes.push(iconPositionProp);
      iconPositionProp = null;
    });
  }
  return root.toSource(options.printOptions);
}
exports.default = transformer;
