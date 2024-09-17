import {
  ColorThemeMode,
  GlobaColorScale,
  GlobalColorVariable,
} from "../../util";

const DataOneScaleLight: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
};

const DataOneScaleDark: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "dataOne",
  },
};

export default (theme: ColorThemeMode): GlobaColorScale<"dataOne"> => {
  return {
    dataOne: theme === "light" ? DataOneScaleLight : DataOneScaleDark,
  };
};
