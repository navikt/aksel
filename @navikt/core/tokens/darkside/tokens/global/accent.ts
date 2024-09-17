import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const AccentScaleLight = () => getGlobalScaleForColor("accent", "light");
const AccentScaleDark = () => getGlobalScaleForColor("accent", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"accent"> => {
  return {
    accent: theme === "light" ? AccentScaleLight() : AccentScaleDark(),
  };
};
