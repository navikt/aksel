import { PrismTheme } from "prism-react-renderer";
import {
  TextAccent,
  TextDangerSubtle,
  TextInfo,
  TextNeutral,
  TextNeutralSubtle,
  TextSuccess,
  TextWarning,
  /* @ts-expect-error Workspace cant resolve valid import */
} from "@navikt/ds-tokens/darkside-js";

const AkselPrismTheme: PrismTheme = {
  plain: { color: TextNeutral, backgroundColor: "#011627" },
  styles: [
    { types: ["prolog"], style: { color: TextAccent } },
    { types: ["comment"], style: { color: TextNeutralSubtle } },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: { color: TextInfo },
    },
    { types: ["number", "inserted"], style: { color: TextSuccess } },
    { types: ["constant"], style: { color: TextNeutral } },
    { types: ["attr-name", "variable"], style: { color: TextAccent } },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: { color: TextNeutral },
    },
    { types: ["selector"], style: { color: TextWarning } },
    { types: ["tag"], style: { color: TextSuccess } },
    { types: ["tag"], languages: ["markup"], style: { color: TextSuccess } },
    { types: ["punctuation", "operator"], style: { color: TextNeutral } },
    {
      types: ["punctuation"],
      languages: ["markup"],
      style: { color: TextNeutralSubtle },
    },
    { types: ["function"], style: { color: TextAccent } },
    { types: ["class-name"], style: { color: TextSuccess } },
    { types: ["char"], style: { color: TextDangerSubtle } },
    { types: ["script"], style: { color: TextAccent } },
    { types: ["property-access"], style: { color: TextNeutral } },
  ],
};

export { AkselPrismTheme };
