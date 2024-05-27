import color from "color";

export const getColors = (tokens: { [key: string]: string | number }) =>
  Object.entries(tokens).reduce((old, [key, val]) => {
    try {
      color(val);
      if (typeof val === "string" && val.startsWith("rgb")) {
        old[key] = val;
      }
      return old;
    } catch {
      return old;
    }
  }, {});
