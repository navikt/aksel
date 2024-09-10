import React, { createContext, useContext } from "react";
import { TranslationDictionary } from "../util/i18n/i18n.types";
import nb from "../util/i18n/locales/nb";

export interface LanguageProviderContextType {
  /**
   * Merged with the default language translations object (officially provided translations).
   */
  translations: TranslationDictionary | TranslationDictionary[];
}

export const LanguageProviderContext =
  createContext<LanguageProviderContextType>({
    translations: nb,
  });

export interface LanguageProviderProps {
  children?: React.ReactNode;
  translations?: TranslationDictionary | TranslationDictionary[];
}

export const useProvider = () => useContext(LanguageProviderContext);

/**
 * @example
 * ```jsx
 * <UNSAFE_AkselLanguageProvider translations={{...}}>
 *   {app}
 * </UNSAFE_AkselLanguageProvider>
 * ```
 */
export const UNSAFE_AkselLanguageProvider = ({
  children,
  translations,
  ...rest
}: LanguageProviderProps) => {
  return (
    <LanguageProviderContext.Provider
      value={{
        translations: translations ?? nb,
        ...rest,
      }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
};

export default UNSAFE_AkselLanguageProvider;
