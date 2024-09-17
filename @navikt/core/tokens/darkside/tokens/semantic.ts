export const semanticTokenConfig = () => ({
  text: {
    default: {
      value: "{a.neutral.1000.value}",
      type: "color",
      group: "text",
    },
    subtle: {
      value: "{a.neutral.900.value}",
      type: "color",
      group: "text",
    },
    icon: {
      value: "{a.neutral.600.value}",
      type: "color",
      group: "text",
    },
  },
  bg: {
    input: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "background",
    },
    raised: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "background",
    },
    sunken: {
      value: "{a.neutral.200.value}",
      type: "color",
      group: "background",
    },
    /* TODO: Custom alpha here? */
    overlay: {
      value: "{a.neutral.100.value}",
      type: "color",
      group: "background",
    },
  },
  border: {
    default: {
      value: "{a.neutral.500.value}",
      type: "color",
      group: "border",
    },
    subtle: {
      value: "{a.neutral.500.value}",
      type: "color",
      group: "border",
    },
    strong: {
      value: "{a.neutral.600.value}",
      type: "color",
      group: "border",
    },
    /* TODO: Need to verify this value  */
    focus: {
      value: "{a.accent.700.value}",
      type: "color",
      group: "border",
    },
  },
});
