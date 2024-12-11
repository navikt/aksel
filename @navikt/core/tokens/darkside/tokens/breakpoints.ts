import { type BreakPointKeys } from "../tokens.types";
import { type StyleDictionaryToken } from "../tokens.util";

export const breakpointsTokenConfig = {
  breakpoint: {
    xs: { value: "0", type: "global-breakpoints" },
    sm: { value: "480px", type: "global-breakpoints" },
    "sm-down": { value: "479px", type: "global-breakpoints" },
    md: { value: "768px", type: "global-breakpoints" },
    "md-down": { value: "767px", type: "global-breakpoints" },
    lg: { value: "1024px", type: "global-breakpoints" },
    "lg-down": { value: "1023px", type: "global-breakpoints" },
    xl: { value: "1280px", type: "global-breakpoints" },
    "xl-down": { value: "1279px", type: "global-breakpoints" },
    "2xl": { value: "1440px", type: "global-breakpoints" },
    "2xl-down": { value: "1439px", type: "global-breakpoints" },
  },
} satisfies {
  breakpoint: Record<
    BreakPointKeys,
    StyleDictionaryToken<"global-breakpoints">
  >;
};
