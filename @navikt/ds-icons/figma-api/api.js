// https://levelup.gitconnected.com/learn-svg-to-react-using-figma-api-be0a5f9c0ca
// used for reference/implementation

const api = require("axios");

// Requires user to add a personalized figma token in .env
const headers = {
  "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN,
};
/**
 * Api connection for icon components
 * https://www.figma.com/file/UmEVH3pZ71uJPsSz9ilP3Y/NAV-ikoner-2.1-Figma-i-test?node-id=0%3A1
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
  return Object.values(images);
};

/**
 * Gets raw svg data from url
 */
const getIconContent = async (url) => api.get(url);

module.exports = {
  getNodeChildren,
  getSvgImageUrls,
  getIconContent,
};
