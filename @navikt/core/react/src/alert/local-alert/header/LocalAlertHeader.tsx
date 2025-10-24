import React, { forwardRef } from "react";
import { BaseAlert } from "../../base-alert";

type LocalAlertHeaderProps = Omit<BaseAlert.HeaderProps, "icon">;

/**
 * @see 🏷️ {@link LocalAlertHeaderProps}
 * @example
 * ```jsx
 *  <LocalAlert>
 *    <LocalAlert.Header>
 *      <LocalAlert.Title>Info tittel</LocalAlert.Title>
 *    </LocalAlert.Header>
 *  </LocalAlert>
 * ```
 */
const LocalAlertHeader = forwardRef<HTMLDivElement, LocalAlertHeaderProps>(
  (props, forwardedRef) => {
    return <BaseAlert.Header ref={forwardedRef} {...props} />;
  },
);

export { LocalAlertHeader };
export type { LocalAlertHeaderProps };
