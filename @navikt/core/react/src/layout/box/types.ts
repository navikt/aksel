import bgColors from "../../../../tokens/src/colors-bg.json";
import surfaceColors from "../../../../tokens/src/colors-surface.json";
import borderColors from "../../../../tokens/src/colors-border.json";
import borderRadii from "../../../../tokens/src/border.json";
import shadows from "../../../../tokens/src/shadow.json";

export type BackgroundColors =
  | keyof typeof bgColors.a
  | keyof typeof surfaceColors.a;
export type BorderColors = keyof typeof borderColors.a;
export type BorderRadii = keyof typeof borderRadii.a.border.radius;
export type Shadows = keyof typeof shadows.a.shadow;
