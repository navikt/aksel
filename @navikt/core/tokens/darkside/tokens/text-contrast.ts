import { type SemanticColorRoles } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export const textContrastTokenConfig = {
  text: {
    /* core */
    "neutral-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: `text.accent`,
    },
    "accent-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: `text.accent`,
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
    "brand-1-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-1",
    },
    "brand-2-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-2",
    },
    "brand-3-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-3",
    },
    /* Meta  */
    "meta-1-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.meta-1",
    },
    "meta-2-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.meta-2",
    },
  },
} satisfies {
  text: Record<`${SemanticColorRoles}-contrast`, StyleDictionaryToken<"color">>;
};
