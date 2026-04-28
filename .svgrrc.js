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
    /* TODO: Replace this based on default icon stroke/fill color */
    "#202733": "currentColor",
  },
  template,
};
