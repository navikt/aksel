import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const InfoScaleLight = () => getGlobalScaleForColor("info", "light");
const InfoScaleDark = () => getGlobalScaleForColor("info", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"info"> => {
  return {
    info: theme === "light" ? InfoScaleLight() : InfoScaleDark(),
  };
};
