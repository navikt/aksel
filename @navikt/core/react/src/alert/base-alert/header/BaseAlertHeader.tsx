import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { BodyShort } from "../../../typography";
import { useI18n } from "../../../util/i18n/i18n.hooks";
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
    const { status, color, statusId } = useBaseAlert();
    const translate = useI18n("global");

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
          <div className={cn("navds-base-alert__icon")}>{headerIcon}</div>
        )}
        {status && (
          <BodyShort id={statusId} aria-hidden visuallyHidden>
            {`${translate(status)}: `}
          </BodyShort>
        )}
        {children}
      </div>
    );
  },
);

export { BaseAlertHeader };
export type { BaseAlertHeaderProps };
