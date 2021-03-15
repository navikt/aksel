import PropTypes from "prop-types";
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
  size?: "medium" | "small";
}

const Icon = ({ variant }) => {
  switch (variant) {
    case "error":
      return <ErrorFilled />;
    case "warning":
      return <WarningFilled />;
    case "info":
      return <InformationFilled />;
    case "success":
      return <SuccessFilled />;
    default:
      return null;
  }
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, children, className, size = "medium", ...rest }, ref) => (
    <div
      ref={ref}
      className={cl(
        className,
        "navds-alert",
        `navds-alert--${variant}`,
        `navds-alert--${size}`
      )}
      {...rest}
    >
      <Icon variant={variant} />
      <span>{children}</span>
    </div>
  )
);
Alert.propTypes = {
  /**
   * Decides what design the alert will have
   */
  variant: PropTypes.oneOf<"error" | "warning" | "info" | "success">([
    "error",
    "warning",
    "info",
    "success",
  ]).isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Component content
   */
  children: PropTypes.node.isRequired,
  /**
   * Reduces padding on component
   * @default "medium"
   */
  size: PropTypes.oneOf(["medium", "small"]),
};

export default Alert;
