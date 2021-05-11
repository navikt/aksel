const Color = require("color");

const baseFontSize = 16;

const getFontSize = (size) => `${size / baseFontSize}rem`;

const baseColors = {
  blue: "#0067c5",
  deepblue: "#005B82",
  lightblue: "#66CBEC",
  orange: "#FF9100",
  green: "#06893A",
  red: "#BA3A26",
};
const white = "#ffffff";
const darkgray = "#3e3832";

const mix = (a, b, percentage) =>
  Color(a)
    .mix(Color(b), percentage / 100)
    .hex();

const darken = (color, percentage) => mix(color, darkgray, percentage);
const lighten = (color, percentage) => mix(color, white, percentage);

module.exports = {
  navds: {
    color: {
      white: { value: white },
      darkgray: { value: darkgray },
      gray: {
        90: { value: "#262626" },
        80: { value: "#4F4F4F" },
        60: { value: "#6A6A6A" },
        40: { value: "#A0A0A0" },
        20: { value: "#C9C9C9" },
        10: { value: "#F1F1F1" },
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
        primary: { value: "{navds.color.gray.90}" },
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
          value: "rgba(61, 56, 49, 0.7)",
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
          large: { value: "1.625rem" },
          medium: { value: "1.5rem" },
          small: { value: "1.375rem" },
          /* xs: { value: "1.25rem" }, */
          /** new */
          "2xl": { value: getFontSize(52) },
          xl: { value: getFontSize(40) },
          l: { value: getFontSize(36) },
          m: { value: getFontSize(32) },
          s: { value: getFontSize(28) },
          xs: { value: getFontSize(24) },
          "2xs": { value: getFontSize(20) },
        },
      },
      size: {
        title: {
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

        heading: {
          "2xl": { value: "2.5rem" },
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
      spacing: {
        "3xl": { value: getFontSize(40) },
        "2xl": { value: getFontSize(36) },
        xl: { value: getFontSize(32) },
        l: { value: getFontSize(28) },
        m: { value: getFontSize(24) },
        s: { value: getFontSize(20) },
        xs: { value: getFontSize(16) },
        "2xs": { value: getFontSize(12) },
        "3xs": { value: getFontSize(8) },
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
        white: { value: "#FFFFFF" },
        gray: { value: "#F1F1F1" },
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
