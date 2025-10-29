import { PublishedComponent } from "@figma/rest-api-spec";
import { dump } from "js-yaml";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { resolveName } from "./icon-name";

export type IconYml = {
  name: string;
  category: string;
  sub_category: string;
  keywords: string[];
  variant: string;
  updated_at: string;
  created_at: string;
};

export const makeConfig = (
  icons: PublishedComponent[],
  dirLocation: string,
) => {
  console.group("Creating icon yml...");

  let counter = 0;
  for (const icon of icons) {
    const name = resolveName(icon).replace(".svg", "");
    const keywords = icon.description
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    if (!icon.containing_frame?.pageName || !icon.containing_frame?.name) {
      throw new Error(
        `Missing containing_frame.pageName or containing_frame.name for icon ${name}`,
      );
    }

    const config: IconYml = {
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

    const yml = dump(config, {
      noRefs: true,
      skipInvalid: false,
      quotingType: '"',
    });

    writeFileSync(resolve(dirLocation, `${config.name}.yml`), yml, {
      encoding: "utf8",
    });
    counter++;
  }

  console.info(`Created ${counter} icon yml files`);
  console.groupEnd();
};
