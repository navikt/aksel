import tokens from "../../../../tokens/dist/tokens-module";

type Prefix<
  ThePrefix extends string,
  TheTarget extends string
> = `${ThePrefix}${TheTarget}`;

type Bg = Prefix<"bg-", keyof typeof tokens.a.bg>;
type Surface = Prefix<"surface-", keyof typeof tokens.a.surface>;

type BackgroundColors = Bg | Surface;
type BorderColors = Prefix<"border-", keyof typeof tokens.a.border>;
type BorderRadii = Prefix<
  "border-radius-",
  keyof (typeof tokens.a)["border-radius"]
>;
type Shadows = Prefix<"shadow-", keyof typeof tokens.a.shadow>;

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
