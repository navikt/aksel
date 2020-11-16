const Color = require("color");

const blue = "#0067c5";
const deepblue = "#005B82";
const red = "#BA3A26";
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
      deepblue: {
        90: { value: darken(deepblue, 80) },
        80: { value: darken(deepblue, 60) },
        70: { value: darken(deepblue, 40) },
        60: { value: darken(deepblue, 20) },
        50: { value: deepblue },
        40: { value: lighten(deepblue, 20) },
        30: { value: lighten(deepblue, 40) },
        20: { value: lighten(deepblue, 60) },
        10: { value: lighten(deepblue, 80) },
      },
      red: {
        90: { value: darken(red, 80) },
        80: { value: darken(red, 60) },
        70: { value: darken(red, 40) },
        60: { value: darken(red, 20) },
        50: { value: red },
        40: { value: lighten(red, 20) },
        30: { value: lighten(red, 40) },
        20: { value: lighten(red, 60) },
        10: { value: lighten(red, 80) },
      },
      border: {
        default: { value: "{navds.color.gray.40.value}" },
      },
      disabled: { value: "{navds.color.gray.40.value}" },
      action: {
        default: { value: "{navds.color.blue.50.value}" },
        hover: { value: lighten(blue, 5) },
        active: { value: "{navds.color.deepblue.50.value}" },
      },
      danger: {
        default: { value: "{navds.color.red.50.value}" },
        hover: { value: lighten(red, 5) },
        active: { value: "{navds.color.red.70.value}" },
      },
      background: {
        default: { value: "{navds.color.white.value}" },
      },
    },
    border: {
      default: { value: "1px solid {navds.color.border.default.value}" },
    },
    shadow: {
      focus: { value: "0 0 0 3px {navds.color.blue.80.value}" },
    },
  },
};
