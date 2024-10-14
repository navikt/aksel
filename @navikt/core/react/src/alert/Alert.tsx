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
import { useI18n } from "../util/i18n/i18n.context";

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

const IconMap = {
  error: XMarkOctagonFillIcon,
  warning: ExclamationmarkTriangleFillIcon,
  info: InformationSquareFillIcon,
  success: CheckmarkCircleFillIcon,
};

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
    const translate = useI18n("Alert");
    const Icon = IconMap[variant];
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
        <Icon title={translate(variant)} className="navds-alert__icon" />
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
                      ? translate("closeAlert")
                      : translate("closeMessage")
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
