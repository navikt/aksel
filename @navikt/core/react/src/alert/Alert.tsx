import {
  InformationSquareFillIcon,
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  XMarkOctagonFillIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong } from "../typography/BodyLong";
import { Button } from "../button";

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
  /**
   * Removes close-button(X) when false
   * Requires onClose to be set
   * @default true
   */
  closeButton?: boolean;
  /**
   * Callback for alert wanting to close
   * requires closeButton to be true
   */
  onClose?: () => void;
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
 * A component for displaying alerts
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/alert)
 * @see 🏷️ {@link AlertProps}
 * @example
 * ```jsx
 * <Alert variant="error">Dette er en feilmelding</Alert>
 * ```
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
      closeButton = false,
      onClose,
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
          {
            "navds-alert--full-width": fullWidth,
            "navds-alert--inline": inline,
            "navds-alert--close-button": closeButton,
          }
        )}
      >
        <Icon variant={variant} className="navds-alert__icon" />
        <BodyLong as="div" size={size} className="navds-alert__wrapper">
          {children}
        </BodyLong>
        {closeButton && !inline && (
          <div className="navds-alert__button-wrapper">
            <Button
              className="navds-alert__button"
              size="small"
              variant="tertiary-neutral"
              onClick={onClose}
              icon={<XMarkIcon title="Lukk Alert" />}
            />
          </div>
        )}
      </div>
    );
  }
);

export default Alert;
