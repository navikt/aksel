import { StyleDictionaryToken } from "../tokens.util";

export function opacityTokenConfig() {
  return {
    opacity: {
      disabled: {
        value: "0.45",
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
