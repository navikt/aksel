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
  semanticValue: string,
): { name: string; value: string | number } | null => {
  const globalRefs = Object.entries(docs)
    .filter(([key]) => key.startsWith("global-"))
    .flatMap(([, value]) =>
      value.map(({ name, value: _value }) => ({ name, value: String(_value) })),
    );

  return (
    globalRefs.find(
      ({ value, name }) => semanticValue === value && notBlacklistedName(name),
    ) ?? null
  );
};

function notBlacklistedName(name: string) {
  return !["--a-nav-red"].includes(name);
}
