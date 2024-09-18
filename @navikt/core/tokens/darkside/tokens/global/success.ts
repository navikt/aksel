import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const SuccessScaleLight = () => getGlobalScaleForColor("success", "light");
const SuccessScaleDark = () => getGlobalScaleForColor("success", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"success"> => {
  return {
    success: theme === "light" ? SuccessScaleLight() : SuccessScaleDark(),
  };
};
