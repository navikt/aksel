import Axios from "axios";
import getFileStyles from "./file-styles";
const { create } = Axios;

const FIGMA_FILE = "m0qpSPpsnNC9DwdmerGqJH";

const FigmaAxion = (token) =>
  create({
    headers: {
      "X-FIGMA-TOKEN": token,
    },
  });

const getSyncDocument = async () => {
  const { data } = await FigmaAxion(process.env.FIGMA_TOKEN)
    .get(`https://api.figma.com/v1/files/${FIGMA_FILE}`)
    .catch((e) => {
      throw e;
    });
  return data;
};

getSyncDocument().then((data) =>
  console.log(JSON.stringify(getFileStyles(data), null, 2))
);
