import { PrismTheme } from "prism-react-renderer";
import {
  TextAccent,
  TextAccentSubtle,
  TextDangerSubtle,
  TextInfo,
  TextNeutral,
  TextNeutralSubtle,
  TextWarning,
  TextWarningSubtle,
} from "@navikt/ds-tokens/darkside-js";

const AkselPrismTheme: PrismTheme = {
  plain: { color: TextNeutral },
  styles: [
    { types: ["prolog"], style: { color: TextAccent } },
    { types: ["comment"], style: { color: TextNeutralSubtle } },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: { color: TextInfo },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: { color: TextAccentSubtle },
    },
    { types: ["constant"], style: { color: TextNeutral } },
    { types: ["attr-name", "variable"], style: { color: TextWarningSubtle } },
    {
      types: ["deleted", "attr-value", "template-punctuation"],
      style: { color: TextNeutral },
    },
    {
      types: ["string"],
      style: { color: TextAccentSubtle },
    },
    { types: ["selector"], style: { color: TextWarning } },
    { types: ["tag"], style: { color: TextWarningSubtle } },
    {
      types: ["tag"],
      languages: ["markup"],
      style: { color: TextWarningSubtle },
    },
    { types: ["punctuation", "operator"], style: { color: TextNeutral } },
    {
      types: ["punctuation"],
      languages: ["markup"],
      style: { color: TextNeutralSubtle },
    },
    { types: ["function"], style: { color: TextAccentSubtle } },
    { types: ["class-name"], style: { color: TextAccentSubtle } },
    { types: ["char"], style: { color: TextDangerSubtle } },
    { types: ["script"], style: { color: TextAccent } },
    { types: ["property-access"], style: { color: TextNeutral } },
    { types: ["maybe-class-name"], style: { color: TextAccent } },
    {
      types: ["imports", "maybe-class-name"],
      style: { color: TextNeutral },
    },
    {
      types: ["token", "tag"],
      style: { color: TextAccent },
    },
  ],
};

export { AkselPrismTheme };
