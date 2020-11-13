module.exports = {
  color: {
    white: { value: "#ffffff" },
    gray: {
      40: { value: "#b7b1a9" },
    },
    fokusFarge: { value: "#254B6D" },
    border: {
      default: { value: "{color.gray.40.value}" },
    },
    background: {
      default: { value: "{color.white.value}" },
    },
  },
  border: {
    default: { value: "1px solid {color.border.default.value}" },
  },
};
