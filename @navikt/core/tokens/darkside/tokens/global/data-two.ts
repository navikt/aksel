import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const DataTwoScaleLight = getGlobalScaleForColor("dataTwo", "light");
const DataTwoScaleDark = getGlobalScaleForColor("dataTwo", "light");

export default (theme: ColorThemeMode): GlobaColorScale<"dataTwo"> => {
  return {
    dataTwo: theme === "light" ? DataTwoScaleLight : DataTwoScaleDark,
  };
};
