import {
  BackgroundColor,
  Color,
  ContrastColor,
  ContrastColorValue,
  CssColor,
  Theme,
} from "@adobe/leonardo-contrast-colors";
import {
  ColorThemeMode,
  GlobalColorRoles,
  GlobalColorScale,
  globalColorScales,
} from "../../util";

const background = new BackgroundColor({
  name: "white",
  colorKeys: ["#fff"],
  ratios: [1],
});

const globalColorConfig: Record<
  GlobalColorRoles,
  { colorKeys: CssColor[]; ratios: number[]; smooth: boolean }
> = {
  /* Core */
  neutral: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  accent: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  /* Status */
  success: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  info: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  warning: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  danger: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  /* Brand */
  brandOne: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  brandTwo: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  brandThree: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  /* Data */
  dataOne: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  dataTwo: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
  dataThree: {
    colorKeys: [],
    ratios: [],
    smooth: false,
  },
};

// Convert globalColorConfig to Color instances
const colorInstances = Object.entries(globalColorConfig).map(
  ([role, config]) =>
    new Color({
      name: role,
      colorKeys: config.colorKeys,
      ratios: config.ratios,
      colorspace: "OKLCH",
      smooth: config.smooth,
    }),
);

const leonardoLightTheme = new Theme({
  colors: colorInstances,
  backgroundColor: background,
  lightness: 100,
  contrast: 1,
  saturation: 100,
  output: "HEX",
  formula: "wcag2",
}).contrastColors;

const leonardoDarkTheme = new Theme({
  colors: colorInstances,
  backgroundColor: background,
  lightness: 0,
  contrast: 1,
  saturation: 100,
  output: "HEX",
  formula: "wcag2",
}).contrastColors;

const getGlobalColor = (
  role: GlobalColorRoles,
  name: GlobalColorScale,
  theme: ColorThemeMode,
): CssColor => {
  const leonardoTheme =
    theme === "light" ? leonardoLightTheme : leonardoDarkTheme;

  const color: ContrastColorValue = leonardoTheme[role].find(
    (x: ContrastColor) => x.name === name,
  );

  if (!color || !color.value) {
    throw new Error(`Color ${role}.${name} not found in leonardo config`);
  }
  return color.value;
};

type GlobalColor = {
  value: string;
  type: "global-color";
  group: GlobalColorRoles;
};

export const getGlobalScaleForColor = (
  role: GlobalColorRoles,
  theme: ColorThemeMode,
): Record<GlobalColorScale, GlobalColor> => {
  return globalColorScales.reduce(
    (acc, scale) => {
      acc[scale] = {
        value: getGlobalColor(role, scale, theme),
        type: "global-color",
        group: role,
      };
      return acc;
    },
    {} as Record<GlobalColorScale, GlobalColor>,
  );
};
