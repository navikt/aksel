import cl from "clsx";
import React, { forwardRef } from "react";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { Button } from "../button";
import { BodyLong } from "../typography";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert content.
   */
  children: React.ReactNode;
  /**
   * Level of severity. Changes colors and icon.
   */
  variant: "error" | "warning" | "info" | "success";
  /**
   * Changes padding and font-sizes.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Removes `border-radius`.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Sets max-width on the content to 43.5rem.
   * @default true
   */
  contentMaxWidth?: boolean;
  /**
   * Removes background, border and padding.
   * @default false
   */
  inline?: boolean;
  /**
   * Adds a close-button (X).
   *
   * **Requires onClose to be set**.
   * @default false
   */
  closeButton?: boolean;
  /**
   * Callback for alert wanting to close.
   *
   * **Requires closeButton to be true**.
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
      contentMaxWidth = true,
      inline = false,
      closeButton = false,
      onClose,
      ...rest
    },
    ref,
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
          },
        )}
      >
        <Icon variant={variant} className="navds-alert__icon" />
        <BodyLong
          as="div"
          size={size}
          className={cl(
            "navds-alert__wrapper",
            contentMaxWidth && "navds-alert__wrapper--maxwidth",
          )}
        >
          {children}
        </BodyLong>
        {closeButton && !inline && (
          <div className="navds-alert__button-wrapper">
            <Button
              className="navds-alert__button"
              size="small"
              variant="tertiary-neutral"
              onClick={onClose}
              type="button"
              icon={
                <XMarkIcon
                  title={
                    ["error", "warning"].includes(variant)
                      ? "Lukk varsel"
                      : "Lukk melding"
                  }
                />
              }
            />
          </div>
        )}
      </div>
    );
  },
);

export default Alert;
