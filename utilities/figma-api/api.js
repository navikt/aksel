const api = require("axios");

const headers = {
  "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN,
};
/**
 * api endpoint for files
 */
const instanceFiles = api.create({
  baseURL: `https://api.figma.com/v1/files/${process.env.FILE_KEY}`,
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
 * get Figma node children
 */
const getNodeChildren = async (nodeId) => {
  const {
    data: { nodes },
  } = await instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`);
  return nodes[nodeId].document.children;
};
/**
 * get svg image resource url
 */
const getSvgImageUrl = async (nodeId) => {
  const {
    data: { images },
  } = await instanceImages.get(
    `/?ids=${decodeURIComponent(nodeId)}&format=svg`
  );
  return images[nodeId];
};

const getIconContent = async (url) => api.get(url);

module.exports = {
  getNodeChildren,
  getSvgImageUrl,
  getIconContent,
};
