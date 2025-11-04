import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { AkselColor } from "../../../types";
import {
  type BaseAlertContextProps,
  BaseAlertProvider,
} from "./BaseAlertRoot.context";
import { baseAlertStatusToDataColor } from "./BaseAlertRoot.utils";

interface BaseAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Component content.
   */
  children: React.ReactNode;
  /**
   * Changes the size.
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
   * Centers content and removes border-radius
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
  status?: BaseAlertContextProps["status"];
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
      status,
      ...restProps
    }: BaseAlertProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const alertColor = status ? baseAlertStatusToDataColor(status) : dataColor;

    return (
      <BaseAlertProvider
        size={size}
        statusType={statusType}
        status={status}
        color={alertColor}
      >
        <div
          ref={forwardedRef}
          {...restProps}
          className={cn(className, "navds-base-alert")}
          data-size={size}
          data-color={alertColor}
          data-variant={type}
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
