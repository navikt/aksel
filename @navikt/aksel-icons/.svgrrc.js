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
    "#202733": "currentColor",
  },
  template,
};
