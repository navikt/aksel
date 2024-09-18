import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const DangerScaleLight = () => getGlobalScaleForColor("danger", "light");
const DangerScaleDark = () => getGlobalScaleForColor("danger", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"danger"> => {
  return {
    danger: theme === "light" ? DangerScaleLight() : DangerScaleDark(),
  };
};
