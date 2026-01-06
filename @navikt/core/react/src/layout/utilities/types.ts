import type {
  AkselBorderRadiusToken,
  AkselBreakpointToken,
  AkselSpaceToken,
} from "@navikt/ds-tokens/types";

export type BreakpointsAlias = Extract<
  AkselBreakpointToken,
  "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
>;

export type SpacingScale = AkselSpaceToken | "0";
export type BorderRadiusScale = AkselBorderRadiusToken;

export type SpaceDelimitedAttribute<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;
type FixedResponsiveT<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | FixedResponsiveT<T>;
