import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fetchDownloadUrls, fetchIcons } from "./fetch-icons";
import { resolveName } from "./icon-name";
import { makeConfig } from "./make-configs";

/* https://www.figma.com/file/wEdyFjCQSBR3U7FvrMbPXa/Core-Icons-Next?node-id=277%3A1221&t=mUJzFvnsceYYXNL5-0 */

const iconFolder = "./icons";

if (!process.env.FIGMA_TOKEN) {
  throw new Error("FIGMA_TOKEN not set in .env");
}

main();

async function main() {
  console.info("Started icon-update from Figma");
  const publishedIconComponents = await fetchIcons();

  const imagesUrls = await fetchDownloadUrls(
    publishedIconComponents.map((x) => x.node_id),
  );

  if (existsSync(iconFolder)) {
    rmSync(iconFolder, { recursive: true, force: true });
  }

  mkdirSync(iconFolder);

  console.group(`Processing ${Object.keys(imagesUrls).length} icons...`);

  const fileNames = new Set<string>();

  await Promise.all(
    Object.entries(imagesUrls).map(async ([nodeId, iconUrl]) => {
      const iconSvg = await fetch(iconUrl)
        .then((x) => x.text())
        .catch((e) => {
          throw e.message;
        });

      const matchingIcon = publishedIconComponents.find(
        (x) => x.node_id === nodeId,
      );

      if (!matchingIcon) {
        throw new Error(
          `No matching icon found for ${nodeId}. It should not be possible to dowload icon without a matching icon in the list of icons fetched from Figma.`,
        );
      }

      const fileName = resolveName(matchingIcon);

      if (fileNames.has(fileName)) {
        console.warn(`Duplicate name detected: ${fileName}.`);
      }

      fileNames.add(fileName);

      writeFileSync(resolve(iconFolder, resolveName(matchingIcon)), iconSvg, {
        encoding: "utf8",
      });
    }),
  );

  if (fileNames.size !== publishedIconComponents.length) {
    console.warn(
      `Duplicate icon names from Figma leads to them being overwritten. This will cause the icon-library to be out of sync with Figma.`,
    );
  }

  console.info(`Completed processing 🎉`);
  console.groupEnd();

  makeConfig(publishedIconComponents, iconFolder);

  const filesInDir = readdirSync(iconFolder);

  if (filesInDir.length * 2 !== publishedIconComponents.length) {
    throw new Error(
      `Icons written to directory (${filesInDir.length}) does not match the amount of icons located in Figma (${publishedIconComponents.length}).\nThis is most likely caused by duplicate icon names from figma.`,
    );
  }

  console.info(
    `Success! A total of ${
      Object.keys(imagesUrls).length
    } were fetched and downloaded from Figma 🎉`,
  );
}
