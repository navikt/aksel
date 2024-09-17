import {
  ColorThemeMode,
  GlobaColorScale,
  GlobalColorVariable,
} from "../../util";

const DataTwoScaleLight: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
};

const DataTwoScaleDark: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataTwo",
  },
};

export default (theme: ColorThemeMode): GlobaColorScale<"dataTwo"> => {
  return {
    dataTwo: theme === "light" ? DataTwoScaleLight : DataTwoScaleDark,
  };
};
