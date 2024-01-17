import { config } from "dotenv";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fetchDownloadUrls, fetchIcon, fetchIcons } from "./fetch-icons.mjs";
import { resolveName } from "./icon-name.mjs";
import { makeConfig } from "./make-configs.mjs";
import { paginate } from "./paginate.mjs";

config();
/* https://www.figma.com/file/wEdyFjCQSBR3U7FvrMbPXa/Core-Icons-Next?node-id=277%3A1221&t=mUJzFvnsceYYXNL5-0 */

const iconFolder = "./icons";

if (!process.env.FIGMA_TOKEN) {
  throw new Error("FIGMA_TOKEN not set in .env");
}

async function main() {
  let icons = await fetchIcons();

  const totalIcons = icons.length;

  const { images } = await fetchDownloadUrls(
    paginate(
      icons.map((x) => x.node_id),
      400,
    ).map((x) => x.join(",")),
  );

  if (existsSync(iconFolder)) {
    rmSync(iconFolder, { recursive: true, force: true });
  }

  mkdirSync(iconFolder);

  console.log(`Laster ned ${Object.keys(images).length} ikoner`);

  for (const [key, value] of Object.entries(images)) {
    const icon = await fetchIcon(value).catch((e) => {
      throw e;
    });
    await new Promise((r) => setTimeout(r, 20));

    icon &&
      writeFileSync(
        resolve(iconFolder, resolveName(icons.find((x) => x.node_id === key))),
        icon,
        {
          encoding: "utf8",
        },
      );
  }

  makeConfig(icons, iconFolder);

  readdirSync(iconFolder, (_, files) => {
    if (files.length * 2 !== totalIcons) {
      throw new Error(`Ikoner mangler!`);
    }
  });

  console.log(`Success! ${Object.keys(images).length} ikoner lastet ned`);
}

main();
