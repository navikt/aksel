require("dotenv").config();
const api = require("./api");
const fs = require("fs");
const path = require("path");

const main = async () => {
  const iconFolder = "./icons";
  const iconNodesArr = await api.getNodeChildren(
    process.env.FRAME_WITH_ICONS_ID
  );

  iconNodesArr.forEach(async (iconNode) => {
    const url = await api.getSvgImageUrl(iconNode.id);
    const { data: iconcontent } = await api.getIconContent(url);

    if (!fs.existsSync(iconFolder)) {
      fs.mkdirSync(iconFolder);
    }

    fs.writeFileSync(
      path.resolve(iconFolder, `${iconNode.name}.svg`),
      iconcontent,
      {
        encoding: "utf8",
      }
    );
  });
};

main();
