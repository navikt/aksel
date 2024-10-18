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
      group: `text.accent`,
    },
    "neutral-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.neutral",
    },
    /* Status */
    "danger-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.danger",
    },
    "info-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.info",
    },
    "success-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.success",
    },
    "warning-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.warning",
    },
    /* Brand */
    "brandOne-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.brandOne",
    },
    "brandTwo-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.brandTwo",
    },
    "brandThree-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.brandThree",
    },
    /* Data */
    "dataOne-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.dataOne",
    },
    "dataTwo-contrast": {
      value: "{a.neutral.000.value}",
      type: "color",
      group: "text.dataTwo",
    },
  },
});
