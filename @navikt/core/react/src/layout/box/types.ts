import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import surfaceColors from "@navikt/ds-tokens/src/colors-surface.json";
import borderColors from "@navikt/ds-tokens/src/colors-border.json";
import borderRadii from "@navikt/ds-tokens/src/border.json";
import shadows from "@navikt/ds-tokens/src/shadow.json";

type BackgroundColors = keyof typeof bgColors.a | keyof typeof surfaceColors.a;
type BorderColors = keyof typeof borderColors.a;
type BorderRadii = keyof (typeof borderRadii.a)["border-radius"];
type Shadows = keyof typeof shadows.a.shadow;

export type BackgroundSpecifier = BackgroundColors;

export type BorderColorSpecifier = BorderColors;

export type BorderRadiusSpecifier =
  | BorderRadii
  | {
      default?: BorderRadii;
      topLeft?: BorderRadii;
      topRight?: BorderRadii;
      bottomLeft?: BorderRadii;
      bottomRight?: BorderRadii;
    };

export type ShadowSpecifier = Shadows;
