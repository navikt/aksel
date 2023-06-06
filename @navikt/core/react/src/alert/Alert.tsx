import {
  InformationSquareFillIcon,
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
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
      return <XMarkOctagonFillIcon title="Feil" {...props} />;
    case "warning":
      return <ExclamationmarkTriangleFillIcon title="Advarsel" {...props} />;
    case "info":
      return <InformationSquareFillIcon title="Informasjon" {...props} />;
    case "success":
      return <CheckmarkCircleFillIcon title="Suksess" {...props} />;
    default:
      return null;
  }
};

export interface AlertContextProps {
  size: "medium" | "small";
}

/**
 * A component that displays an alert message with an icon and a text.
 * @param {React.ReactNode} children - The content of the alert.
 * @param {string} variant - The type of alert. Can be "error", "warning", "info", or "success".
 * @param {string} size - The size of the alert. Can be "medium" or "small".
 * @param {boolean} fullWidth - Whether the alert should have full width or not.
 * @param {boolean} inline - Whether the alert should be displayed inline or not.
 * @returns {JSX.Element} - The Alert component.
 */
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
