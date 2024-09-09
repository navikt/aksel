import React, { createContext, useContext } from "react";
import { TranslationDictionary } from "../../cjs/util/i18n/i18n.types";
import nb from "../util/i18n/locales/nb";

export interface ProviderContextType {
  /**
   * Global root-element to attach portals to (Tooltip)
   */
  rootElement?: HTMLElement;
  /**
   * Translation object (from language .json files)
   * Merged with the default language translations object (officially provided translations).
   */
  translations: TranslationDictionary | TranslationDictionary[];
}

export const ProviderContext = createContext<ProviderContextType>({
  translations: nb,
});

export interface ProviderProps {
  children?: React.ReactNode;
  rootElement?: HTMLElement;
  translations?: TranslationDictionary | TranslationDictionary[];
}

export const useProvider = () => useContext(ProviderContext);

/**
 * Provides added context to the component tree.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/provider)
 * @see 🏷️ {@link ProviderProps}
 *
 * @example
 * ```jsx
 * <Provider rootElement={rootElement}>
 *   {app}
 * </Provider>
 * ```
 */
export const Provider = ({
  children,
  translations,
  ...rest
}: ProviderProps) => {
  return (
    <ProviderContext.Provider
      value={{
        translations: translations ?? nb,
        ...rest,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export default Provider;
