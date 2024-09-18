import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const AccentScaleLight = () => getGlobalScaleForColor("accent", "light");
const AccentScaleDark = () => getGlobalScaleForColor("accent", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"accent"> => {
  return {
    accent: theme === "light" ? AccentScaleLight() : AccentScaleDark(),
  };
};
