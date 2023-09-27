import React, { createContext, useContext } from "react";

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
export const Provider = ({ children, ...rest }: ProviderProps) => {
  return (
    <ProviderContext.Provider value={rest}>{children}</ProviderContext.Provider>
  );
};

export default Provider;
