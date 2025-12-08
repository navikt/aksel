import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { AkselColor } from "../../../types";
import { useId } from "../../../util";
import { useI18n } from "../../../util/i18n/i18n.hooks";
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
   * Overrides the accent color inherited from the Theme.
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
   * Type of alert
   */
  status?: BaseAlertContextProps["status"];
  /**
   * Changes the HTML element used for the root element.
   *
   * **Testing**: When using `axe-core` for accessibility testing, `section` might warn about unique landmarks if you have multiple Alerts on page with the same status.
   * In those cases, consider using `div` as the root element, or adding unique `aria-label` or `aria-labelledby` props.
   * @see [📝 Landmarks unique](https://dequeuniversity.com/rules/axe/4.6/landmark-unique)
   * @default "section"
   */
  as?: "section" | "div";
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
      status,
      as: Component = "section",
      "aria-label": ariaLabel,
      role,
      ...restProps
    }: BaseAlertProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const statusId = useId();
    const translate = useI18n("global");

    const alertColor = status ? baseAlertStatusToDataColor(status) : dataColor;

    return (
      <BaseAlertProvider
        size={size}
        status={status}
        color={alertColor}
        statusId={statusId}
      >
        <Component
          aria-label={
            ariaLabel ??
            (!status || Component === "div" ? undefined : translate(status))
          }
          ref={forwardedRef}
          {...restProps}
          className={cn(className, "navds-base-alert")}
          data-size={size}
          data-color={alertColor}
          data-variant={type}
          data-global={global}
        >
          <div role={role}>{children}</div>
        </Component>
      </BaseAlertProvider>
    );
  },
);

export { BaseAlert };
export type { BaseAlertProps };
