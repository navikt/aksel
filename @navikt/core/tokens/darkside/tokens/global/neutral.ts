import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const NeutralScaleLight = () => ({
  "000": {
    value: "white",
    type: "global-color",
    group: "neutral",
  },
  ...getGlobalScaleForColor("neutral", "light"),
});

const NeutralScaleDark = () => ({
  "000": {
    value: "black",
    type: "global-color",
    group: "neutral",
  },
  ...getGlobalScaleForColor("neutral", "dark"),
});

export default (theme: ColorThemeMode): GlobaColorScale<"neutral"> => {
  return {
    neutral: theme === "light" ? NeutralScaleLight() : NeutralScaleDark(),
  };
};
