import { type BorderRadiusKeys } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export const radiusTokenConfig = {
  radius: {
    "2": {
      value: "2px",
      type: "global-radius",
      comment: "TODO: Sjur fyller ut",
    },
    "4": {
      value: "4px",
      type: "global-radius",
      comment: "TODO: Sjur fyller ut",
    },
    "8": {
      value: "8px",
      type: "global-radius",
      comment: "TODO: Sjur fyller ut",
    },
    "12": {
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
  radius: Record<BorderRadiusKeys, StyleDictionaryToken<"global-radius">>;
};
