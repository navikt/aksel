import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const DataOneScaleLight = () => getGlobalScaleForColor("dataOne", "light");
const DataOneScaleDark = () => getGlobalScaleForColor("dataOne", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"dataOne"> => {
  return {
    dataOne: theme === "light" ? DataOneScaleLight() : DataOneScaleDark(),
  };
};
