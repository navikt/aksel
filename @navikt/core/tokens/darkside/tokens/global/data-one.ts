import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const DataOneScaleLight = getGlobalScaleForColor("dataOne", "light");
const DataOneScaleDark = getGlobalScaleForColor("dataOne", "light");

export default (theme: ColorThemeMode): GlobaColorScale<"dataOne"> => {
  return {
    dataOne: theme === "light" ? DataOneScaleLight : DataOneScaleDark,
  };
};
