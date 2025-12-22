import { enGB, nb, nn } from "date-fns/locale";
import { createStrictContext } from "../util/create-context";
import { TFunction } from "../util/i18n/i18n.types";
import en_translations from "../util/i18n/locales/en";
import nn_translations from "../util/i18n/locales/nn";

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
 * Temporary for backwards compatibility with locale prop. Can be removed when locale prop has been removed.
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

/**
 * @private
 * Temporary for backwards compatibility with locale prop. Can be removed when locale prop has been removed.
 */
export const getGlobalTranslations = (locale: string | undefined) => {
  switch (locale) {
    case "nn":
      return nn_translations.global;
    case "en":
    case "en-GB":
      return en_translations.global;
    default:
      return undefined;
  }
};

interface DateTranslationContextProps {
  translate: TFunction<"DatePicker">;
}

export const [DateTranslationContextProvider, useDateTranslationContext] =
  createStrictContext<DateTranslationContextProps>({
    name: "DateTranslationContext",
  });
