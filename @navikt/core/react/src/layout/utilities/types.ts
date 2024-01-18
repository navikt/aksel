import borderRadii from "@navikt/ds-tokens/src/border.json";
import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import borderColors from "@navikt/ds-tokens/src/colors-border.json";
import surfaceColors from "@navikt/ds-tokens/src/colors-surface.json";
import shadows from "@navikt/ds-tokens/src/shadow.json";
import Spacing from "@navikt/ds-tokens/src/spacing.json";

export type BackgroundToken =
  | keyof typeof bgColors.a
  | keyof typeof surfaceColors.a;
export type BorderColorToken = keyof typeof borderColors.a;
export type BorderRadiiToken =
  | keyof (typeof borderRadii.a)["border-radius"]
  | "0";
export type ShadowToken = keyof typeof shadows.a.shadow;

export type BreakpointsAlias = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type SpacingScale = keyof (typeof Spacing)["a"]["spacing"];

export type SpaceDelimitedAttribute<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;
type FixedResponsiveT<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | FixedResponsiveT<T>;
