import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const BrandOneScaleLight = () => getGlobalScaleForColor("brandOne", "light");
const BrandOneScaleDark = () => getGlobalScaleForColor("brandOne", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"brandOne"> => {
  return {
    brandOne: theme === "light" ? BrandOneScaleLight() : BrandOneScaleDark(),
  };
};
