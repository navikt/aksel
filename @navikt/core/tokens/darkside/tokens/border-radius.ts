import { type BorderRadiusKeys } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export const radiusTokenConfig = {
  "border-radius": {
    small: {
      value: "2px",
      type: "global-radius",
      comment: "TODO: Sjur fyller ut",
    },
    medium: {
      value: "4px",
      type: "global-radius",
      comment: "TODO: Sjur fyller ut",
    },
    large: {
      value: "8px",
      type: "global-radius",
      comment: "TODO: Sjur fyller ut",
    },
    xlarge: {
      value: "12px",
      type: "global-radius",
      comment: "TODO: Sjur fyller ut",
    },
    full: {
      value: "9999px",
      type: "global-radius",
      comment: "TODO: Sjur fyller ut",
    },
  },
} satisfies {
  "border-radius": Record<
    BorderRadiusKeys,
    StyleDictionaryToken<"global-radius">
  >;
};
