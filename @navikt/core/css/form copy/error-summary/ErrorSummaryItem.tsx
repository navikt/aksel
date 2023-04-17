import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../..";

export interface ErrorSummaryItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text
   */
  children: React.ReactNode;
}

export type ErrorSummaryItemType = OverridableComponent<
  ErrorSummaryItemProps,
  HTMLAnchorElement
>;

export const ErrorSummaryItem: ErrorSummaryItemType = forwardRef(
  ({ children, as: Component = "a", className, ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(className, "navds-error-summary__item", "navds-link")}
      >
        {children}
      </Component>
    );
  }
);

export default ErrorSummaryItem;
