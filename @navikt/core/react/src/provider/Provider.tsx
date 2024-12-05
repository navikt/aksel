import React, { createContext, useContext } from "react";
import { PartialTranslations, Translations } from "../util/i18n/i18n.types";
import nb from "../util/i18n/locales/nb";

type ProviderContextType = {
  rootElement?: HTMLElement;
  locale: Translations;
  translations?: PartialTranslations | PartialTranslations[];
};

export const ProviderContext = createContext<ProviderContextType>({
  locale: nb,
});

export type ProviderProps = {
  children: React.ReactNode;
  /**
   * Global root-element to attach portals to (Tooltip)
   */
  rootElement?: HTMLElement;
} & (
  | {
      /**
       * Language translations
       */
      locale: Translations;
      translations?: PartialTranslations | PartialTranslations[];
    }
  | {
      locale?: never;
      /**
       * Your translation overrides
       */
      translations?: never;
    }
);

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
export const Provider = ({ children, ...rest }: ProviderProps) => {
  return (
    <ProviderContext.Provider value={{ ...rest, locale: rest.locale || nb }}>
      {children}
    </ProviderContext.Provider>
  );
};

export default Provider;
