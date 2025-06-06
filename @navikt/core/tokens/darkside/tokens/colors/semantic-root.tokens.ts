import {
  type AkselColorTheme,
  type AkselRootBackgroundToken,
  type AkselRootBorderToken,
  type AkselRootTextToken,
} from "../../../types";
import { type StyleDictionaryToken } from "../../tokens.util";

/**
 * Static root-layer for semantic tokens.
 * These tokens are the  "root"-layer in the sense that they are the only "unique" tokens in the semantic layer.
 */
export function semanticRootTokens(theme: AkselColorTheme) {
  return {
    text: {
      logo: {
        value: theme === "light" ? "#C30000" : "{ax.neutral.1000.value}",
        type: "color",
        group: "text",
        comment: "Navs logo-farge",
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
        comment: "Standard bakgrunnsfarge",
      },
      input: {
        value:
          theme === "light"
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(7, 9, 13, 0.50)",
        type: "color",
        group: "background",
        comment:
          "Bakgrunnsfargen som brukes på input-elementer (tekstfelt, sjekkbokser, o.l.) ",
      },
      raised: {
        value:
          theme === "light"
            ? "{ax.neutral.000.value}"
            : "{ax.neutral.200.value}",
        type: "color",
        group: "background",
        comment:
          "Bakgrunnsfarge på bokser som svever eller som skal fremheves i darkmode. F.eks. Card.",
      },
      sunken: {
        value: theme === "light" ? "{ax.neutral.200.value}" : "#07090D",
        type: "color",
        group: "background",
        comment:
          "Bakgrunnsfarge på en side eller deler av en side som fremstår nedsunket, dvs. «lavere» enn standard bakgrunn.",
      },
      overlay: {
        value: "rgba(2, 20, 49 , 0.80)",
        type: "color",
        group: "background",
        comment:
          "Fargen på det mørke gjennomsiktige laget som legges oppå en side når en modal åpnes.",
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
        comment: "Farge på fokusmarkering.",
      },
    },
  } satisfies {
    bg: Record<AkselRootBackgroundToken, StyleDictionaryToken<"color">>;
    border: Record<AkselRootBorderToken, StyleDictionaryToken<"color">>;
    text: Record<AkselRootTextToken, StyleDictionaryToken<"color">>;
  };
}
