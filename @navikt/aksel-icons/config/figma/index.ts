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

  console.info(
    `Downloading ${Object.keys(imagesUrls).length} icons from Figma...`,
  );

  let counter = 0;
  for (const [nodeId, iconUrl] of Object.entries(imagesUrls)) {
    const iconSvg = await fetch(iconUrl)
      .then((x) => x.text())
      .catch((e) => {
        throw e.message;
      });

    if (!iconSvg) {
      continue;
    }

    /*
     * Arbitrary delay to not get rate-limited by image hosting
     * Currently accounts for ~18 seconds in theory, but in practice the bottlenech is fetching each icon 1 at a time
     */
    await new Promise((r) => setTimeout(r, 20));

    counter++;

    if (counter % 20 === 0) {
      process.stdout.write(`Processed ${counter} icons\r`);
    }

    const matchingIcon = publishedIconComponents.find(
      (x) => x.node_id === nodeId,
    );

    if (!matchingIcon) {
      throw new Error(
        `No matching icon found for ${nodeId}. It should not be possible to dowload icon without a matching icon in the list of icons fetched from Figma.`,
      );
    }

    writeFileSync(resolve(iconFolder, resolveName(matchingIcon)), iconSvg, {
      encoding: "utf8",
    });
  }
  console.info(`Completed processing of ${counter} icons`);

  makeConfig(publishedIconComponents, iconFolder);

  const filesInDir = readdirSync(iconFolder);

  if (filesInDir.length * 2 !== publishedIconComponents.length) {
    throw new Error(
      `Icons written to director (${filesInDir.length}) does not match the amount of icons located in Figma (${publishedIconComponents.length})`,
    );
  }

  console.info(
    `Success! A total of ${
      Object.keys(imagesUrls).length
    } were fetched and downloaded from Figma 🎉`,
  );
}
