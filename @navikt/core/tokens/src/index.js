const baseFontSize = 16;
const getFontSize = (size) => `${size / baseFontSize}rem`;

module.exports = {
  navds: {
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
      focus: { value: "0 0 0 3px {navds.semantic.color.focus.@.value}" },
      "focus-on-dark": {
        value: "0 0 0 3px {navds.global.color.orange.400.value}",
      },
      popover: {
        value: "0 2px 4px 0 {navds.global.color.gray.200.value}",
      },
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
