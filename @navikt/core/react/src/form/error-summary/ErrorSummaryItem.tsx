import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
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
    const { cn } = useRenameCSS();

    return (
      <li>
        <Component
          {...rest}
          ref={ref}
          className={cn(className, "navds-error-summary__item", "navds-link")}
        >
          {children}
        </Component>
      </li>
    );
  },
);

export default ErrorSummaryItem;
