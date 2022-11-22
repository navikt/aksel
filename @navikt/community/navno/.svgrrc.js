const template = require("./template");

module.exports = {
  typescript: true,
  ref: true,
  icon: false,
  titleProp: false,
  svgProps: {
    focusable: false,
    role: "img",
  },
  /* replaceAttrValues: {
    "#262626": "currentColor",
  }, */
  template,
};
