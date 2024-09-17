import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const BrandOneScaleLight = getGlobalScaleForColor("brandOne", "light");
const BrandOneScaleDark = getGlobalScaleForColor("brandOne", "light");

export default (theme: ColorThemeMode): GlobaColorScale<"brandOne"> => {
  return {
    brandOne: theme === "light" ? BrandOneScaleLight : BrandOneScaleDark,
  };
};
