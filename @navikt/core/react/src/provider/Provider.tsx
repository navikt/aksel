import React, { createContext, useContext } from "react";
import { PartialTranslations, Translations } from "../utils/i18n/i18n.types";
import nb from "../utils/i18n/locales/nb";

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
   * Global root-element to attach portals to. Used by Tooltip, Modal (optionally) and ActionMenu.
   */
  rootElement?: HTMLElement;
} & (
  | {
      /**
       * Aksel locale
       * @default nb
       * @example
       * import { en } from "@navikt/ds-react/locales";
       * <Provider locale={en}>
       *   {app}
       * </Provider>
       */
      locale: Translations;
      /**
       * Use this if you need to override some of the default translations.
       * Can be a single object or an array of objects.
       * Must be used together with the `locale` prop.
       */
      translations?: PartialTranslations | PartialTranslations[];
    }
  | {
      locale?: never;
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
 * <Provider rootElement={rootElement}>
 *   {app}
 * </Provider>
 */
export const Provider = ({
  children,
  rootElement,
  locale,
  translations,
}: ProviderProps) => {
  const parentContext = useProvider();
  return (
    <ProviderContext.Provider
      value={{
        rootElement: rootElement || parentContext.rootElement,
        locale: locale || parentContext.locale || nb,
        translations: translations || parentContext.translations,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export default Provider;
