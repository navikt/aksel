import type { Collection } from "jscodeshift";

interface RenamePropsOptions {
  root: Collection;
  componentName: string;
  props: Record<string, string>;
}

export default function renameProps({
  root,
  componentName,
  props,
}: RenamePropsOptions) {
  return root.findJSXElements(componentName).forEach((path) => {
    path.node.openingElement.attributes?.forEach((node) => {
      if (
        node.type === "JSXAttribute" &&
        typeof node.name.name === "string" &&
        Object.keys(props).includes(node.name.name)
      ) {
        node.name.name = props[node.name.name];
      }
    });
  });
}
