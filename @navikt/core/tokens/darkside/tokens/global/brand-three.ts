import {
  ColorThemeMode,
  GlobaColorScale,
  GlobalColorVariable,
} from "../../util";

const BrandThreeScaleLight: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
};

const BrandThreeScaleDark: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "brandThree",
  },
};

export default (theme: ColorThemeMode): GlobaColorScale<"brandThree"> => {
  return {
    brandThree: theme === "light" ? BrandThreeScaleLight : BrandThreeScaleDark,
  };
};
