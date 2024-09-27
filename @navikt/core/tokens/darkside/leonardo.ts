import { ContrastColor, CssColor } from "@adobe/leonardo-contrast-colors";
import { globalDarkThemeConfig } from "./tokens/global-dark";
import { globalLightThemeConfig } from "./tokens/global-light";
import {
  ColorTheme,
  GlobalColorRoles,
  GlobalColorScale,
  GlobalColorVariable,
  globalColorRoles,
  globalColorScales,
} from "./util";

const getColorScaleFromLeonardo = (
  role: GlobalColorRoles,
  scale: GlobalColorScale,
  theme: ColorTheme,
): CssColor => {
  /* We have to remove 'ContrastColorBackground' from first position */
  const leonardoTheme = (
    theme === "light" ? globalLightThemeConfig : globalDarkThemeConfig
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

export const globalScale = (
  theme: ColorTheme,
): Record<string, GlobalColorVariable> => {
  return globalColorRoles.reduce(
    (acc, role) => {
      acc[role] = getGlobalScaleForColor(role, theme);
      return acc;
    },
    {} as Record<string, GlobalColorVariable>,
  );
};
