import { writeFileSync } from "fs";
import jsYaml from "js-yaml";
import { resolve } from "path";
import { resolveName } from "./icon-name.mjs";

export const makeConfig = (icons, folder) => {
  icons.forEach((icon) => {
    const name = resolveName(icon).replace(".svg", "");
    const keywords = icon.description
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    const config = {
      name,
      category: icon.containing_frame.pageName,
      sub_category: icon.containing_frame.name,
      keywords: keywords.length > 0 ? keywords : [name],
      variant: icon.name.includes("Variant=")
        ? icon.name.replace("Variant=", "")
        : "Stroke",
      updated_at: new Date(icon.updated_at)
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("."),
      created_at: new Date(icon.created_at)
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("."),
    };

    const yml = jsYaml.dump(config, { noRefs: true, skipInvalid: false });

    writeFileSync(resolve(folder, `${config.name}.yml`), yml, {
      encoding: "utf8",
    });
  });
};
