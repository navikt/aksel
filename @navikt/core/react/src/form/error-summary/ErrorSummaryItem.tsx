import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/types";

export interface ErrorSummaryItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text
   */
  children: React.ReactNode;
  /**
   * Link to errormessage
   */
  href?: string;
}

type ErrorSummaryItemType = OverridableComponent<
  ErrorSummaryItemProps,
  HTMLAnchorElement
>;

export const ErrorSummaryItem: ErrorSummaryItemType = forwardRef(
  ({ children, as: Component = "a", className, ...rest }, ref) => {
    return (
      <li>
        <Component
          {...rest}
          ref={ref}
          className={cl(className, "navds-error-summary__item", "navds-link")}
        >
          {children}
        </Component>
      </li>
    );
  },
);

export default ErrorSummaryItem;
