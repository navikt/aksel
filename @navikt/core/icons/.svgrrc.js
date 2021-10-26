const template = require("./template");

module.exports = {
  typescript: true,
  ref: true,
  icon: true,
  titleProp: true,
  svgProps: {
    focusable: false,
    role: "img",
    tabIndex: -1,
  },
  replaceAttrValues: {
    "#262626": "currentColor",
  },
  template,
};
