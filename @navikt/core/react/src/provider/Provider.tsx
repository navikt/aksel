import React, { createContext, useContext } from "react";
import { I18nProvider, TranslationDictionary } from "./i18n";

export interface ProviderContextType {
  /**
   * Global root-element to attach portals to (Tooltip)
   */
  rootElement?: HTMLElement;
}

export const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined
);

export interface ProviderProps {
  children?: React.ReactNode;
  rootElement?: HTMLElement;
  i18n?: TranslationDictionary;
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
export const Provider = ({ children, i18n, ...rest }: ProviderProps) => {
  return (
    <I18nProvider i18n={i18n}>
      <ProviderContext.Provider value={rest}>
        {children}
      </ProviderContext.Provider>
    </I18nProvider>
  );
};

export default Provider;
