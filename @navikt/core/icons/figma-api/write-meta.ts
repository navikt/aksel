import { existsSync, unlinkSync, writeFileSync } from "fs";
import startCase from "lodash.startcase";
import { ComponentT } from ".";

const generateMetadata = (publishedIconNodes: ComponentT[]) => {
  return publishedIconNodes
    .map(({ name, description, created_at, containing_frame }) => {
      return {
        name: startCase(name).replace(/\s/g, ""),
        description,
        created_at,
        // strip emojis
        pageName: containing_frame.pageName.replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          ""
        ),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const writeMeta = (publishedIconNodes: ComponentT[]) => {
  const metadataFileName = "./meta.json";

  if (existsSync(metadataFileName)) {
    unlinkSync(metadataFileName);
  }
  writeFileSync(
    metadataFileName,
    JSON.stringify(generateMetadata(publishedIconNodes)),
    {
      encoding: "utf8",
    }
  );
};
