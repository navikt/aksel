import type { AkselColorTheme, AkselShadowToken } from "../../types";
import type { StyleDictionaryToken } from "../tokens.util";

export function shadowTokenConfig(theme: AkselColorTheme) {
  return {
    shadow: {
      dialog: {
        value:
          theme === "light"
            ? `0px 4px 6px 0px rgba(0, 0, 0, 0.15), 0px 1px 3px -1px rgba(0, 0, 0, 0.15), 0px 1px 1px 0px rgba(0, 0, 0, 0.06)`
            : `0px 0px 1px 0px rgba(7 9 13 / 0.00), 0px 2px 5px 0px rgba(7 9 13 / 0.35), 0px 5px 12px 0px rgba(7 9 13 / 0.50)`,
        type: "shadow",
        comment:
          "Used for dialog elements like modals and popovers. Used in box-shadow property.",
        figmaIgnore: true,
      },
    },
  } satisfies {
    shadow: Record<AkselShadowToken, StyleDictionaryToken<"shadow">>;
  };
}
