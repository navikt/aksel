import { type BorderRadiusKeys, LegacyBorderRadiusKeys } from "../../types";
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
  border: {
    radius: {
      full: {
        value: "9999px",
        type: "global-radius",
        comment: "TODO: Sjur fyller ut",
        figmaIgnore: true,
      },
      small: {
        value: "2px",
        type: "global-radius",
        comment: "TODO: Sjur fyller ut",
        figmaIgnore: true,
      },
      medium: {
        value: "4px",
        type: "global-radius",
        comment: "TODO: Sjur fyller ut",
        figmaIgnore: true,
      },
      large: {
        value: "8px",
        type: "global-radius",
        comment: "TODO: Sjur fyller ut",
        figmaIgnore: true,
      },
      xlarge: {
        value: "12px",
        type: "global-radius",
        comment: "TODO: Sjur fyller ut",
        figmaIgnore: true,
      },
    },
  },
} satisfies {
  radius: Record<BorderRadiusKeys, StyleDictionaryToken<"global-radius">>;
  border: {
    radius: Record<
      LegacyBorderRadiusKeys,
      StyleDictionaryToken<"global-radius">
    >;
  };
};
