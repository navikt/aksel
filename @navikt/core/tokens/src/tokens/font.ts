import {
  type FontFamilyKeys,
  type FontLineHeightKeys,
  type FontSizeKeys,
  type FontWeightKeys,
} from "../../internal-types";
import { type StyleDictionaryToken } from "../tokens.util";

const baseFontSize = 16;
const getFontSize = (size: number) => `${size / baseFontSize}rem`;

export const fontTokenConfig = {
  font: {
    family: {
      value: "'Source Sans 3', 'Source Sans Pro', Arial, sans-serif",
      type: "global-font",
      group: "family",
    },

    "line-height-heading-2xlarge": {
      value: getFontSize(52),
      type: "global-font",
      group: "line-height",
    },
    "line-height-heading-xlarge": {
      value: getFontSize(40),
      type: "global-font",
      group: "line-height",
    },
    "line-height-heading-large": {
      value: getFontSize(36),
      type: "global-font",
      group: "line-height",
    },
    "line-height-heading-medium": {
      value: getFontSize(32),
      type: "global-font",
      group: "line-height",
    },
    "line-height-heading-small": {
      value: getFontSize(28),
      type: "global-font",
      group: "line-height",
    },
    "line-height-heading-xsmall": {
      value: getFontSize(24),
      type: "global-font",
      group: "line-height",
    },
    "line-height-xlarge": {
      value: getFontSize(28),
      type: "global-font",
      group: "line-height",
    },
    "line-height-large": {
      value: getFontSize(24),
      type: "global-font",
      group: "line-height",
    },
    "line-height-medium": {
      value: getFontSize(20),
      type: "global-font",
      group: "line-height",
    },

    "size-heading-2xlarge": {
      value: getFontSize(40),
      type: "global-font",
      group: "size",
    },
    "size-heading-xlarge": {
      value: getFontSize(32),
      type: "global-font",
      group: "size",
    },
    "size-heading-large": {
      value: getFontSize(28),
      type: "global-font",
      group: "size",
    },
    "size-heading-medium": {
      value: getFontSize(24),
      type: "global-font",
      group: "size",
    },
    "size-heading-small": {
      value: getFontSize(20),
      type: "global-font",
      group: "size",
    },
    "size-heading-xsmall": {
      value: getFontSize(18),
      type: "global-font",
      group: "size",
    },
    "size-xlarge": {
      value: getFontSize(20),
      type: "global-font",
      group: "size",
    },
    "size-large": {
      value: getFontSize(18),
      type: "global-font",
      group: "size",
    },
    "size-medium": {
      value: getFontSize(16),
      type: "global-font",
      group: "size",
    },
    "size-small": {
      value: getFontSize(14),
      type: "global-font",
      group: "size",
    },

    "weight-bold": {
      value: "600",
      type: "global-font",
      group: "weight",
    },
    "weight-regular": {
      value: "400",
      type: "global-font",
      group: "weight",
    },
  },
} satisfies {
  font: Record<
    FontFamilyKeys | FontSizeKeys | FontLineHeightKeys | FontWeightKeys,
    StyleDictionaryToken<"global-font">
  >;
};
