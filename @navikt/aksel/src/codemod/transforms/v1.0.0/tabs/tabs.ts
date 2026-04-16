import type { API, FileInfo, JSXAttribute } from "jscodeshift";
import { getLineTerminator } from "../../../utils/lineterminator";
import renameProps from "../../../utils/rename-props";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let localName = "Tabs";
  let iconPositionProp: JSXAttribute | null = null;

  const root = j(file.source);

  /* Finds used name for Tabs component */
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers?.forEach((x) => {
        if (
          x.type === "ImportSpecifier" &&
          x.imported.name === "Tabs" &&
          x.local &&
          x.local.name !== x.imported.name
        ) {
          localName = String(x.local.name);
        }
      });
    });

  if (j(file.source).findJSXElements(localName)) {
    renameProps({
      root,
      componentName: `${localName}.List`,
      props: {
        loop: "null",
      },
    });

    root.findJSXElements(`${localName}`).forEach((parent) => {
      parent.value.children?.forEach((el) => {
        if (el.type !== "JSXElement") return;
        const openingEl = el.openingElement;
        if (openingEl.name.type === "JSXMemberExpression") {
          if (
            openingEl.name.object.type === "JSXIdentifier" &&
            openingEl.name.object.name === localName &&
            openingEl.name.property.name === "List"
          ) {
            /* Move loop-prop */
            openingEl.attributes?.forEach((x, index) => {
              if (x.type === "JSXAttribute" && x.name.name === "loop") {
                parent.value.openingElement.attributes?.push(x);
                openingEl.attributes?.splice(index, 1);
              }
            });

            /* Find and move iconPosition-prop to <Tabs/> */
            el.children?.forEach((tab) => {
              if (tab.type !== "JSXElement") return;
              const tabEl = tab.openingElement;
              if (
                tabEl.name.type === "JSXMemberExpression" &&
                tabEl.name.object.type === "JSXIdentifier" &&
                tabEl.name.object.name === localName &&
                tabEl.name.property.name === "Tab"
              ) {
                tabEl.attributes?.forEach((x, index) => {
                  if (
                    x.type === "JSXAttribute" &&
                    x.name.name === "iconPosition"
                  ) {
                    if (!iconPositionProp) {
                      iconPositionProp = x;
                    }
                    tabEl.attributes?.splice(index, 1);
                  }
                });
              }
            });
          }
        }
      });
      if (iconPositionProp) {
        parent.value.openingElement.attributes?.push(iconPositionProp);
      }
      iconPositionProp = null;
    });
  }

  return root.toSource(getLineTerminator(file.source));
}
