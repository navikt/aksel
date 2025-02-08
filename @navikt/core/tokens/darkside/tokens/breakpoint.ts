import { type BreakPointKeys } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export const breakpointTokenConfig = {
  breakpoint: {
    xs: { value: "0", type: "global-breakpoint" },
    sm: { value: "480px", type: "global-breakpoint" },
    "sm-down": { value: "479px", type: "global-breakpoint" },
    md: { value: "768px", type: "global-breakpoint" },
    "md-down": { value: "767px", type: "global-breakpoint" },
    lg: { value: "1024px", type: "global-breakpoint" },
    "lg-down": { value: "1023px", type: "global-breakpoint" },
    xl: { value: "1280px", type: "global-breakpoint" },
    "xl-down": { value: "1279px", type: "global-breakpoint" },
    "2xl": { value: "1440px", type: "global-breakpoint" },
    "2xl-down": { value: "1439px", type: "global-breakpoint" },
  },
} satisfies {
  breakpoint: Record<BreakPointKeys, StyleDictionaryToken<"global-breakpoint">>;
};
