import React, { forwardRef } from "react";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../button";
import type { AkselColor } from "../../types";
import { BodyLong } from "../../typography";
import { cl } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";

/**
 * @deprecated
 * Use GlobalAlert, LocalAlert, InfoCard, or InlineMessage instead.
 */
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
  /**
   * Overriding Alert color is not supported.
   */
  "data-color"?: never;
}

const IconMap = {
  error: XMarkOctagonFillIcon,
  warning: ExclamationmarkTriangleFillIcon,
  info: InformationSquareFillIcon,
  success: CheckmarkCircleFillIcon,
};

/**
 * @deprecated
 * Use GlobalAlert, LocalAlert, InfoCard, or InlineMessage instead.
 * Component will be removed in future versions when the usage of this component is phased enough out.
 *
 * @see [📝 Global documentation](https://aksel.nav.no/komponenter/core/globalalert)
 * @see [📝 Local documentation](https://aksel.nav.no/komponenter/core/localalert)
 * @see [📝 InfoCard documentation](https://aksel.nav.no/komponenter/core/infocard)
 * @see [📝 InlineMessage documentation](https://aksel.nav.no/komponenter/core/inlinemessage)
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/legacy/alert)
 * @see 🏷️ {@link AlertProps}
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
    const translate = useI18n("global");
    const Icon = IconMap[variant];
    return (
      <div
        {...rest}
        data-color={variantToRoleMap[variant] ?? "info"}
        data-variant={variant}
        ref={ref}
        className={cl(
          className,
          "aksel-alert",
          `aksel-alert--${variant}`,
          `aksel-alert--${size}`,
          {
            "aksel-alert--full-width": fullWidth,
            "aksel-alert--inline": inline,
            "aksel-alert--close-button": closeButton,
          },
        )}
      >
        <Icon title={translate(variant)} className="aksel-alert__icon" />
        <BodyLong
          as="div"
          size={size}
          className={cl(
            "aksel-alert__wrapper",
            contentMaxWidth && "aksel-alert__wrapper--maxwidth",
          )}
        >
          {children}
        </BodyLong>
        {closeButton && !inline && (
          <div className="aksel-alert__button-wrapper">
            <Button
              className="aksel-alert__button"
              size="small"
              variant="tertiary-neutral"
              onClick={onClose}
              type="button"
              icon={<XMarkIcon title={translate("close")} />}
            />
          </div>
        )}
      </div>
    );
  },
);

const variantToRoleMap: Record<AlertProps["variant"], AkselColor> = {
  error: "danger",
  warning: "warning",
  info: "info",
  success: "success",
};
