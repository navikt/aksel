import {
  BackgroundColor,
  Color,
  ContrastColor,
  CssColor,
  Theme,
} from "@adobe/leonardo-contrast-colors";
import {
  ColorTheme,
  GlobalColorRoles,
  GlobalColorScale,
  globalColorScales,
} from "./util";

const background = new BackgroundColor({
  name: "white",
  colorKeys: ["#fff"],
  ratios: [1],
});

export const globalColorConfig: Record<
  GlobalColorRoles,
  { colorKeys: CssColor[]; ratios: number[]; smooth: boolean }
> = {
  /* Core */
  neutral: {
    colorKeys: ["#838c9a"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: false,
  },
  accent: {
    colorKeys: ["#e6f0ff", "#0067c5"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: true,
  },
  /* Status */
  success: {
    colorKeys: ["#2aa758", "#e6ffeb"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: false,
  },
  /**
   * TODO: This is currently just a copy of brandThree
   * - Should info still exist as a global color?
   * - If not, should the semantic colors be generated for info based on brandThree?
   */
  info: {
    colorKeys: ["#005b82", "#e6f1f8", "#00243a"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: true,
  },
  warning: {
    colorKeys: ["#ffbe4d", "#f56e00", "#cc5200"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: true,
  },
  danger: {
    colorKeys: ["#f93448", "#ffb3cd"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: false,
  },
  /* Brand */
  brandOne: {
    colorKeys: ["#99185e", "#7a134b"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: false,
  },
  brandTwo: {
    colorKeys: ["#cc8066", "#fff3ec"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: true,
  },
  brandThree: {
    colorKeys: ["#005b82", "#e6f1f8", "#00243a"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: true,
  },
  /* Data */
  dataOne: {
    colorKeys: ["#8269a2"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: false,
  },
  dataTwo: {
    colorKeys: ["#d9e61e"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
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

const getColorScaleFromLeonardo = (
  role: GlobalColorRoles,
  scale: GlobalColorScale,
  theme: ColorTheme,
): CssColor => {
  /* We have to remove 'ContrastColorBackground' from first position */
  const leonardoTheme = (
    theme === "light" ? leonardoLightTheme : leonardoDarkTheme
  ).slice(1) as ContrastColor[];

  const colorContrastRole = leonardoTheme.find((c) => c.name === role);

  if (!colorContrastRole) {
    throw new Error(`Color ${role} not found in leonardo config`);
  }

  /**
   * @example colorContrastRole format
   * {
   *  name: 'dataTwo',
   *  values: [
   *    { name: 'dataTwo100', contrast: 1.08, value: '#200500' },
   *    { name: 'dataTwo200', contrast: 1.16, value: '#2b0f00' },
   *    ...
   *  ]
   *}
   */
  const color = colorContrastRole.values.find(
    (value) => value.name === `${role}${scale}`,
  );

  if (!color || !color.value) {
    throw new Error(`Color ${role}.${scale} not found in leonardo config`);
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
  theme: ColorTheme,
): Record<GlobalColorScale, GlobalColor> => {
  return globalColorScales.reduce(
    (acc, scale) => {
      acc[scale] = {
        value: getColorScaleFromLeonardo(role, scale, theme),
        type: "global-color",
        group: role,
      };
      return acc;
    },
    {} as Record<GlobalColorScale, GlobalColor>,
  );
};
