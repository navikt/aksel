import React, { createContext, useContext } from "react";
import { PartialTranslations } from "../../util/i18n/i18n.types";
import nb from "../../util/i18n/locales/nb";

export interface LanguageProviderContextType {
  /**
   * Merged with the default language translations object (officially provided translations).
   */
  translations: PartialTranslations | PartialTranslations[];
}

export const LanguageProviderContext =
  createContext<LanguageProviderContextType>({
    translations: nb,
  });

export interface LanguageProviderProps {
  children?: React.ReactNode;
  translations?: PartialTranslations | PartialTranslations[];
}

export const useProvider = () => useContext(LanguageProviderContext);

/**
 * @private Feature is under development and should not be used in any applications.
 *
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
}: LanguageProviderProps) => {
  return (
    <LanguageProviderContext.Provider
      value={{
        translations: translations ?? nb,
      }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
};

export default UNSAFE_AkselLanguageProvider;
