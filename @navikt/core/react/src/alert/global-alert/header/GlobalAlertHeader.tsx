import React, { forwardRef } from "react";
import { BaseAlert } from "../../base-alert";

type GlobalAlertHeaderProps = Omit<BaseAlert.HeaderProps, "icon">;

/**
 * @see 🏷️ {@link GlobalAlertHeaderProps}
 * @example
 * ```jsx
 *  <GlobalAlert status="success">
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Info tittel</GlobalAlert.Title>
 *    </GlobalAlert.Header>
 *  </GlobalAlert>
 * ```
 */
const GlobalAlertHeader = forwardRef<HTMLDivElement, GlobalAlertHeaderProps>(
  (props, forwardedRef) => {
    return <BaseAlert.Header ref={forwardedRef} {...props} />;
  },
);

export { GlobalAlertHeader };
export type { GlobalAlertHeaderProps };
