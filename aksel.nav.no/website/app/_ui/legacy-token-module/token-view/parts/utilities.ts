import color from "tinycolor2";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const sanitizeName = (x: string) =>
  capitalize(x.replace("--a-", "").replaceAll("-", " "));

export const getColorString = (s: string) => {
  const c = color(s);

  const alpha = c.getAlpha() !== 1;
  return alpha ? c.toRgbString() : c.toHexString().toUpperCase();
};
