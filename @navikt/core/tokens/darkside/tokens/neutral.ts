import { ColorTheme } from "../util";

const NeutralScaleLight = () => ({
  "000": {
    value: "white",
    type: "global-color",
    group: "neutral",
  },
});

const NeutralScaleDark = () => ({
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