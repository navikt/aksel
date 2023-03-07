import { writeFileSync } from "fs";
import jsYaml from "js-yaml";
import { resolve } from "path";
import { resolveName } from "./icon-name.mjs";
const iconFolder = "./svgtest";

export const makeConfig = (icons) => {
  icons.forEach((icon) => {
    const config = {
      name: resolveName(icon).replace(".svg", ""),
      category: icon.containing_frame.pageName,
      sub_category: icon.containing_frame.name,
      keywords: [...icon.description.split(",").map((x) => x.trim())],
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

    writeFileSync(resolve(iconFolder, `${config.name}.yml`), yml, {
      encoding: "utf8",
    });
  });
};
