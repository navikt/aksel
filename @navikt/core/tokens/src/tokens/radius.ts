import {
  AkselBorderRadiusToken,
  AkselLegacyBorderRadiusToken,
} from "../../types";
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
    full: {
      value: "9999px",
      type: "global-radius",
    },
  },
  border: {
    radius: {
      full: {
        value: "{ax.radius.full.value}",
        type: "global-radius",

        figmaIgnore: true,
        docsIgnore: true,
      },
      small: {
        value: "{ax.radius.2.value}",
        type: "global-radius",

        figmaIgnore: true,
        docsIgnore: true,
      },
      medium: {
        value: "{ax.radius.4.value}",
        type: "global-radius",

        figmaIgnore: true,
        docsIgnore: true,
      },
      large: {
        value: "{ax.radius.8.value}",
        type: "global-radius",

        figmaIgnore: true,
        docsIgnore: true,
      },
      xlarge: {
        value: "{ax.radius.12.value}",
        type: "global-radius",

        figmaIgnore: true,
        docsIgnore: true,
      },
    },
  },
} satisfies {
  radius: Record<AkselBorderRadiusToken, StyleDictionaryToken<"global-radius">>;
  border: {
    radius: Record<
      AkselLegacyBorderRadiusToken,
      StyleDictionaryToken<"global-radius">
    >;
  };
};
