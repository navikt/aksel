import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const DataThreeScaleLight = () => getGlobalScaleForColor("dataThree", "light");
const DataThreeScaleDark = () => getGlobalScaleForColor("dataThree", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"dataThree"> => {
  return {
    dataThree: theme === "light" ? DataThreeScaleLight() : DataThreeScaleDark(),
  };
};
