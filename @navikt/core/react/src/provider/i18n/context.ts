import { createContext } from "react";
import nb from "../../locales/nb.json";
import { TranslationDictionary } from "./types";

export const I18nContext = createContext<
  TranslationDictionary | TranslationDictionary[]
>(nb);
