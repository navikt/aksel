import {
  ColorThemeMode,
  GlobaColorScale,
  GlobalColorVariable,
  GlobalColorVariableWith000,
} from "../../util";

const NeutralScaleLight: GlobalColorVariableWith000 = {
  "000": {
    value: "white",
    type: "global-color",
    group: "neutral",
  },
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "neutral",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "neutral",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "1000": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
};

const NeutralScaleDark: GlobalColorVariable = {
  "100": {
    value: "rgba(204, 225, 255, 1)",
    type: "global-color",
    group: "neutral",
  },
  "200": {
    value: "rgba(153, 195, 255, 1)",
    type: "global-color",
    group: "neutral",
  },
  "300": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "400": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "500": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "600": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "700": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "800": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "900": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
  "1000": {
    value: "rgba(102, 165, 244, 1)",
    type: "global-color",
    group: "neutral",
  },
};

export default (theme: ColorThemeMode): GlobaColorScale<"neutral"> => {
  return {
    neutral: theme === "light" ? NeutralScaleLight : NeutralScaleDark,
  };
};
