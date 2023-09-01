// import bgColors from "../../../../tokens/src/colors-bg.json";
// import surfaceColors from "../../../../tokens/src/colors-surface.json";
// import borderColors from "../../../../tokens/src/colors-border.json";
// import borderRadii from "../../../../tokens/src/border.json";
// import shadows from "../../../../tokens/src/shadow.json";

// type BackgroundColors = keyof typeof bgColors.a | keyof typeof surfaceColors.a;
// type BorderColors = keyof typeof borderColors.a;
// type BorderRadii = keyof typeof borderRadii.a.border.radius;
// type Shadows = keyof typeof shadows.a.shadow;

type BackgroundColors = any;
type BorderColors = any;
type BorderRadii = any;
type Shadows = any;

export type BackgroundSpecifier =
  | BackgroundColors
  | { default?: BackgroundColors; hover: BackgroundColors };

export type BorderColorSpecifier =
  | BorderColors
  | { default?: BorderColors; hover: BorderColors };

export type BorderRadiusSpecifier =
  | BorderRadii
  | {
      default?: BorderRadii;
      topLeft?: BorderRadii;
      topRight?: BorderRadii;
      bottomLeft?: BorderRadii;
      bottomRight?: BorderRadii;
    };

export type ShadowSpecifier = Shadows | { default?: Shadows; hover: Shadows };
