const template = require("./config/template");

module.exports = {
  typescript: true,
  ref: true,
  icon: true,
  titleProp: true,
  svgProps: {
    focusable: false,
    role: "img",
  },
  replaceAttrValues: {
    "#23262A": "currentColor",
  },
  template,
};
