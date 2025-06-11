import { type AkselBreakpointToken } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export const breakpointTokenConfig = {
  breakpoint: {
    xs: {
      value: "0",
      type: "global-breakpoint",
      group: "mobile first",
      comment: "TODO: Sjur fyller ut",
    },
    sm: {
      value: "480px",
      type: "global-breakpoint",
      group: "mobile first",
      comment: "TODO: Sjur fyller ut",
    },
    "sm-down": {
      value: "479px",
      type: "global-breakpoint",
      group: "desktop first",
      comment: "TODO: Sjur fyller ut",
    },
    md: {
      value: "768px",
      type: "global-breakpoint",
      group: "mobile first",
      comment: "TODO: Sjur fyller ut",
    },
    "md-down": {
      value: "767px",
      type: "global-breakpoint",
      group: "desktop first",
      comment: "TODO: Sjur fyller ut",
    },
    lg: {
      value: "1024px",
      type: "global-breakpoint",
      group: "mobile first",
      comment: "TODO: Sjur fyller ut",
    },
    "lg-down": {
      value: "1023px",
      type: "global-breakpoint",
      group: "desktop first",
      comment: "TODO: Sjur fyller ut",
    },
    xl: {
      value: "1280px",
      type: "global-breakpoint",
      group: "desktop first",
      comment: "TODO: Sjur fyller ut",
    },
    "xl-down": {
      value: "1279px",
      type: "global-breakpoint",
      group: "desktop first",
      comment: "TODO: Sjur fyller ut",
    },
    "2xl": {
      value: "1440px",
      type: "global-breakpoint",
      group: "mobile first",
      comment: "TODO: Sjur fyller ut",
    },
    "2xl-down": {
      value: "1439px",
      type: "global-breakpoint",
      group: "desktop first",
      comment: "TODO: Sjur fyller ut",
    },
  },
} satisfies {
  breakpoint: Record<
    AkselBreakpointToken,
    StyleDictionaryToken<"global-breakpoint">
  >;
};
