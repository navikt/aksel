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
    "brand-magenta-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-magenta",
    },
    "brand-beige-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-beige",
    },
    "brand-blue-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.brand-blue",
    },
    /* Meta  */
    "meta-purple-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.meta-purple",
    },
    "meta-lime-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.meta-lime",
    },
  },
} satisfies {
  text: Record<`${SemanticColorRoles}-contrast`, StyleDictionaryToken<"color">>;
};
