const colorNpm = require("color");
/* const specifyColors = require("./colors");
const specifySpacing = require("./spacing");

const colors = specifyColors.colors;
const spacing = specifySpacing.sizes; */

const baseFontSize = 16;
const getFontSize = (size) => `${size / baseFontSize}rem`;

const mixColors = (color, step, amount, mixColor) => {
  const saturation = Math.round(colorNpm(color).hsl().color[1]);
  // Setting directly to hex returns different result...
  return colorNpm(
    colorNpm(color)
      .saturate(((step + 1) / 5) * (saturation / 100))
      .mix(colorNpm(mixColor), ((amount / 100) * (step + 1)) / 5)
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

const gray = (n) => colorNpm(lightgray).mix(colorNpm(darkgray), n).hex();

/* const globalColors = Object.entries(colors)
  .filter(([key, _]) => key.startsWith("global"))
  .reduce((colors, [key, value]) => ({ ...colors, [key]: value }), {});

const getColorRef = (color) => {
  for (const c in globalColors) {
    if (colorNpm(globalColors[c]).string() === colorNpm(color).string()) {
      return `{navds.${c.replace("global", "globalColor")}.value}`;
    }
  }
  return color;
}; */

/* TODO: Bruke spacing fra Specify, bruke semantiske farger fra figma i komponenter */
module.exports = {
  navds: {
    /* NEW COLORS */
    /* ...Object.entries(colors).reduce((colors, [name, color]) => {
      const newColor = name.startsWith("global") ? color : getColorRef(color);

      return {
        ...colors,
        [name.replace("global", "globalColor")]: {
          value: newColor,
        },
      };
    }, {}), */
    /* NEW SPACING */
    /* ...Object.entries(spacing).reduce((spacing, [name, size]) => {
      return {
        ...spacing,
        [name]: {
          value: `${Number(size.replace("px", "")) / baseFontSize}rem`,
        },
      };
    }, {}), */
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
    spacing: Array(24)
      .fill(0)
      .reduce(
        (spacing, _, index) => ({
          ...spacing,
          [index + 1]: { value: `${(index + 1) / 4}rem` },
        }),
        {}
      ),
    shadow: {
      focus: { value: "0 0 0 3px" },
    },
    depth: {
      modal: { value: 2000 },
      popover: { value: 1000 },
      focus: { value: 10 },
    },

    font: {
      family: { value: '"Source Sans Pro", Arial, sans-serif' },
      line: {
        height: {
          heading: {
            "2xl": { value: getFontSize(52) },
            xl: { value: getFontSize(40) },
            l: { value: getFontSize(36) },
            m: { value: getFontSize(32) },
            s: { value: getFontSize(28) },
            xs: { value: getFontSize(24) },
          },
          xl: { value: getFontSize(28) },
          l: { value: getFontSize(24) },
          m: { value: getFontSize(20) },
        },
      },
      size: {
        heading: {
          "2xl": { value: getFontSize(40) },
          xl: { value: getFontSize(32) },
          l: { value: getFontSize(28) },
          m: { value: getFontSize(24) },
          s: { value: getFontSize(20) },
        },
        xl: { value: getFontSize(20) },
        l: { value: getFontSize(18) },
        m: { value: getFontSize(16) },
        s: { value: getFontSize(14) },
      },
      weight: {
        bold: { value: "600" },
        regular: { value: "400" },
      },
    },
  },
};
