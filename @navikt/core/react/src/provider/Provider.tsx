import React, { createContext, useContext } from "react";

export interface ProviderContextType {
  /**
   * Global root-element to attach portals to (Modal, Tooltip)
   */
  rootElement?: HTMLElement;
  /**
   * Global config for appElement (Modal)
   */
  appElement?: HTMLElement;
}

export const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined
);

export interface ProviderProps {
  children?: React.ReactNode;
  rootElement?: HTMLElement;
  appElement?: HTMLElement;
}

export const useProvider = () => useContext(ProviderContext);

/**
 * A component that provides a context to its children.
 *
 * @see https://aksel.nav.no/komponenter/core/provider
 * @see {@link ProviderProps}
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
    <ProviderContext.Provider value={rest}>{children}</ProviderContext.Provider>
  );
};

export default Provider;
