import {
  type FontFamilyKeys,
  type FontLineHeightKeys,
  type FontSizeKeys,
  type FontWeightKeys,
} from "../tokens.types";
import { type StyleDictionaryToken } from "../tokens.util";

const baseFontSize = 16;
const getFontSize = (size: number) => `${size / baseFontSize}rem`;

export const fontTokenConfig = {
  font: {
    family: {
      value: "'Source Sans 3', 'Source Sans Pro', Arial, sans-serif",
      type: "global-font",
    },

    "line-height-heading-2xlarge": {
      value: getFontSize(52),
      type: "global-font",
    },
    "line-height-heading-xlarge": {
      value: getFontSize(40),
      type: "global-font",
    },
    "line-height-heading-large": {
      value: getFontSize(36),
      type: "global-font",
    },
    "line-height-heading-medium": {
      value: getFontSize(32),
      type: "global-font",
    },
    "line-height-heading-small": {
      value: getFontSize(28),
      type: "global-font",
    },
    "line-height-heading-xsmall": {
      value: getFontSize(24),
      type: "global-font",
    },
    "line-height-xlarge": { value: getFontSize(28), type: "global-font" },
    "line-height-large": { value: getFontSize(24), type: "global-font" },
    "line-height-medium": { value: getFontSize(20), type: "global-font" },

    "size-heading-2xlarge": { value: getFontSize(40), type: "global-font" },
    "size-heading-xlarge": { value: getFontSize(32), type: "global-font" },
    "size-heading-large": { value: getFontSize(28), type: "global-font" },
    "size-heading-medium": { value: getFontSize(24), type: "global-font" },
    "size-heading-small": { value: getFontSize(20), type: "global-font" },
    "size-heading-xsmall": { value: getFontSize(18), type: "global-font" },
    "size-xlarge": { value: getFontSize(20), type: "global-font" },
    "size-large": { value: getFontSize(18), type: "global-font" },
    "size-medium": { value: getFontSize(16), type: "global-font" },
    "size-small": { value: getFontSize(14), type: "global-font" },

    "weight-bold": { value: "600", type: "global-font" },
    "weight-regular": { value: "400", type: "global-font" },
  },
} satisfies {
  font: Record<
    FontFamilyKeys | FontSizeKeys | FontLineHeightKeys | FontWeightKeys,
    StyleDictionaryToken<"global-font">
  >;
};
