import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const BrandTwoScaleLight = () => getGlobalScaleForColor("brandTwo", "light");
const BrandTwoScaleDark = () => getGlobalScaleForColor("brandTwo", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"brandTwo"> => {
  return {
    brandTwo: theme === "light" ? BrandTwoScaleLight() : BrandTwoScaleDark(),
  };
};
