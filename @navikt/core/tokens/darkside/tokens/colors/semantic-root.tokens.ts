import {
  type BorderColorKeys,
  type ColorTheme,
  type DefaultTextColorKeys,
  type StaticDefaultBgKeys,
} from "../../../types";
import { type StyleDictionaryToken } from "../../tokens.util";

/**
 * Static root-layer for semantic tokens.
 * These tokens are the  "root"-layer in the sense that they are the only "unique" tokens in the semantic layer.
 */
export function semanticRootTokens(theme: ColorTheme) {
  return {
    text: {
      logo: {
        value: theme === "light" ? "#C30000" : "{ax.neutral.1000.value}",
        type: "color",
        group: "text",
        comment: "TODO: Sjur fyller ut",
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
        comment: "TODO: Sjur fyller ut",
      },
      input: {
        value:
          theme === "light"
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(7, 9, 13, 0.50)",
        type: "color",
        group: "background",
        comment: "TODO: Sjur fyller ut",
      },
      raised: {
        value:
          theme === "light"
            ? "{ax.neutral.000.value}"
            : "{ax.neutral.200.value}",
        type: "color",
        group: "background",
        comment: "TODO: Sjur fyller ut",
      },
      sunken: {
        value: theme === "light" ? "{ax.neutral.200.value}" : "#07090D",
        type: "color",
        group: "background",
        comment: "TODO: Sjur fyller ut",
      },
      overlay: {
        value: "rgba(2, 20, 49 , 0.80)",
        type: "color",
        group: "background",
        comment: "TODO: Sjur fyller ut",
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
        comment: "TODO: Sjur fyller ut",
      },
    },
  } satisfies {
    bg: Record<StaticDefaultBgKeys, StyleDictionaryToken<"color">>;
    border: Record<BorderColorKeys, StyleDictionaryToken<"color">>;
    text: Record<DefaultTextColorKeys, StyleDictionaryToken<"color">>;
  };
}
