import React, { forwardRef } from "react";
import cl from "classnames";
import {
  ErrorFilled,
  WarningFilled,
  InformationFilled,
  SuccessFilled,
} from "@navikt/ds-icons";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert content
   */
  children: React.ReactNode;
  /**
   * Decides what design the alert will have
   */
  variant: "error" | "warning" | "info" | "success";
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
}

const Icon = ({ variant, ...props }) => {
  switch (variant) {
    case "error":
      return <ErrorFilled {...props} />;
    case "warning":
      return <WarningFilled {...props} />;
    case "info":
      return <InformationFilled {...props} />;
    case "success":
      return <SuccessFilled {...props} />;
    default:
      return null;
  }
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, children, className, size = "medium", ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          className,
          "navds-alert",
          `navds-alert--${variant}`,
          `navds-alert--${size}`,
          "navds-body-long",
          { "navds-body--s": size === "small" }
        )}
        {...rest}
      >
        <span>
          <span className="navds-sr-only">{`${variant}-ikon`}</span>
          <Icon
            aria-label={`${variant}-ikon`}
            focusable="false"
            role="img"
            variant={variant}
          />
        </span>
        <div>{children}</div>
      </div>
    );
  }
);

export default Alert;
