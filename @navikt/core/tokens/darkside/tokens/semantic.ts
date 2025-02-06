import {
  type BorderColorKeys,
  type ColorTheme,
  type DefaultTextColorKeys,
  type StatefulDefaultBgKeys,
  type StaticDefaultBgKeys,
} from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export function semanticTokenConfig(theme: ColorTheme) {
  return {
    text: {
      default: {
        value: "{ax.neutral.1000.value}",
        type: "color",
        group: "text",
      },
      subtle: {
        value: "{ax.neutral.900.value}",
        type: "color",
        group: "text",
      },
      icon: {
        value: "{ax.neutral.600.value}",
        type: "color",
        group: "text",
      },
      logo: {
        value: theme === "light" ? "#C30000" : "{ax.neutral.1000.value}",
        type: "color",
        group: "text",
      },
      contrast: {
        value: "{ax.neutral.000.value}",
        type: "color",
        group: "text",
      },
    },
    bg: {
      default: {
        value: theme === "light" ? "#ffffff" : "#0E151F",
        type: "color",
        group: "background",
        /**
         * Allows token to be used on 'effect' properties in Figma,
         * Bg-default is used between element and focus-marking.
         */
        scopes: ["EFFECT_COLOR"],
      },
      input: {
        value:
          theme === "light"
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(7, 9, 13, 0.50)",
        type: "color",
        group: "background",
      },
      raised: {
        value:
          theme === "light"
            ? "{ax.neutral.000.value}"
            : "{ax.neutral.100.value}",
        type: "color",
        group: "background",
      },
      sunken: {
        value: theme === "light" ? "{ax.neutral.200.value}" : "#07090D",
        type: "color",
        group: "background",
      },
      overlay: {
        value: "rgba(2, 20, 49 , 0.49)",
        type: "color",
        group: "background",
      },
      soft: {
        value: `{ax.neutral.100.value}`,
        type: "color",
        group: `background`,
      },
      softA: {
        value: `{ax.neutral.100A.value}`,
        type: "color",
        group: `background`,
      },
      "soft-hover": {
        value: `{ax.neutral.200.value}`,
        type: "color",
        group: `background`,
      },
      "soft-hoverA": {
        value: `{ax.neutral.200A.value}`,
        type: "color",
        group: `background`,
      },
      moderate: {
        value: `{ax.neutral.200.value}`,
        type: "color",
        group: `background`,
      },
      moderateA: {
        value: `{ax.neutral.200A.value}`,
        type: "color",
        group: `background`,
      },
      "moderate-hover": {
        value: `{ax.neutral.300.value}`,
        type: "color",
        group: `background`,
      },
      "moderate-hoverA": {
        value: `{ax.neutral.300A.value}`,
        type: "color",
        group: `background`,
      },
      "moderate-pressed": {
        value: `{ax.neutral.400.value}`,
        type: "color",
        group: `background`,
      },
      "moderate-pressedA": {
        value: `{ax.neutral.400A.value}`,
        type: "color",
        group: `background`,
      },
      strong: {
        value: `{ax.neutral.700.value}`,
        type: "color",
        group: `background`,
      },
      "strong-hover": {
        value: `{ax.neutral.800.value}`,
        type: "color",
        group: `background`,
      },
      "strong-pressed": {
        value: `{ax.neutral.900.value}`,
        type: "color",
        group: `background`,
      },
    },
    border: {
      default: {
        value: "{ax.neutral.600.value}",
        type: "color",
        group: "border",
      },
      subtle: {
        value: "{ax.neutral.400.value}",
        type: "color",
        group: "border",
      },
      subtleA: {
        value: "{ax.neutral.400A.value}",
        type: "color",
        group: "border",
      },
      strong: {
        value: "{ax.neutral.700.value}",
        type: "color",
        group: "border",
      },
      /**
       * TODO: Need to verify this value
       * - Discuss with brand
       */
      focus: {
        value: "{ax.neutral.1000.value}",
        type: "color",
        group: "border",
        /**
         * Allows token to be used on 'effect' properties in Figma, used for creating focus markings.
         */
        scopes: ["EFFECT_COLOR"],
      },
    },
  } satisfies {
    bg: Record<
      StaticDefaultBgKeys | StatefulDefaultBgKeys,
      StyleDictionaryToken<"color">
    >;
    border: Record<BorderColorKeys, StyleDictionaryToken<"color">>;
    text: Record<DefaultTextColorKeys, StyleDictionaryToken<"color">>;
  };
}
