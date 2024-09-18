import { getGlobalScaleForColor } from "../../leonardo";
import { ColorThemeMode, GlobaColorScale } from "../../util";

const BrandThreeScaleLight = () =>
  getGlobalScaleForColor("brandThree", "light");
const BrandThreeScaleDark = () => getGlobalScaleForColor("brandThree", "dark");

export default (theme: ColorThemeMode): GlobaColorScale<"brandThree"> => {
  return {
    brandThree:
      theme === "light" ? BrandThreeScaleLight() : BrandThreeScaleDark(),
  };
};
