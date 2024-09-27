import { ColorTheme, StyleDictionaryTokenConfig } from "../util";

const NeutralScaleLight = {
  neutral: {
    "000": {
      value: "white",
      type: "global-color",
      group: "neutral",
    },
  },
} as const;

const NeutralScaleDark = {
  neutral: {
    "000": {
      value: "black",
      type: "global-color",
      group: "neutral",
    },
  },
} as const;

export const neutralTokenConfig = (
  theme: ColorTheme,
): StyleDictionaryTokenConfig<"global-color"> => {
  return theme === "light" ? NeutralScaleLight : NeutralScaleDark;
};
