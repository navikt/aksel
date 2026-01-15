import { type AkselBreakpointToken } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export const breakpointTokenConfig = {
  breakpoint: {
    xs: {
      value: "0",
      type: "global-breakpoint",
      group: "mobile first",
    },
    sm: {
      value: "480px",
      type: "global-breakpoint",
      group: "mobile first",
    },
    "sm-down": {
      value: "479px",
      type: "global-breakpoint",
      group: "desktop first",
    },
    md: {
      value: "768px",
      type: "global-breakpoint",
      group: "mobile first",
    },
    "md-down": {
      value: "767px",
      type: "global-breakpoint",
      group: "desktop first",
    },
    lg: {
      value: "1024px",
      type: "global-breakpoint",
      group: "mobile first",
    },
    "lg-down": {
      value: "1023px",
      type: "global-breakpoint",
      group: "desktop first",
    },
    xl: {
      value: "1280px",
      type: "global-breakpoint",
      group: "desktop first",
    },
    "xl-down": {
      value: "1279px",
      type: "global-breakpoint",
      group: "desktop first",
    },
    "2xl": {
      value: "1440px",
      type: "global-breakpoint",
      group: "mobile first",
    },
    "2xl-down": {
      value: "1439px",
      type: "global-breakpoint",
      group: "desktop first",
    },
  },
} satisfies {
  breakpoint: Record<
    AkselBreakpointToken,
    StyleDictionaryToken<"global-breakpoint">
  >;
};
