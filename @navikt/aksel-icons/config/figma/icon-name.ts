import { PublishedComponent } from "@figma/rest-api-spec";
import { camelCase, startCase } from "lodash";

export const resolveName = (icon: PublishedComponent) => {
  const isVariant = icon.name.startsWith("Variant=");

  if (isVariant) {
    const variant = icon.name.replace("Variant=", "").replace("Stroke", "");

    const actualName = icon.containing_frame?.containingComponentSet?.name;
    const name = `${actualName}${variant}`;
    return `${startCase(camelCase(name)).replace(/ /g, "")}.svg`;
  }

  return `${startCase(camelCase(icon.name)).replace(/ /g, "")}.svg`;
};
