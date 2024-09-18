import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const DataTwoScaleLight = () => getGlobalScaleForColor("dataTwo", "light");
const DataTwoScaleDark = () => getGlobalScaleForColor("dataTwo", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"dataTwo"> => {
  return {
    dataTwo: theme === "light" ? DataTwoScaleLight() : DataTwoScaleDark(),
  };
};
