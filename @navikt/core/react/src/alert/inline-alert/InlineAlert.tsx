import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { BaseAlert } from "../base-alert";

interface InlineAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: Exclude<BaseAlert.RootProps["variant"], "announcement">;
  size?: "medium" | "small";
}

/**
 * Inline alerts are used to display important messages inline with other content.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/inlinealert)
 * @see 🏷️ {@link InlineAlertProps}
 * @example
 * ```jsx
 *  <InlineAlert variant="error">
 *   Inline Errormessage
 *  </InlineAlert>
 * ```
 */
const InlineAlert = forwardRef<HTMLDivElement, InlineAlertProps>(
  (
    {
      children,
      className,
      variant,
      size = "medium",
      ...restProps
    }: InlineAlertProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <BodyShort
        ref={forwardedRef}
        role={variant === "success" ? "status" : "alert"}
        className={cn("navds-base-alert__inline", className)}
        {...restProps}
        data-color={BaseAlert.variantToDataColor(variant)}
        data-variant={variant}
        data-size={size}
        size={size}
      >
        <span className={cn("navds-base-alert__inline-icon")}>
          <BaseAlert.VariantIcon variant={variant} fill={false} />
        </span>
        <span data-color="">{children}</span>
      </BodyShort>
    );
  },
);

export { InlineAlert };
export type { InlineAlertProps };
