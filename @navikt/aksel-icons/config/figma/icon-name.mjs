import startCase from "lodash.startcase";
import camelCase from "lodash.camelCase";

export const resolveName = (icon) => {
  const isVariant = icon.name.startsWith("Variant=");

  if (isVariant) {
    const variant = icon.name.replace("Variant=", "").replace("Stroke", "");
    const actualName = icon["containing_frame"]?.["containingStateGroup"]?.name;
    const name = `${actualName}${variant}`;
    return `${startCase(camelCase(name)).replace(/ /g, "")}.svg`;
  }

  return `${startCase(camelCase(icon.name)).replace(/ /g, "")}.svg`;
};
