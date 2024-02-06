import { enGB, nb, nn } from "date-fns/locale";

/** @private */
export const getLocaleFromString = (locale: "nb" | "nn" | "en" = "nb") => {
  switch (locale) {
    case "nn":
      return nn;
    case "en":
      return enGB;
    default:
      return nb;
  }
};
