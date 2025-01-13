import { createContext } from "../../util/create-context";
import { TFunction } from "../../util/i18n/i18n.types";

interface DateTranslationContextProps {
  translate: TFunction<"DatePicker">;
}

export const [DateTranslationContextProvider, useDateTranslationContext] =
  createContext<DateTranslationContextProps>();
