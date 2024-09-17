import {
  ColorThemeMode,
  GlobaColorScale,
  GlobalColorVariable,
} from "../../util";

const WarningScaleLight: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "warning",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "warning",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
};

const WarningScaleDark: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "warning",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "warning",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "warning",
  },
};

export default (theme: ColorThemeMode): GlobaColorScale<"warning"> => {
  return {
    warning: theme === "light" ? WarningScaleLight : WarningScaleDark,
  };
};
