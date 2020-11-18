const Color = require("color");

const baseColors = {
  blue: "#0067c5",
  deepblue: "#005B82",
  lightblue: "#66CBEC",
  orange: "#FF9100",
  green: "#06893A",
  red: "#BA3A26",
  darkgray: "#3e3832",
};

const mix = (a, b, percentage) =>
  Color(a)
    .mix(Color(b), percentage / 100)
    .hex();

const darken = (color, percentage) =>
  mix(color, baseColors.darkgray, percentage);
const lighten = (color, percentage) => mix(color, "white", percentage);

module.exports = {
  navds: {
    color: {
      white: { value: "#ffffff" },
      gray: {
        40: { value: "#b7b1a9" },
      },
      ...Object.entries(baseColors).reduce(
        (colors, [name, color]) => ({
          ...colors,
          [name]: {
            90: { value: darken(color, 80) },
            80: { value: darken(color, 60) },
            70: { value: darken(color, 40) },
            60: { value: darken(color, 20) },
            50: { value: color },
            40: { value: lighten(color, 20) },
            30: { value: lighten(color, 40) },
            20: { value: lighten(color, 60) },
            10: { value: lighten(color, 80) },
          },
        }),
        {}
      ),
      disabled: { value: "{navds.color.gray.40.value}" },
      action: {
        value: "{navds.color.blue.50.value}",
        hover: { value: lighten(baseColors.blue, 5) },
        active: { value: "{navds.color.deepblue.50.value}" },
      },
      danger: {
        value: "{navds.color.red.50.value}",
        hover: { value: lighten(baseColors.red, 5) },
        active: { value: "{navds.color.red.70.value}" },
      },
      error: {
        border: { value: "{navds.color.red.50.value}" },
        background: { value: "{navds.color.red.10.value}" },
      },
      warning: {
        border: { value: "{navds.color.orange.60.value}" },
        background: { value: "{navds.color.orange.10.value}" },
      },
      info: {
        border: { value: "{navds.color.lightblue.70.value}" },
        background: { value: "{navds.color.lightblue.10.value}" },
      },
      success: {
        border: { value: "{navds.color.green.50.value}" },
        background: { value: "{navds.color.green.10.value}" },
      },
      border: { value: "{navds.color.gray.40.value}" },
      background: { value: "{navds.color.white.value}" },
    },
    border: { value: "1px solid {navds.color.border.value}" },
    shadow: {
      focus: { value: "0 0 0 3px {navds.color.blue.80.value}" },
    },
  },
};
