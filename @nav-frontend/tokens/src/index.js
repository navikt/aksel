const Color = require("color");

const blue = "#0067c5";
const darkgray = "#3e3832";

const mix = (a, b, percentage) =>
  Color(a)
    .mix(Color(b), percentage / 100)
    .hex();

const darken = (color, percentage) => mix(color, darkgray, percentage);
const lighten = (color, percentage) => mix(color, "white", percentage);

module.exports = {
  navds: {
    color: {
      white: { value: "#ffffff" },
      gray: {
        40: { value: "#b7b1a9" },
      },
      blue: {
        90: { value: darken(blue, 80) },
        80: { value: darken(blue, 60) },
        70: { value: darken(blue, 40) },
        60: { value: darken(blue, 20) },
        50: { value: blue },
        40: { value: lighten(blue, 20) },
        30: { value: lighten(blue, 40) },
        20: { value: lighten(blue, 60) },
        10: { value: lighten(blue, 80) },
      },
      focus: { value: "{navds.color.blue.80.value}" },
      border: {
        default: { value: "{navds.color.gray.40.value}" },
      },
      background: {
        default: { value: "{navds.color.white.value}" },
      },
    },
    border: {
      default: { value: "1px solid {navds.color.border.default.value}" },
    },
    shadow: {
      focus: { value: "0 0 0 3px {navds.color.focus.value}" },
    },
  },
};
