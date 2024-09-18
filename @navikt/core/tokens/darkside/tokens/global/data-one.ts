import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const DataOneScaleLight = () => getGlobalScaleForColor("dataOne", "light");
const DataOneScaleDark = () => getGlobalScaleForColor("dataOne", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"dataOne"> => {
  return {
    dataOne: theme === "light" ? DataOneScaleLight() : DataOneScaleDark(),
  };
};
