import Axios from "axios";
const { create } = Axios;

const FIGMA_FILE = "A7fbghTh75Hk65SieEhaKK";

const FigmaAxion = (token) =>
  create({
    headers: {
      "X-FIGMA-TOKEN": token,
    },
  });

export const getSyncDocument = async () => {
  const { data } = await FigmaAxion(process.env.FIGMA_TOKEN)
    .get(`https://api.figma.com/v1/files/${FIGMA_FILE}`)
    .catch((e) => {
      throw e;
    });
  return data;
};
