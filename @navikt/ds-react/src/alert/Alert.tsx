import React, { forwardRef } from "react";
import cl from "classnames";
import {
  ErrorFilled,
  WarningFilled,
  InformationFilled,
  SuccessFilled,
} from "@navikt/ds-icons";
import { BodyLong } from "..";

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
  /**
   * Toggles full-width Alert
   * @default false
   */
  fullWidth?: boolean;
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
  (
    {
      variant,
      children,
      className,
      size = "medium",
      fullWidth = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cl(
          className,
          "navds-alert",
          `navds-alert--${variant}`,
          `navds-alert--${size}`,
          { "navds-alert--full-width": fullWidth }
        )}
      >
        <span className="navds-alert__icon">
          <Icon
            aria-label={`${variant}-ikon`}
            focusable="false"
            role="img"
            variant={variant}
            alt={`${variant}-ikon`}
          />
        </span>
        <BodyLong className="navds-alert__content" size={size}>
          {children}
        </BodyLong>
      </div>
    );
  }
);

export default Alert;
