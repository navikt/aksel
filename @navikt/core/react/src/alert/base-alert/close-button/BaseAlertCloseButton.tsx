import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { useRenameCSS } from "../../../theme/Theme";
import { useI18n } from "../../../util/i18n/i18n.hooks";

type BaseAlertCloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @see 🏷️ {@link BaseAlertCloseButtonProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title>Info title</BaseAlert.Title>
 *      <BaseAlert.Close onClick={...} />
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertCloseButton = forwardRef<
  HTMLButtonElement,
  BaseAlertCloseButtonProps
>(({ className, ...restProps }: BaseAlertCloseButtonProps, forwardedRef) => {
  const { cn } = useRenameCSS();
  const translate = useI18n("global");

  return (
    <Button
      ref={forwardedRef}
      type="button"
      {...restProps}
      data-color="neutral"
      variant="tertiary-neutral"
      className={cn(className, "navds-base-alert__close-button")}
      size="small"
      title={translate("close")}
      icon={<XMarkIcon aria-hidden />}
    />
  );
});

export { BaseAlertCloseButton };
export type { BaseAlertCloseButtonProps };
