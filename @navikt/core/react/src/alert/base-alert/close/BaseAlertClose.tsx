import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { useRenameCSS } from "../../../theme/Theme";
import { useI18n } from "../../../util/i18n/i18n.hooks";
import { useBaseAlert } from "../root/BaseAlertRoot.context";

type BaseAlertCloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @see 🏷️ {@link BaseAlertCloseButtonProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title>Info tittel</BaseAlert.Title>
 *      <BaseAlert.CloseButton aria-label="Lukk varsel">
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertCloseButton = forwardRef<
  HTMLButtonElement,
  BaseAlertCloseButtonProps
>(({ className, ...restProps }: BaseAlertCloseButtonProps, forwardedRef) => {
  const { cn } = useRenameCSS();
  const translate = useI18n("Alert");
  const { statusType } = useBaseAlert();

  return (
    <Button
      ref={forwardedRef}
      {...restProps}
      data-color="neutral"
      variant="tertiary-neutral"
      className={cn(className, "navds-base-alert__close-button")}
      type="button"
      size="small"
      icon={
        <XMarkIcon
          title={
            statusType === "alert"
              ? translate("closeAlert")
              : translate("closeMessage")
          }
        />
      }
    />
  );
});

export { BaseAlertCloseButton };
export type { BaseAlertCloseButtonProps };
