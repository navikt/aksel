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
   * Decides what design the alert will have
   */
  variant: "error" | "warning" | "info" | "success";
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Reduces padding on component
   * @default "medium"
   */
  size?: "m" | "s";
}

const Icon = ({ variant }) => {
  switch (variant) {
    case "error":
      return (
        <ErrorFilled
          aria-label={`${variant}-ikon`}
          focusable="false"
          role="img"
        />
      );
    case "warning":
      return (
        <WarningFilled
          aria-label={`${variant}-ikon`}
          focusable="false"
          role="img"
        />
      );
    case "info":
      return (
        <InformationFilled
          aria-label={`${variant}-ikon`}
          focusable="false"
          role="img"
        />
      );
    case "success":
      return (
        <SuccessFilled
          aria-label={`${variant}-ikon`}
          focusable="false"
          role="img"
        />
      );
    default:
      return null;
  }
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, children, className, size = "m", ...rest }, ref) => (
    <div
      ref={ref}
      className={cl(
        className,
        "navds-alert",
        `navds-alert--${variant}`,
        `navds-alert--${size}`,
        "navds-body-long",
        { "navds-body--s": size === "s" }
      )}
      {...rest}
    >
      <span>
        <span className="sr-only">{`${variant}-ikon`}</span>
        <Icon variant={variant} />
      </span>
      <div>{children}</div>
    </div>
  )
);

export default Alert;
