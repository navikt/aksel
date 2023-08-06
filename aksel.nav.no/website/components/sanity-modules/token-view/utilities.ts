import color from "tinycolor2";
import docs from "@navikt/ds-tokens/docs.json";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const sanitizeName = (x: string) =>
  capitalize(x.replace("--a-", "").replaceAll("-", " "));

export const getColorString = (s: string) => {
  const c = color(s);

  const alpha = c.getAlpha() !== 1;
  return alpha ? c.toRgbString() : c.toHexString().toUpperCase();
};

export const getGlobalReference = (
  semanticValue: string
): { name: string; value: string } => {
  const globalRefs = Object.entries(docs)
    .filter(([key]) => key.startsWith("global-"))
    .reduce((acc, [_, value]) => [...acc, ...value], []);

  return globalRefs.find(({ value }) => semanticValue === value) ?? null;
};
