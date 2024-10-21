import { GlobalColorRoles, StyleDictionaryToken } from "../util";

export const textContrastTokenConfig = (): {
  text: {
    [key in `${GlobalColorRoles}-contrast`]: StyleDictionaryToken<"color">;
  };
} => ({
  text: {
    /* core */
    "accent-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: `text.accent`,
    },
    "neutral-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.neutral",
    },
    /* Status */
    "danger-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.danger",
    },
    "info-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.info",
    },
    "success-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.success",
    },
    "warning-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.warning",
    },
    /* Brand */
    "brandOne-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brandOne",
    },
    "brandTwo-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brandTwo",
    },
    "brandThree-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brandThree",
    },
    /* Data */
    "dataOne-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.dataOne",
    },
    "dataTwo-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.dataTwo",
    },
  },
});
