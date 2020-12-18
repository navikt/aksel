const api = require("axios");

const headers = {
  "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN,
};
/**
 * api endpoint for files
 */
const instanceFiles = api.create({
  baseURL: `https://api.figma.com/v1/files/${process.env.FILE_KEY}/components`,
  headers,
});
/**
 * api endpoint for images
 */
const instanceImages = api.create({
  baseURL: `https://api.figma.com/v1/images/${process.env.FILE_KEY}`,
  headers,
});

/**
 * get Figma node components children
 */
const getNodeChildren = async () => {
  const { data } = await instanceFiles.get();
  return data.meta.components;
};
/**
 * get svg image resource urls
 */
const getSvgImageUrls = async (nodeIds) => {
  const {
    data: { images },
  } = await instanceImages.get(`/?ids=${nodeIds}&format=svg`);
  return Object.keys(images).map((key) => images[key]);
};

const getIconContent = async (url) => api.get(url);

module.exports = {
  getNodeChildren,
  getSvgImageUrls,
  getIconContent,
};
