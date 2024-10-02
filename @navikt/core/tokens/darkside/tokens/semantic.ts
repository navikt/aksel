import { ColorTheme, StyleDictionaryTokenConfig } from "../util";

export function semanticTokenConfig(theme: ColorTheme) {
  return theme === "light" ? semanticTokensLight() : semanticTokensDark();
}

function semanticTokensDark(): StyleDictionaryTokenConfig<"color"> {
  const baseline = semanticTokensLight();
  return {
    ...baseline,
    bg: {
      ...baseline.bg,
      default: {
        value: "#141b26",
        type: "color",
        group: "background",
      },
      raised: {
        value: "{a.neutral.200.value}",
        type: "color",
        group: "background",
      },
      sunken: {
        value: "#07090D",
        type: "color",
        group: "background",
      },
    },
  };
}

function semanticTokensLight(): StyleDictionaryTokenConfig<"color"> {
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
        value: "{a.neutral.000.value}",
        type: "color",
        group: "background",
      },
      input: {
        value: "{a.neutral.000.value}",
        type: "color",
        group: "background",
      },
      raised: {
        value: "{a.neutral.000.value}",
        type: "color",
        group: "background",
      },
      sunken: {
        value: "{a.neutral.200.value}",
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
      },
    },
  };
}
