const baseFontSize = 16;
const getFontSize = (size) => `${size / baseFontSize}rem`;

module.exports = {
  a: {
    breakpoint: {
      xs: { value: "0" },
      sm: { value: "480px" },
      "sm-down": { value: "479px" },
      md: { value: "768px" },
      "md-down": { value: "767px" },
      lg: { value: "1024px" },
      "lg-down": { value: "1023px" },
      xl: { value: "1280px" },
      "xl-down": { value: "1279px" },
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
    "z-index": {
      modal: { value: 2000 },
      popover: { value: 1000 },
      focus: { value: 10 },
      tooltip: { value: 3000 },
    },
  },
};
