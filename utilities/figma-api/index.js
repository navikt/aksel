require("dotenv").config();
const api = require("./api");
const fs = require("fs");
const path = require("path");

const main = async () => {
  const iconNodesArr = await api.getNodeChildren(
    process.env.FRAME_WITH_ICONS_ID
  );

  iconNodesArr.forEach(async (iconNode) => {
    const url = await api.getSvgImageUrl(iconNode.id);
    const { data: iconcontent } = await api.getIconContent(url);
    fs.writeFileSync(
      path.resolve("./icons", `${iconNode.name}.svg`),
      iconcontent,
      {
        encoding: "utf8",
      }
    );
  });
};

main();
