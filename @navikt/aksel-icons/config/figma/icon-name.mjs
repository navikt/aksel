import startCase from "lodash.startcase";

export const resolveName = (icon) => {
  const isVariant = icon.name.startsWith("Variant=");

  if (isVariant) {
    const variant = icon.name.replace("Variant=", "").replace("Stroke", "");
    const actualName = icon["containing_frame"]?.["containingStateGroup"]?.name;
    const name = `${actualName}${variant}`;
    return `${startCase(name).replace(/\s/g, "")}.svg`;
  }

  return `${startCase(icon.name).replace(/\s/g, "")}.svg`;
};
