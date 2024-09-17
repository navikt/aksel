import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const BrandTwoScaleLight = () => getGlobalScaleForColor("brandTwo", "light");
const BrandTwoScaleDark = () => getGlobalScaleForColor("brandTwo", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"brandTwo"> => {
  return {
    brandTwo: theme === "light" ? BrandTwoScaleLight() : BrandTwoScaleDark(),
  };
};
