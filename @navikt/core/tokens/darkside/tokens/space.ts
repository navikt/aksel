import { spaceInPixels } from "../../internal-types";
import { type StyleDictionaryToken } from "../tokens.util";

function pxToRem(px: number) {
  return `${px / 16}rem`;
}

export const spaceTokenConfig = {
  space: spaceInPixels.reduce(
    (acc, px) => {
      acc[px] = {
        value: pxToRem(px),
        type: "global-space",
        comment: "TODO: Sjur fyller ut",
      };
      return acc;
    },
    {} as Record<
      (typeof spaceInPixels)[number],
      StyleDictionaryToken<"global-space">
    >,
  ),
} satisfies {
  space: Record<
    (typeof spaceInPixels)[number],
    StyleDictionaryToken<"global-space">
  >;
};
