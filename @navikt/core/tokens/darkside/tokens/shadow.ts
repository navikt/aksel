import { type ColorTheme, ShadowKeys } from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export function shadowTokenConfig(theme: ColorTheme) {
  return {
    shadow: {
      dialog: {
        value:
          theme === "light"
            ? `0px 0px 1px 0px rgba(7 9 13 / 0.02), 0px 2px 5px 0px rgba(7 9 13 / 0.10), 0px 5px 12px 0px rgba(7 9 13 / 0.12)`
            : `0px 0px 1px 0px rgba(7 9 13 / 0.00), 0px 2px 5px 0px rgba(7 9 13 / 0.35), 0px 5px 12px 0px rgba(7 9 13 / 0.50)`,
        type: "shadow",
        comment: "Used for dialog elements like modals and popovers.",
        figmaIgnore: true,
      },
    },
  } satisfies {
    shadow: Record<ShadowKeys, StyleDictionaryToken<"shadow">>;
  };
}
