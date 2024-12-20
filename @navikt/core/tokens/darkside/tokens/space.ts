import { type SpaceKeys, spaceInPixels } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

function pxToRem(px: number) {
  return `${px / 16}rem`;
}

export const spaceTokenConfig = {
  space: spaceInPixels.reduce(
    (acc, px) => {
      acc[`${px}`] = {
        value: pxToRem(px),
        type: "global-space",
      };
      return acc;
    },
    {} as Record<SpaceKeys, StyleDictionaryToken<"global-space">>,
  ),
} satisfies {
  space: Record<SpaceKeys, StyleDictionaryToken<"global-space">>;
};
