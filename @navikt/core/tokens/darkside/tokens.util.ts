import _ from "lodash";
import type { AkselColorRole } from "../types";

export type GlobalColorEntry = {
  value: string;
  type: "global-color";
  group: AkselColorRole;
};

export type TokenTypes =
  | "color"
  | "shadow"
  | "opacity"
  | "global-color"
  | "global-radius"
  | "global-space"
  | "global-breakpoint"
  | "global-font";

export type SemanticTokenGroups = "background" | "border" | "text";

export type FontGroups =
  | "family"
  | "line-height"
  | "line-height-heading"
  | "size"
  | "size-heading"
  | "weight";

export type BreakpointGroups = "mobile first" | "desktop first";

export type TokenGroup =
  | AkselColorRole
  | SemanticTokenGroups
  | `${SemanticTokenGroups}.${AkselColorRole}`
  | FontGroups
  | BreakpointGroups;

export type StyleDictionaryToken<T extends TokenTypes> = {
  /**
   * Token value
   * @example "#000000"
   * @example "1px"
   * @example "{a.neutral.100.value}"
   */
  value: string;
  /**
   * Token type
   */
  type: T;
  /**
   * Group the token belongs to. Used for auto-documentation and categorization in Figma.
   */
  group?: TokenGroup;
  /**
   * Optional comment for the token. Will be included in the generated documentation and in Figma.
   */
  comment?: string;
  /**
   * Optional extra scopes for the token.
   * Token will include all default scopes based on `type`, and any extra specified here.
   */
  scopes?: (
    | "ALL_SCOPES"
    | "TEXT_CONTENT"
    | "CORNER_RADIUS"
    | "WIDTH_HEIGHT"
    | "GAP"
    | "ALL_FILLS"
    | "FRAME_FILL"
    | "SHAPE_FILL"
    | "TEXT_FILL"
    | "STROKE_COLOR"
    | "STROKE_FLOAT"
    | "EFFECT_FLOAT"
    | "EFFECT_COLOR"
    | "OPACITY"
    | "FONT_FAMILY"
    | "FONT_STYLE"
    | "FONT_WEIGHT"
    | "FONT_SIZE"
    | "LINE_HEIGHT"
    | "LETTER_SPACING"
    | "PARAGRAPH_SPACING"
    | "PARAGRAPH_INDENT"
  )[];
  /**
   * In some cases, we want to hide tokens from the Figma plugin.
   */
  figmaIgnore?: boolean;
  /**
   * In some cases, we want to hide tokens from Token documentation
   */
  docsIgnore?: boolean;
};

export type StyleDictionaryTokenConfig<T extends TokenTypes> = {
  [key: string]: Record<string, StyleDictionaryToken<T>>;
};

export const tokensWithPrefix = <T>(input: T): Record<"ax", T> => {
  return { ax: input };
};

export const mergeConfigs = (
  configs: StyleDictionaryTokenConfig<TokenTypes>[],
): StyleDictionaryTokenConfig<TokenTypes> => {
  return configs.reduce((acc, config) => _.merge(acc, config), {});
};
