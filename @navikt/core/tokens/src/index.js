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
  ...newColors,
  ...newSpacing,
  navds: {
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
      disabled: { value: "{navds.color.gray.40.value}" },
      action: {
        default: { value: "{navds.color.blue.50.value}" },
        hover: { value: "{navds.color.blue.60.value}" },
        active: { value: "{navds.color.deepblue.50.value}" },
      },
      danger: {
        default: { value: "{navds.color.red.50.value}" },
        hover: { value: "{navds.color.red.60.value}" },
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
      text: {
        primary: { value: "{navds.color.gray.90.value}" },
        inverse: { value: "{navds.color.white.value}" },
        disabled: { value: "{navds.color.gray.60.value}" },
        link: { value: "{navds.color.blue.50.value}" },
        error: { value: "{navds.color.red.50.value}" },
      },
      hover: { value: "{navds.color.gray.40.value}" },
      tag: {
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
      },
      modal: {
        overlay: {
          value: "rgba(38, 38, 38, 0.7)",
        },
      },
    },
    border: {
      default: {
        value: "1px solid {navds.color.border.value}",
      },
      radius: { value: "4px" },
    },
    panel: {
      hover: { value: "1px solid {navds.color.blue.50.value}" },
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
      focus: { value: "0 0 0 3px {navds.color.blue.80.value}" },
      "focus-on-dark": { value: "0 0 0 3px {navds.color.orange.40.value}" },
      hover: { value: "{navds.color.hover.value} 0 2px 1px 0" },
    },
    text: {
      focus: { value: "{navds.color.blue.80.value}" },
      shadow: { value: "0 0 0 2px {navds.color.blue.80.value}" },
    },
    contentContainer: {
      maxWidth: { value: "79.5rem" },
      padding: {
        small: { value: "{navds.spacing.4.value}" },
        mediumAndLarger: { value: "{navds.spacing.6.value}" },
      },
    },
    grid: {
      gutter: {
        small: { value: "{navds.spacing.4.value}" },
        mediumAndLarger: { value: "{navds.spacing.6.value}" },
      },
    },
    layout: {
      background: {
        white: { value: white },
        gray: { value: "{navds.color.gray.10.value}" },
      },
      padding: {
        small: { value: "{navds.spacing.4.value}" },
        mediumAndLarger: { value: "{navds.spacing.10.value}" },
      },
    },
    "z-index": {
      modal: { value: 2000 },
      popover: { value: 1000 },
      focus: { value: 10 },
    },
    sidebar: {
      sticky: {
        offset: { value: "0" },
      },
    },
    spacing: Array(24)
      .fill(0)
      .reduce(
        (spacing, _, index) => ({
          ...spacing,
          [index + 1]: { value: `${(index + 1) / 4}rem` },
        }),
        {}
      ),
    checkmark: {
      image: {
        white: {
          value:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMyAxMCI+ICAgIDxnPiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNCwxMGMtMC40LDAtMC44LTAuMS0xLjEtMC40TDAuNCw3LjFDMC4xLDYuOCwwLDYuNCwwLDZzMC4yLTAuOCwwLjUtMS4xQzEsNC40LDIsNC40LDIuNSw0LjlMNCw2LjRsNi40LTYgICAgQzEwLjgsMC4xLDExLjEsMCwxMS41LDBjMC40LDAsMC44LDAuMiwxLDAuNWMwLjYsMC42LDAuNSwxLjYtMC4xLDIuMXYwTDUsOS42QzQuNyw5LjksNC40LDEwLDQsMTB6IE0xMS44LDEuOUwxMS44LDEuOSAgICBDMTEuOCwxLjksMTEuOCwxLjksMTEuOCwxLjl6IE0xMS4yLDEuMUMxMS4yLDEuMSwxMS4yLDEuMSwxMS4yLDEuMUwxMS4yLDEuMXoiLz4gICAgPC9nPjwvc3ZnPg==)",
        },
        blue: {
          value:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMyAxMCI+ICAgIDxnPiAgICA8cGF0aCBmaWxsPSIjMDA2N0M1IiBkPSJNNCwxMGMtMC40LDAtMC44LTAuMS0xLjEtMC40TDAuNCw3LjFDMC4xLDYuOCwwLDYuNCwwLDZzMC4yLTAuOCwwLjUtMS4xQzEsNC40LDIsNC40LDIuNSw0LjlMNCw2LjRsNi40LTYgICAgQzEwLjgsMC4xLDExLjEsMCwxMS41LDBjMC40LDAsMC44LDAuMiwxLDAuNWMwLjYsMC42LDAuNSwxLjYtMC4xLDIuMXYwTDUsOS42QzQuNyw5LjksNC40LDEwLDQsMTB6IE0xMS44LDEuOUwxMS44LDEuOSAgICBDMTEuOCwxLjksMTEuOCwxLjksMTEuOCwxLjl6IE0xMS4yLDEuMUMxMS4yLDEuMSwxMS4yLDEuMSwxMS4yLDEuMUwxMS4yLDEuMXoiLz4gICAgPC9nPjwvc3ZnPg==)",
        },
      },
    },
  },
};
