const api = require("./api");
const fs = require("fs");
const path = require("path");
const pLimit = require("p-limit");
const kebab = require("lodash.kebabcase");

const main = async () => {
  const iconFolder = "./svg";
  const misses = [];

  // Limiting to ~20 concurrent downloads seems to lead to fewer erros
  const limit = pLimit(20);

  const iconNodesArr = await api.getNodeChildren().catch((e) => {
    throw e;
  });

  const iconUrls = await api.getSvgImageUrls(
    iconNodesArr.map((node) => node.node_id).join(",")
  );

  if (fs.existsSync(iconFolder)) {
    fs.rmdirSync(iconFolder);
  }
  fs.mkdirSync(iconFolder);

  console.log("Total icons: " + iconNodesArr.length);

  await Promise.all(
    iconUrls.map((url, x) =>
      limit(() =>
        api
          .getIconContent(url)
          .then(({ data }) => {
            fs.writeFileSync(
              path.resolve(iconFolder, `${kebab(iconNodesArr[x].name)}.svg`),
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
    fs.writeFileSync(
      path.resolve("./", `misses.txt`),
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
