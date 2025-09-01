const template = require("./config/template");

module.exports = {
  typescript: true,
  ref: true,
  icon: true,
  titleProp: true,
  jsxRuntime: "automatic",
  svgProps: {
    focusable: false,
    role: "img",
  },
  replaceAttrValues: {
    "#202733": "currentColor",
  },
  template,
};
