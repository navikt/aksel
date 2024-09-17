import {
  ColorThemeMode,
  GlobaColorScale,
  GlobalColorVariable,
} from "../../util";

const InfoScaleLight: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "info",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "info",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
};

const InfoScaleDark: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "info",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "info",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "info",
  },
};

export default (theme: ColorThemeMode): GlobaColorScale<"info"> => {
  return {
    info: theme === "light" ? InfoScaleLight : InfoScaleDark,
  };
};
