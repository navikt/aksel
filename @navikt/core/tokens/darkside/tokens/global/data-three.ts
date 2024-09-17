import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const DataThreeScaleLight = getGlobalScaleForColor("dataThree", "light");
const DataThreeScaleDark = getGlobalScaleForColor("dataThree", "light");

export default (theme: ColorThemeMode): GlobaColorScale<"dataThree"> => {
  return {
    dataThree: theme === "light" ? DataThreeScaleLight : DataThreeScaleDark,
  };
};
