import type {
  AkselBorderRadiusToken,
  AkselBreakpointToken,
  AkselLegacyBackgroundColorToken,
  AkselLegacyBorderColorToken,
  AkselLegacyBorderRadiusToken,
  AkselLegacyShadowToken,
  AkselLegacySpacingToken,
  AkselLegacySurfaceColorToken,
  AkselSpaceToken,
} from "@navikt/ds-tokens/types";

export type BackgroundColorToken = AkselLegacyBackgroundColorToken;
export type SurfaceColorToken = AkselLegacySurfaceColorToken;
export type BorderColorToken = AkselLegacyBorderColorToken;
export type ShadowToken = AkselLegacyShadowToken;

export type BreakpointsAlias = Extract<
  AkselBreakpointToken,
  "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
>;

export type SpacingScale = AkselLegacySpacingToken | AkselSpaceToken;
export type BorderRadiusScale =
  | AkselLegacyBorderRadiusToken
  | AkselBorderRadiusToken;

export type SpaceDelimitedAttribute<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;
type FixedResponsiveT<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | FixedResponsiveT<T>;
