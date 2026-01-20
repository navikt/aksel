import React, { forwardRef } from "react";
import type { OverridableComponent } from "../utils-external";
import { cl } from "../utils/helpers";

/**
 * @deprecated Use Box with padding and border instead
 */
export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Panel content
   */
  children: React.ReactNode;
  /**
   * Adds a border to panel when true
   * @default false
   */
  border?: boolean;
}

export type PanelType = OverridableComponent<PanelProps, HTMLElement>;

/**
 * @deprecated
 * Use Box with padding and border instead
 * ```
 * <Box padding="4" borderRadius="2" />
 * <Box padding="4" borderWidth="1" borderRadius="2" />
 * ```
 * Component will be removed in a future major release
 */
export const Panel: PanelType = forwardRef(
  (
    { children, className, border = false, as: Component = "div", ...rest },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cl("aksel-panel", className, {
          "aksel-panel--border": border,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

export default Panel;
