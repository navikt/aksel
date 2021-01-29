import React, { forwardRef } from "react";
import cl from "classnames";
import {
  ErrorSolid,
  WarningSolid,
  InformationSolid,
  SuccessSolid,
} from "@navikt/ds-icons";
import "@navikt/ds-css/alert/index.css";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "error" | "warning" | "info" | "success";
  children: React.ReactNode;
  size?: "medium" | "small";
}

const Icon = ({ variant }) => {
  switch (variant) {
    case "error":
      return <ErrorSolid />;
    case "warning":
      return <WarningSolid />;
    case "info":
      return <InformationSolid />;
    case "success":
      return <SuccessSolid />;
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

export default Alert;
