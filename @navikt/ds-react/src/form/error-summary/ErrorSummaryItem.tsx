import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../../index";

export type ErrorType = OverridableComponent<ErrorSummaryItemProps>;

export interface ErrorSummaryItemProps {
  props: {
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
}

const ErrorSummaryItem: ErrorType = forwardRef(
  ({ children, component: Component = "a", className, ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(className, "navds-error-summary__error", "navds-link")}
      >
        {children}
      </Component>
    );
  }
);

export default ErrorSummaryItem;
