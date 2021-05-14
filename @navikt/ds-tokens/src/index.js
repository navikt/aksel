const Color = require("color");

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

const lighten = (color, percentage) =>
  Color(color)
    .mix(Color("white"), percentage / 100)
    .hex();

module.exports = {
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
        hover: { value: lighten(baseColors.blue, 5) },
        active: { value: "{navds.color.deepblue.50.value}" },
      },
      danger: {
        default: { value: "{navds.color.red.50.value}" },
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
      text: {
        primary: { value: "{navds.color.darkgray.value}" },
        inverse: { value: "{navds.color.white.value}" },
        disabled: { value: "{navds.color.gray.60.value}" },
        link: { value: "{navds.color.blue.50.value}" },
        error: { value: "{navds.color.red.50.value}" },
      },
      hover: { value: "{navds.color.gray.40.value}" },
      tag: {
        error: {
          border: { value: "{navds.color.red.50.value}" },
          background: { value: "{navds.color.red.20.value}" },
        },
        warning: {
          border: { value: "{navds.color.orange.60.value}" },
          background: { value: "{navds.color.orange.20.value}" },
        },
        info: {
          border: { value: "{navds.color.lightblue.70.value}" },
          background: { value: "{navds.color.lightblue.20.value}" },
        },
        success: {
          border: { value: "{navds.color.green.50.value}" },
          background: { value: "{navds.color.green.20.value}" },
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
      size: {
        heading: {
          xxl: { value: "2.5rem" },
          xl: { value: "2rem" },
          large: { value: "1.5rem" },
          medium: { value: "1.25rem" },
          small: { value: "1.125rem" },
        },
        large: { value: "1.25rem" },
        medium: { value: "1.125rem" },
        small: { value: "1rem" },
        xs: { value: "0.875rem" },
        article: {
          lead: { value: "1.25rem" },
          paragraph: { value: "1.125rem" },
        },
      },
      weight: {
        bold: { value: "600" },
        regular: { value: "400" },
      },
      line: {
        height: {
          large: { value: "1.625rem" },
          medium: { value: "1.5rem" },
          small: { value: "1.375rem" },
          xs: { value: "1.25rem" },
        },
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
        small: { value: "1rem" },
        mediumAndLarger: { value: "1.5rem" },
      },
    },
    grid: {
      gutter: {
        small: { value: "1rem" },
        mediumAndLarger: { value: "1.5rem" },
      },
    },
    layout: {
      background: {
        white: { value: white },
        gray: { value: "{navds.color.gray.10.value}" },
      },
      padding: {
        small: { value: "1rem" },
        mediumAndLarger: { value: "2.5rem" },
      },
    },
    z: {
      index: {
        modal: {
          content: { value: "1010" },
          overlay: { value: "1000" },
        },
        popover: {
          default: { value: "2000" },
          arrow: { value: "-1" },
        },
      },
    },
    sidebar: {
      sticky: {
        offset: { value: "0" },
      },
    },
  },
};
