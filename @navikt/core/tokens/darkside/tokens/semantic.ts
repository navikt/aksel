import { StyleDictionaryTokenConfig } from "../util";

export const semanticTokenConfig = (): StyleDictionaryTokenConfig<"color"> => ({
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
    default: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "background",
    },
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
    overlay: {
      /* TODO: Update alpha here, consier not having the token itself? */
      value: "rgb(2 20 49 / 0.49)",
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
      value: "{a.neutral.400.value}",
      type: "color",
      group: "border",
    },
    strong: {
      /* TODO: Consider 700 scale here? */
      value: "{a.neutral.600.value}",
      type: "color",
      group: "border",
    },
    /**
     * TODO: Need to verify this value
     * - Discuss with brand
     */
    focus: {
      value: "{a.accent.700.value}",
      type: "color",
      group: "border",
    },
  },
});
