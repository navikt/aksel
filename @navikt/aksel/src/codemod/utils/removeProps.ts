import core, { Collection } from "jscodeshift";

export default function removePropsFromComponent(
  j: core.JSCodeshift,
  root: Collection<any>,
  componentName: string,
  propsToRemove: string[]
) {
  const component = root.findJSXElements(componentName);

  component.forEach((node) => {
    const attributes = node.node.openingElement.attributes;

    for (let i = attributes.length - 1; i >= 0; i--) {
      const attribute = attributes[i];

      if (
        attribute.type === "JSXAttribute" &&
        propsToRemove.includes(attribute.name.name.toString())
      ) {
        attributes.splice(i, 1);
      }
    }
  });
}
