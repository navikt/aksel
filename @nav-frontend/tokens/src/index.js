module.exports = {
  color: {
    gray: {
      40: { value: "#b7b1a9" },
    },
    border: {
      default: { value: "{color.gray.40.value}" },
    },
  },
  border: {
    default: { value: "1px solid {color.border.default.value}" },
  },
};
