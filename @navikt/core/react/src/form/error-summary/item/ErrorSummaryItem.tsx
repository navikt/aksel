import React, { forwardRef } from "react";
import type { OverridableComponent } from "../../../utils-external";
import { cl } from "../../../utils/helpers";

interface ErrorSummaryItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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

const ErrorSummaryItem: ErrorSummaryItemType = forwardRef(
  ({ children, as: Component = "a", className, ...rest }, ref) => {
    return (
      <li>
        <Component
          {...rest}
          ref={ref}
          className={cl(className, "aksel-error-summary__item", "aksel-link")}
        >
          {children}
        </Component>
      </li>
    );
  },
);

export { ErrorSummaryItem };
export type { ErrorSummaryItemProps };
