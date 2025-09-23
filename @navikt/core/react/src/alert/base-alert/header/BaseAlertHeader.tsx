import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useBaseAlert } from "../root/BaseAlertRoot.context";
import { BaseAlertVariantIcon } from "../utils/BaseAlertUtils";

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
 *      <BaseAlert.Title>Info tittel</BaseAlert.Title>
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
    const { variant, color } = useBaseAlert();

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        data-color={color}
        className={cn(className, "navds-base-alert__header")}
      >
        {(variant || icon) && (
          <div
            className={cn("navds-base-alert__icon")}
            aria-hidden={icon !== undefined}
          >
            {/* Icon can be manually set to null */}
            {icon !== undefined ? (
              icon
            ) : (
              <BaseAlertVariantIcon variant={variant} />
            )}
          </div>
        )}
        {children}
      </div>
    );
  },
);

export { BaseAlertHeader };
export type { BaseAlertHeaderProps };
