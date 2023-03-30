import {
  ErrorFilled,
  InformationFilled,
  SuccessFilled,
  WarningFilled,
} from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong } from "../typography/BodyLong";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert content
   */
  children: React.ReactNode;
  /**
   * Changes colors and icon usage when changed
   */
  variant: "error" | "warning" | "info" | "success";
  /**
   * Changes padding and font-sizes
   * @default medium
   */
  size?: "medium" | "small";
  /**
   * Removes border-radius
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Removes background from Alert
   * @default false
   */
  inline?: boolean;
}

const Icon = ({ variant, ...props }) => {
  switch (variant) {
    case "error":
      return <ErrorFilled title="Feil" {...props} />;
    case "warning":
      return <WarningFilled title="Advarsel" {...props} />;
    case "info":
      return <InformationFilled title="Informasjon" {...props} />;
    case "success":
      return <SuccessFilled title="Suksess" {...props} />;
    default:
      return null;
  }
};

export interface AlertContextProps {
  size: "medium" | "small";
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      className,
      variant,
      size = "medium",
      fullWidth = false,
      inline = false,
      ...rest
    },
    ref
  ) => (
    <div
      {...rest}
      ref={ref}
      className={cl(
        className,
        "navds-alert",
        `navds-alert--${variant}`,
        `navds-alert--${size}`,
        { "navds-alert--full-width": fullWidth, "navds-alert--inline": inline }
      )}
    >
      <Icon variant={variant} className="navds-alert__icon" />
      <BodyLong as="div" size={size} className="navds-alert__wrapper">
        {children}
      </BodyLong>
    </div>
  )
);

export default Alert;
