import { ColorTheme, StyleDictionaryTokenConfig } from "../util";

const NeutralScaleLight = (): StyleDictionaryTokenConfig<"global-color"> => ({
  "000": {
    value: "white",
    type: "global-color",
    group: "neutral",
  },
});

const NeutralScaleDark = (): StyleDictionaryTokenConfig<"global-color"> => ({
  "000": {
    value: "black",
    type: "global-color",
    group: "neutral",
  },
});

export const neutralTokenConfig = (theme: ColorTheme) => {
  return {
    neutral: theme === "light" ? NeutralScaleLight() : NeutralScaleDark(),
  };
};
