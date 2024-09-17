import { ColorThemeMode, GlobaColorScale } from "../../util";
import { getGlobalScaleForColor } from "./leonardo";

const BrandThreeScaleLight = getGlobalScaleForColor("brandThree", "light");
const BrandThreeScaleDark = getGlobalScaleForColor("brandThree", "light");

export default (theme: ColorThemeMode): GlobaColorScale<"brandThree"> => {
  return {
    brandThree: theme === "light" ? BrandThreeScaleLight : BrandThreeScaleDark,
  };
};
