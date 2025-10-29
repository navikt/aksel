import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { fetchDownloadUrls, fetchIcons } from "./fetch-icons";
import { resolveName } from "./icon-name";
import { makeConfig } from "./make-configs";

/**
 * https://www.figma.com/file/wEdyFjCQSBR3U7FvrMbPXa/Core-Icons-Next?node-id=277%3A1221&t=mUJzFvnsceYYXNL5-0
 * This is the current source for all icons we are working with.
 */

const iconFolder = "./icons";

if (!process.env.FIGMA_TOKEN) {
  throw new Error("FIGMA_TOKEN not set in .env");
}

main();

async function main() {
  console.info("Started icon-update from Figma");
  /* Icons are published as 'components' in Figma */
  const publishedIconComponents = await fetchIcons();

  /* When we have all the published icons, we can ask figma for URL's for downloading them as assets */
  const imagesUrls = await fetchDownloadUrls(
    publishedIconComponents.map((x) => x.node_id),
  );

  /* Lets do a clean install */
  if (existsSync(iconFolder)) {
    rmSync(iconFolder, { recursive: true, force: true });
  }
  mkdirSync(iconFolder);

  console.group(`Processing ${Object.keys(imagesUrls).length} icons...`);

  const fileNames = new Set<string>();

  await Promise.all(
    Object.entries(imagesUrls).map(async ([nodeId, iconUrl]) => {
      /* Each icon is now a raw string for a complete SVG */
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

      /*
       * In some cases if multiple icons are published in Figma with the same name,
       * we will end up overwriting the icon with the same name.
       */
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
  const svgFiles = filesInDir.filter((x) => x.endsWith(".svg"));
  const ymlFiles = filesInDir.filter((x) => x.endsWith(".yml"));

  if (
    svgFiles.length !== publishedIconComponents.length ||
    ymlFiles.length !== publishedIconComponents.length
  ) {
    throw new Error(
      `Icons (${svgFiles.length}) and configs (${ymlFiles.length}) written to directory does not match the expected amount of icons located in Figma (${publishedIconComponents.length}).\nThis is most likely caused by duplicate icon names from figma.`,
    );
  }

  console.info(
    `Success! A total of ${
      Object.keys(imagesUrls).length
    } were fetched and downloaded from Figma 🎉`,
  );
}
