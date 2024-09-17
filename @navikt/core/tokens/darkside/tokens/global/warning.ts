import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const WarningScaleLight = () => getGlobalScaleForColor("warning", "light");
const WarningScaleDark = () => getGlobalScaleForColor("warning", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"warning"> => {
  return {
    warning: theme === "light" ? WarningScaleLight() : WarningScaleDark(),
  };
};
