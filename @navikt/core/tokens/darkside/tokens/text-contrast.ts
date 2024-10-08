import { GlobalColorRoles, StyleDictionaryToken } from "../util";

export const textContrastTokenConfig = (): {
  text: {
    [key in `${GlobalColorRoles}-contrast`]: StyleDictionaryToken<"color">;
  };
} => ({
  text: {
    /* core */
    "accent-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    "neutral-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    /* Status */
    "danger-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    "info-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    "success-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    "warning-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    /* Brand */
    "brandOne-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    "brandTwo-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    "brandThree-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    /* Data */
    "dataOne-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
    "dataTwo-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text",
    },
  },
});
