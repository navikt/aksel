import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { AkselColor } from "../../../types";
import { baseAlertVariantToDataColor } from "../utils/BaseAlertUtils";
import {
  type BaseAlertContextProps,
  BaseAlertProvider,
} from "./BaseAlertRoot.context";

interface BaseAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Component content.
   */
  children: React.ReactNode;
  /**
   * Changes the size of the BaseAlert.
   * @default "medium"
   */
  size?: BaseAlertContextProps["size"];
  /**
   * Overrides color
   */
  "data-color"?: AkselColor;
  /**
   * Intensity of the alert
   */
  type: "moderate" | "strong";
  /**
   * Centers alert and removed border-radius
   * @default false
   */
  global?: boolean;
  /**
   * Changes the semantics of the alert. Use "alert" for important information that needs user attention, and "message" for less important information.
   */
  statusType: BaseAlertContextProps["statusType"];
  /**
   * Type of alert
   */
  variant?: BaseAlertContextProps["variant"];
}

const BaseAlert = forwardRef<HTMLDivElement, BaseAlertProps>(
  (
    {
      children,
      className,
      size = "medium",
      "data-color": dataColor,
      type,
      global = false,
      statusType,
      variant,
      ...restProps
    }: BaseAlertProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const alertColor = variant
      ? baseAlertVariantToDataColor(variant)
      : dataColor;

    return (
      <BaseAlertProvider
        size={size}
        statusType={statusType}
        variant={variant}
        color={alertColor}
      >
        <div
          ref={forwardedRef}
          {...restProps}
          className={cn(className, "navds-base-alert")}
          data-size={size}
          data-color={alertColor}
          data-type={type}
          data-global={global}
        >
          {children}
        </div>
      </BaseAlertProvider>
    );
  },
);

export { BaseAlert };
export type { BaseAlertProps };
