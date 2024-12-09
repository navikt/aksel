import { ColorTheme, StyleDictionaryTokenConfig } from "../util";

export function opacityTokenConfig(theme: ColorTheme) {
  return {
    opacity: {
      disabled: {
        value: theme === "light" ? `0.3` : `0.4`,
        type: "opacity",
        comment: "Used for setting opacity on disabled elements.",
        figmaIgnore: true,
      },
    },
  } satisfies StyleDictionaryTokenConfig<"opacity">;
}
