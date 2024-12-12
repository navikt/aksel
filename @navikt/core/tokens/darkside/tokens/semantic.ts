import { ColorTheme, StyleDictionaryTokenConfig } from "../util";

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
            : "{ax.neutral.200.value}",
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
    },
    border: {
      default: {
        value: "{ax.neutral.500.value}",
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
        value: "{ax.neutral.600.value}",
        type: "color",
        group: "border",
      },
      /**
       * TODO: Need to verify this value
       * - Discuss with brand
       */
      focus: {
        value: "{ax.accent.700.value}",
        type: "color",
        group: "border",
        /**
         * Allows token to be used on 'effect' properties in Figma, used for creating focus markings.
         */
        scopes: ["EFFECT_COLOR"],
      },
    },
  } satisfies StyleDictionaryTokenConfig<"color">;
}
