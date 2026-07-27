import type { StyleDictionaryToken } from "../tokens.util";

export function opacityTokenConfig() {
  return {
    opacity: {
      disabled: {
        value: "0.45",
        type: "opacity",
        comment: "Brukes for å sette opacity på deaktiverte elementer.",
        figmaIgnore: true,
        docsIgnore: true,
      },
    },
  } satisfies {
    opacity: Record<"disabled", StyleDictionaryToken<"opacity">>;
  };
}
