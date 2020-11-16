import React, { forwardRef } from "react";
import cl from "classnames";
import { Error, Warning, Information, Success } from "@nav-frontend/icons";
import "@nav-frontend/alert-styles";

interface AlertProps {
  variant: "error" | "warning" | "info" | "success";
  children: React.ReactNode;
  className?: string;
}

const Icon = ({ variant }) => {
  switch (variant) {
    case "error":
      return <Error />;
    case "warning":
      return <Warning />;
    case "info":
      return <Information />;
    case "success":
      return <Success />;
    default:
      return null;
  }
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, children, className }, ref) => (
    <div
      ref={ref}
      className={cl(className, "navds-alert", `navds-alert-${variant}`)}
    >
      <Icon variant={variant} />
      <span>{children}</span>
    </div>
  )
);

export default Alert;
