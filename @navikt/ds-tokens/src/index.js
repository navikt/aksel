const Color = require("color");
const colorNpm = require("color");
const specifyColors = require("./colors");

const baseFontSize = 16;
const colors = specifyColors.colors;

const getFontSize = (size) => `${size / baseFontSize}rem`;

const globalColors = Object.entries(colors)
  .filter(([key, _]) => key.startsWith("global"))
  .reduce((colors, [key, value]) => ({ ...colors, [key]: value }), {});

const getColorRef = (color) => {
  for (const c in globalColors) {
    if (colorNpm(globalColors[c]).string() === colorNpm(color).string()) {
      console.log(`{navds.${c.replace("global", "globalColor")}.value}`);
      return `{navds.${c.replace("global", "globalColor")}.value}`;
    }
  }
  return color;
};

/* TODO: Bruke spacing fra Specify, bruke semantiske farger fra figma i komponenter */
module.exports = {
  navds: {
    /* NEW COLORS */
    ...Object.entries(colors).reduce((colors, [name, color]) => {
      const newColor = name.startsWith("global") ? color : getColorRef(color);

      return {
        ...colors,
        [name.replace("global", "globalColor")]: {
          value: newColor,
        },
      };
    }, {}),
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
          m: { value: 1.5 },
          s: { value: 1.3 },
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
