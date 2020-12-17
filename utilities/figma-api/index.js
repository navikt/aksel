require("dotenv").config();
const api = require("./api");

const main = async () => {
  const iconNodesArr = await api.getNodeChildren(
    process.env.FRAME_WITH_ICONS_ID
  );
  console.log(iconNodesArr);
  iconNodesArr.forEach(async (iconNode) => {
    await console.log(await api.getSvgImageUrl(iconNode.id));
  });
};

main();
