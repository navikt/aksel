import { ColorTheme, StyleDictionaryTokenConfig } from "../util";

export function semanticTokenConfig(
  theme: ColorTheme,
): StyleDictionaryTokenConfig<"color"> {
  return {
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
            : "rgba(14, 21, 31, 0.50)",
        type: "color",
        group: "background",
      },
      raised: {
        value:
          theme === "light" ? "{a.neutral.000.value}" : "{a.neutral.200.value}",
        type: "color",
        group: "background",
      },
      sunken: {
        value: theme === "light" ? "{a.neutral.200.value}" : "#07090D",
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
        value: "{a.neutral.500.value}",
        type: "color",
        group: "border",
      },
      subtle: {
        value: "{a.neutral.400.value}",
        type: "color",
        group: "border",
      },
      subtleA: {
        value: "{a.neutral.400A.value}",
        type: "color",
        group: "border",
      },
      strong: {
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
        /**
         * Allows token to be used on 'effect' properties in Figma, used for creating focus markings.
         */
        scopes: ["EFFECT_COLOR"],
      },
    },
  };
}
