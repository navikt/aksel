// https://levelup.gitconnected.com/learn-svg-to-react-using-figma-api-be0a5f9c0ca
// used for reference/implementation

import { colorUrl } from "./config";
import Axios from "axios";
const { create } = Axios;

// Requires user to add a personalized figma token in .env
const headers = {
  "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN,
};

const fetchLocalColors = create({
  baseURL: colorUrl,
  headers,
});

export const getLocalColors = async () => {
  const { data } = await fetchLocalColors.get().catch((e) => {
    throw e;
  });
  return data;
};
