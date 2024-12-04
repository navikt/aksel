import { enGB, nb, nn } from "date-fns/locale";
import en_translations from "../../util/i18n/locales/en";
import nn_translations from "../../util/i18n/locales/nn";

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

/**
 * @private
 * Temporary for backwards compatibility with locale prop
 */
export const getTranslations = (locale: string | undefined) => {
  switch (locale) {
    case "nn":
      return nn_translations.DatePicker;
    case "en":
    case "en-GB":
      return en_translations.DatePicker;
    default:
      return undefined;
  }
};
