import {
  type BorderColorKeys,
  type ColorTheme,
  type DefaultTextColorKeys,
  type StaticDefaultBgKeys,
} from "../../types";
import { type StyleDictionaryToken } from "../tokens.util";

export function semanticTokenConfig(theme: ColorTheme) {
  return {
    text: {
      logo: {
        value: theme === "light" ? "#C30000" : "{ax.neutral.1000.value}",
        type: "color",
        group: "text",
      },
    },
    bg: {
      default: {
        value: theme === "light" ? "#ffffff" : "#0E151F",
        type: "color",
        group: "background",
        /**
         * Allows token to be used on 'effect' properties in Figma,
         * Bg-default is used between element and focus-marking.
         */
        scopes: ["EFFECT_COLOR"],
      },
      input: {
        value:
          theme === "light"
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(7, 9, 13, 0.50)",
        type: "color",
        group: "background",
      },
      raised: {
        value:
          theme === "light"
            ? "{ax.neutral.000.value}"
            : "{ax.neutral.100.value}",
        type: "color",
        group: "background",
      },
      sunken: {
        value: theme === "light" ? "{ax.neutral.200.value}" : "#07090D",
        type: "color",
        group: "background",
      },
      overlay: {
        value: "rgba(2, 20, 49 , 0.49)",
        type: "color",
        group: "background",
      },
    },
    border: {
      focus: {
        value: "{ax.neutral.1000.value}",
        type: "color",
        group: "border",
        /**
         * Allows token to be used on 'effect' properties in Figma, used for creating focus markings.
         */
        scopes: ["EFFECT_COLOR"],
      },
    },
  } satisfies {
    bg: Record<StaticDefaultBgKeys, StyleDictionaryToken<"color">>;
    border: Record<BorderColorKeys, StyleDictionaryToken<"color">>;
    text: Record<DefaultTextColorKeys, StyleDictionaryToken<"color">>;
  };
}
