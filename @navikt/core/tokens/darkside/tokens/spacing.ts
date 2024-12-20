import { type SpacingKeys, spacingInPixels } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

function pxToRem(px: number) {
  return `${px / 16}rem`;
}

export const spacingTokenConfig = {
  space: spacingInPixels.reduce(
    (acc, px) => {
      acc[`${px}`] = {
        value: pxToRem(px),
        type: "global-spacing",
      };
      return acc;
    },
    {} as Record<SpacingKeys, StyleDictionaryToken<"global-spacing">>,
  ),
} satisfies {
  space: Record<SpacingKeys, StyleDictionaryToken<"global-spacing">>;
};
