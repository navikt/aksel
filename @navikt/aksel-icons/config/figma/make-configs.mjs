import { writeFileSync } from "fs";
import jsYaml from "js-yaml";
import startCase from "lodash.startcase";
import { resolve } from "path";
const iconFolder = "./svgtest";

export const makeConfig = (icons) => {
  console.log(icons);

  icons.forEach((icon) => {
    const config = {
      name: `${startCase(icon.name).replace(/\s/g, "")}`,
      category: icon.containing_frame.pageName,
      keywords: [...icon.description.split(",").map((x) => x.trim())],
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
