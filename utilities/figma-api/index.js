require("dotenv").config();
const api = require("./api");
const fs = require("fs");
const path = require("path");

const main = async () => {
  const iconFolder = "./icons";
  const misses = [];

  const iconNodesArr = await api.getNodeChildren(
    process.env.FRAME_WITH_ICONS_ID
  );

  if (!fs.existsSync(iconFolder)) {
    fs.mkdirSync(iconFolder);
  }

  await iconNodesArr.reduce(async (promise, iconNode) => {
    await promise;
    const url = await api.getSvgImageUrl(iconNode.id).catch((e) => {
      misses.push(iconNode.name);
      return;
    });

    const { data: iconcontent } = await api.getIconContent(url).catch((e) => {
      misses.push(iconNode.name);
      return;
    });

    fs.writeFileSync(
      path.resolve(iconFolder, `${iconNode.name}.svg`),
      iconcontent,
      {
        encoding: "utf8",
      }
    );
  }, Promise.resolve());

  if (misses.length > 0) {
    fs.writeFileSync(path.resolve("./", `misses.txt`), misses, {
      encoding: "utf8",
    });
    console.log(`\nCould not download ${misses.length} icons\n`);
  } else {
    console.log("\nDonwloaded all icons from Figma successfully!\n");
  }
};

main();
