import { AkselBorderRadiusToken } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export const radiusTokenConfig = {
  radius: {
    "2": {
      value: "2px",
      type: "global-radius",
    },
    "4": {
      value: "4px",
      type: "global-radius",
    },
    "8": {
      value: "8px",
      type: "global-radius",
    },
    "12": {
      value: "12px",
      type: "global-radius",
    },
    "16": {
      value: "16px",
      type: "global-radius",
    },
    full: {
      value: "9999px",
      type: "global-radius",
    },
  },
} satisfies {
  radius: Record<AkselBorderRadiusToken, StyleDictionaryToken<"global-radius">>;
};
