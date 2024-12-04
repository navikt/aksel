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
    "brand-one-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-one",
    },
    "brand-two-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-two",
    },
    "brand-three-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-three",
    },
    /* Data */
    "data-one-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.data-one",
    },
    "data-two-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.data-two",
    },
  },
});
