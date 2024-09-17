import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const AccentScaleLight = getGlobalScaleForColor("accent", "light");
const AccentScaleDark = getGlobalScaleForColor("accent", "light");

export default (theme: ColorThemeMode): GlobaColorScale<"accent"> => {
  return {
    accent: theme === "light" ? AccentScaleLight : AccentScaleDark,
  };
};
