import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const DangerScaleLight = () => getGlobalScaleForColor("danger", "light");
const DangerScaleDark = () => getGlobalScaleForColor("danger", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"danger"> => {
  return {
    danger: theme === "light" ? DangerScaleLight() : DangerScaleDark(),
  };
};
