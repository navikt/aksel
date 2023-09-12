import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import surfaceColors from "@navikt/ds-tokens/src/colors-surface.json";
import borderColors from "@navikt/ds-tokens/src/colors-border.json";
import borderRadii from "@navikt/ds-tokens/src/border.json";
import shadows from "@navikt/ds-tokens/src/shadow.json";

export type BackgroundToken =
  | keyof typeof bgColors.a
  | keyof typeof surfaceColors.a;
export type BorderColorToken = keyof typeof borderColors.a;
export type BorderRadiiToken =
  | keyof (typeof borderRadii.a)["border-radius"]
  | "0";
export type ShadowToken = keyof typeof shadows.a.shadow;
