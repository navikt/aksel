import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const SuccessScaleLight = getGlobalScaleForColor("success", "light");
const SuccessScaleDark = getGlobalScaleForColor("success", "light");

export default (theme: ColorThemeMode): GlobaColorScale<"success"> => {
  return {
    success: theme === "light" ? SuccessScaleLight : SuccessScaleDark,
  };
};
