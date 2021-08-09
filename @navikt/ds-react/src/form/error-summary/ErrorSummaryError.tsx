import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../..";

export type ErrorType = OverridableComponent<ErrorSummaryErrorProps>;

export interface ErrorSummaryErrorProps {
  props: {
    className?: string;
    children: React.ReactNode;
    formFieldId: string;
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
}

const ErrorSummaryError: ErrorType = forwardRef(
  (
    { children, component: Component = "a", className, formFieldId, ...rest },
    ref
  ) => {
    const hrefProp =
      Component === "a" ? { href: `#${formFieldId}` } : undefined;

    return (
      <Component
        ref={ref}
        className={cl(className, "navds-error-summary__error", "navds-link")}
        {...hrefProp}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default ErrorSummaryError;
