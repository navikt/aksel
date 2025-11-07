import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useBaseAlert } from "../root/BaseAlertRoot.context";
import { BaseAlertStatusIcon } from "../root/BaseAlertRoot.utils";

interface BaseAlertHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Icon to display in the header.
   */
  icon?: React.ReactNode;
}

/**
 * @see 🏷️ {@link BaseAlertHeaderProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header icon={<InformationSquareIcon />}>
 *      <BaseAlert.Title>Info title</BaseAlert.Title>
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertHeader = forwardRef<HTMLDivElement, BaseAlertHeaderProps>(
  (
    { children, className, icon, ...restProps }: BaseAlertHeaderProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const { status, color } = useBaseAlert();

    const headerIcon =
      icon ?? (status ? <BaseAlertStatusIcon status={status} /> : null);

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        data-color={color}
        className={cn(className, "navds-base-alert__header")}
      >
        {headerIcon && (
          <div
            className={cn("navds-base-alert__icon")}
            /* TODO: Revisit this after other alerts are merged */
            /* aria-hidden={icon !== undefined} */
          >
            {headerIcon}
          </div>
        )}
        {children}
      </div>
    );
  },
);

export { BaseAlertHeader };
export type { BaseAlertHeaderProps };
