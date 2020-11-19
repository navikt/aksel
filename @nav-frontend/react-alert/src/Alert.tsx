import React, { forwardRef } from "react";
import cl from "classnames";
import {
  ErrorFilled,
  WarningFilled,
  InformationFilled,
  SuccessFilled,
} from "@nav-frontend/icons";
import "@nav-frontend/alert-styles";

interface AlertProps {
  variant: "error" | "warning" | "info" | "success";
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
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
  ({ variant, children, className, compact = false }, ref) => (
    <div
      ref={ref}
      className={cl(className, "navds-alert", `navds-alert-${variant}`, {
        "navds-compact": compact,
      })}
    >
      <Icon variant={variant} />
      <span>{children}</span>
    </div>
  )
);

export default Alert;
