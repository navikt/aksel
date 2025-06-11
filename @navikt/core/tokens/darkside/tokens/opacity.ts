import { AkselColorTheme } from "../../types";
import { StyleDictionaryToken } from "../tokens.util";

export function opacityTokenConfig(theme: AkselColorTheme) {
  return {
    opacity: {
      disabled: {
        value: theme === "light" ? `0.3` : `0.4`,
        type: "opacity",
        comment: "Used for setting opacity on disabled elements.",
        figmaIgnore: true,
        docsIgnore: true,
      },
    },
  } satisfies {
    opacity: Record<"disabled", StyleDictionaryToken<"opacity">>;
  };
}
