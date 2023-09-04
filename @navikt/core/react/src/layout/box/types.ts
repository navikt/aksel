//import bgColors from "../../../../tokens/src/colors-bg.json";
//import surfaceColors from "../../../../tokens/src/colors-surface.json";
import borderColors from "../../../../tokens/src/colors-border.json";
//import borderRadii from "../../../../tokens/src/border.json";
//import shadows from "../../../../tokens/src/shadow.json";

type BackgroundColors = any; //keyof typeof bgColors.a | keyof typeof surfaceColors.a;
type BorderColors = keyof typeof borderColors.a;
type BorderRadii = any; //keyof typeof borderRadii.a.border.radius;
type Shadows = any; //keyof typeof shadows.a.shadow;

export type BackgroundSpecifier =
  | BackgroundColors
  | { default: BackgroundColors };

export type BorderColorSpecifier = BorderColors | { default: BackgroundColors };

export type BorderRadiusSpecifier =
  | BorderRadii
  | {
      default?: BorderRadii;
      topLeft?: BorderRadii;
      topRight?: BorderRadii;
      bottomLeft?: BorderRadii;
      bottomRight?: BorderRadii;
    };

export type ShadowSpecifier = Shadows | { default: Shadows };
