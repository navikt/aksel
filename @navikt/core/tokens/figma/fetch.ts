import Axios from "axios";
const { create } = Axios;
const dotenv = require("dotenv");
dotenv.config();

const FIGMA_FILE = "m0qpSPpsnNC9DwdmerGqJH";

const FigmaAxion = (token) =>
  create({
    headers: {
      "X-FIGMA-TOKEN": token,
    },
  });

export const fetchFile = async () => {
  const { data } = await FigmaAxion(process.env.FIGMA_TOKEN)
    .get(`https://api.figma.com/v1/files/${FIGMA_FILE}`)
    .catch((e) => {
      throw e;
    });
  return data;
};

export const fetchFileStyles = async () => {
  const {
    data: {
      meta: { styles },
    },
  } = await FigmaAxion(process.env.FIGMA_TOKEN)
    .get(`https://api.figma.com/v1/files/${FIGMA_FILE}/styles`)
    .catch((e) => {
      throw e;
    });
  return styles;
};

export const fetchSyncDocument = async () => {
  const {
    data: { document },
  } = await FigmaAxion(process.env.FIGMA_TOKEN)
    .get(`https://api.figma.com/v1/files/A7fbghTh75Hk65SieEhaKK`)
    .catch((e) => {
      throw e;
    });
  return document;
};
