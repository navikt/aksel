import { getNodeChildren, getSvgImageUrls, getIconContent } from "./api";
import { existsSync, unlinkSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import pLimit from "p-limit";
import rimraf from "rimraf";
import startCase from "lodash.startcase";

const generateMetadata = (iconNodesArr) => {
  return iconNodesArr
    .map(({ name, description, created_at, updated_at, containing_frame }) => {
      return {
        name: startCase(name).replace(/\s/g, ""),
        description,
        created_at,
        updated_at,
        //strip emojis
        pageName: containing_frame.pageName.replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          ""
        ),
        visible: true,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

const main = async () => {
  const iconFolder = "./svg";
  const metadataFileName = "./figma-api/metadata.json";
  const misses = [];

  // Limiting to ~20 concurrent downloads seems to lead to fewer erros
  const limit = pLimit(20);

  const iconNodesArr = await getNodeChildren().catch((e) => {
    throw e;
  });

  if (existsSync(metadataFileName)) {
    unlinkSync(metadataFileName);
  }
  writeFileSync(
    metadataFileName,
    JSON.stringify(generateMetadata(iconNodesArr), null, 4),
    {
      encoding: "utf8",
    }
  );

  const iconUrls = await getSvgImageUrls(
    iconNodesArr.map((node) => node.node_id).join(",")
  );

  if (existsSync(iconFolder)) {
    rimraf.sync(iconFolder);
  }
  mkdirSync(iconFolder);

  console.log("Total icons: " + iconNodesArr.length);

  await Promise.all(
    iconUrls.map((url, x) =>
      limit(() =>
        getIconContent(url)
          .then(({ data }) => {
            writeFileSync(
              resolve(
                iconFolder,
                `${startCase(iconNodesArr[x].name).replace(/\s/g, "")}.svg`
              ),
              data,
              {
                encoding: "utf8",
              }
            );
          })
          .catch((e) => {
            misses.push({
              name: iconNodesArr[x].name,
              error: e.message,
            });
          })
      )
    )
  );

  if (misses.length > 0) {
    writeFileSync(
      resolve("./", `misses.txt`),
      JSON.stringify(misses, null, 4),
      {
        encoding: "utf8",
      }
    );
    console.log(`\nCould not download ${misses.length} icons\n`);
  } else {
    console.log("\nDownloaded all icons from Figma successfully!\n");
  }
};

try {
  main();
} catch (e) {
  console.error(e);
}
