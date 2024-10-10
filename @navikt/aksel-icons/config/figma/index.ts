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
  const icons = await fetchIcons();

  const images = await fetchDownloadUrls(icons.map((x) => x.node_id));

  if (existsSync(iconFolder)) {
    rmSync(iconFolder, { recursive: true, force: true });
  }

  mkdirSync(iconFolder);

  console.info(`Downloading ${Object.keys(images).length} icons from Figma...`);

  let counter = 0;
  for (const [key, value] of Object.entries(images)) {
    const icon = await fetch(value)
      .then((x) => x.text())
      .catch((e) => {
        throw e.message;
      });

    if (!icon) {
      continue;
    }

    /*
     * Arbitrary delay to not get rate-limited by image hosting
     * Currently accounts for ~18 seconds in theory, but in practice the bottleneck is fetching each icon 1 at a time
     */
    await new Promise((r) => setTimeout(r, 20));

    counter++;

    if (counter % 20 === 0) {
      process.stdout.write(`Processed ${counter} icons\r`);
    }

    const matchingIcon = icons.find((x) => x.node_id === key);

    if (!matchingIcon) {
      throw new Error(
        `No matching icon found for ${key}. It should not be possible to dowload icon without a matching icon in the list of icons fetched from Figma.`,
      );
    }

    writeFileSync(resolve(iconFolder, resolveName(matchingIcon)), icon, {
      encoding: "utf8",
    });
  }
  console.info(`Completed processing of ${counter} icons`);

  makeConfig(icons, iconFolder);

  const filesInDir = readdirSync(iconFolder);

  if (filesInDir.length * 2 !== icons.length) {
    throw new Error(
      `Icons written to directory (${filesInDir.length}) does not match the amount of icons located in Figma (${icons.length})`,
    );
  }

  console.info(
    `Success! A total of ${
      Object.keys(images).length
    } were fetched and downloaded from Figma 🎉`,
  );
}
