import { type BorderRadiusKeys } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export const radiusTokenConfig = {
  "border-radius": {
    small: { value: "2px", type: "global-radius" },
    medium: { value: "4px", type: "global-radius" },
    large: { value: "8px", type: "global-radius" },
    xlarge: { value: "12px", type: "global-radius" },
    full: { value: "9999px", type: "global-radius" },
  },
} satisfies {
  "border-radius": Record<
    BorderRadiusKeys,
    StyleDictionaryToken<"global-radius">
  >;
};
