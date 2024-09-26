import { BackgroundColor, Color, Theme } from "@adobe/leonardo-contrast-colors";
import { GlobalColorConfig } from "../util";

const config: GlobalColorConfig = {
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
    colorKeys: ["#e6ffeb", "#2aa758"],
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
    smooth: false,
  },
  danger: {
    colorKeys: ["#ffb3cd", "#f93448"],
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
    colorKeys: ["#fff3ec", "#cc8066"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: false,
  },
  brandThree: {
    colorKeys: ["#e6f1f8", "#005b82", "#00243a"],
    ratios: [1.08, 1.16, 1.28, 1.5, 3.5, 4.5, 5.85, 6.6, 8, 15],
    smooth: false,
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

const colors = Object.entries(config).map(
  ([role, color]) =>
    new Color({
      name: role,
      colorKeys: color.colorKeys,
      ratios: color.ratios,
      colorspace: "OKLCH",
      smooth: color.smooth,
    }),
);

const background = new BackgroundColor({
  name: "neutral",
  colorKeys: config.neutral.colorKeys,
  ratios: config.neutral.ratios,
  colorspace: "OKLCH",
  smooth: config.neutral.smooth,
});

export const globalDarkThemeConfig = new Theme({
  colors,
  backgroundColor: background,
  lightness: 10,
  contrast: 1,
  saturation: 100,
  output: "HEX",
  formula: "wcag2",
}).contrastColors;
