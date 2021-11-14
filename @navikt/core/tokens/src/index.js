const Color = require("color");
const newColors = require("./colors.json");
const newSpacing = require("./spacing.json");

const baseFontSize = 16;

const getFontSize = (size) => `${size / baseFontSize}rem`;
// https://github.com/hihayk/scale/blob/69b766bba2db046d3e8cb4026ae32a32c897f9ff/src/utils.js#L44
const mixColors = (color, step, amount, mixColor) => {
  const saturation = Math.round(Color(color).hsl().color[1]);
  // Setting directly to hex returns different result...
  return Color(
    Color(color)
      .saturate(((step + 1) / 5) * (saturation / 100))
      .mix(Color(mixColor), ((amount / 100) * (step + 1)) / 5)
      .string()
  ).hex();
};

const lightColor = (color, step) => mixColors(color, step, 100, "white");
const darkColor = (color, step) => mixColors(color, step, 85, "black");

const baseColors = {
  blue: "#0067c5",
  deepblue: "#005B82",
  lightblue: "#66CBEC",
  orange: "#FF9100",
  green: "#06893A",
  red: "#BA3A26",
  purple: "#634689",
  limegreen: "#a2ad00",
};

const white = "#ffffff";
const darkgray = "#262626";
const lightgray = "#F1F1F1";

const gray = (n) => Color(lightgray).mix(Color(darkgray), n).hex();

module.exports = {
  navds: {
    ...(newSpacing?.navds ?? {}),
    ...(newColors?.navds ?? {}),
    color: {
      white: { value: white },
      darkgray: { value: darkgray },
      gray: {
        90: { value: gray(1) },
        80: { value: gray(0.8) },
        60: { value: gray(0.6667) },
        40: { value: gray(0.4) },
        20: { value: gray(0.196) },
        10: { value: gray(0) },
      },
      ...Object.entries(baseColors).reduce(
        (colors, [name, color]) => ({
          ...colors,
          [name]: {
            90: { value: darkColor(color, 3) },
            80: { value: darkColor(color, 2) },
            70: { value: darkColor(color, 1) },
            60: { value: darkColor(color, 0) },
            50: { value: color },
            40: { value: lightColor(color, 0) },
            30: { value: lightColor(color, 1) },
            20: { value: lightColor(color, 2) },
            10: { value: lightColor(color, 3) },
          },
        }),
        {}
      ),
    },
    font: {
      family: { value: '"Source Sans Pro", Arial, sans-serif' },
      line: {
        height: {
          heading: {
            "2xlarge": { value: getFontSize(52) },
            xlarge: { value: getFontSize(40) },
            large: { value: getFontSize(36) },
            medium: { value: getFontSize(32) },
            small: { value: getFontSize(28) },
            xsmall: { value: getFontSize(24) },
          },
          xlarge: { value: getFontSize(28) },
          large: { value: getFontSize(24) },
          medium: { value: getFontSize(20) },
        },
      },
      size: {
        heading: {
          "2xlarge": { value: getFontSize(40) },
          xlarge: { value: getFontSize(32) },
          large: { value: getFontSize(28) },
          medium: { value: getFontSize(24) },
          small: { value: getFontSize(20) },
          xsmall: { value: getFontSize(18) },
        },
        xlarge: { value: getFontSize(20) },
        large: { value: getFontSize(18) },
        medium: { value: getFontSize(16) },
        small: { value: getFontSize(14) },
      },
      weight: {
        bold: { value: "600" },
        regular: { value: "400" },
      },
    },
    shadow: {
      focus: { value: "0 0 0 3px {navds.semantic.color.focus.value}" },
      "focus-on-dark": { value: "0 0 0 3px {navds.color.orange.40.value}" },
      card: {
        value:
          "0 1px 3px 0 rgba(38,38,38,0.2),0 2px 1px 0 rgba(38,38,38,0.12),0 1px 1px 0 rgba(38,38,38,0.14)",
      },
    },
    "z-index": {
      modal: { value: 2000 },
      popover: { value: 1000 },
      focus: { value: 10 },
    },
  },
};
