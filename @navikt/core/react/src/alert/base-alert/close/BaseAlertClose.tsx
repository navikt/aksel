import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { useRenameCSS } from "../../../theme/Theme";
import { useI18n } from "../../../util/i18n/i18n.hooks";

type BaseAlertCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @see 🏷️ {@link BaseAlertCloseProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title>Info tittel</BaseAlert.Title>
 *      <BaseAlert.Close onClick={...} />
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertClose = forwardRef<HTMLButtonElement, BaseAlertCloseProps>(
  ({ className, ...restProps }: BaseAlertCloseProps, forwardedRef) => {
    const { cn } = useRenameCSS();
    const translate = useI18n("Alert");

    return (
      <Button
        ref={forwardedRef}
        type="button"
        {...restProps}
        data-color="neutral"
        variant="tertiary-neutral"
        className={cn(className, "navds-base-alert__close-button")}
        size="small"
        icon={<XMarkIcon title={translate("closeAlert")} />}
      />
    );
  },
);

export { BaseAlertClose };
export type { BaseAlertCloseProps };
