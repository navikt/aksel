import { config } from "dotenv";
import { fetchIcons, fetchDownloadUrls, fetchIcon } from "./fetch-icons.mjs";
import { existsSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { resolve } from "path";
import startCase from "lodash.startcase";
config();
/* https://www.figma.com/file/wEdyFjCQSBR3U7FvrMbPXa/Core-Icons-Next?node-id=277%3A1221&t=mUJzFvnsceYYXNL5-0 */

const iconFolder = "./svgtest";

if (!process.env.FIGMA_TOKEN) {
  throw new Error("FIGMA_TOKEN not set in .env");
}

async function main() {
  const icons = await fetchIcons();

  console.log(icons);

  const { images } = await fetchDownloadUrls(
    icons.map((x) => x.node_id).join(",")
  );

  if (existsSync(iconFolder)) {
    rmSync(iconFolder, { recursive: true, force: true });
  }
  mkdirSync(iconFolder);

  console.log(`Laster ned ${Object.keys(images).length} ikoner`);

  for (const [key, value] of Object.entries(images)) {
    const icon = await fetchIcon(value);
    icon &&
      writeFileSync(
        resolve(
          iconFolder,
          `${startCase(icons.find((x) => x.node_id === key).name).replace(
            /\s/g,
            ""
          )}.svg`
        ),
        icon,
        {
          encoding: "utf8",
        }
      );
  }
}

main();
