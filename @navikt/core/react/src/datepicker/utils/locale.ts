import enGB from "date-fns/locale/en-GB";
import nb from "date-fns/locale/nb";
import nn from "date-fns/locale/nn";

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
