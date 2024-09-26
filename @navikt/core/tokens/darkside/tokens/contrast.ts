import { GlobalColorRoles, StyleDictionaryToken } from "../util";

export const contrastTokenConfig = (): {
  contrast: {
    [key in GlobalColorRoles]: StyleDictionaryToken<"color">;
  };
} => ({
  contrast: {
    /* core */
    accent: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    neutral: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    /* Status */
    danger: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    info: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    success: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    warning: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    /* Brand */
    brandOne: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    brandTwo: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    brandThree: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    /* Data */
    dataOne: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
    dataTwo: {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "contrast",
    },
  },
});
