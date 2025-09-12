import React, { forwardRef } from "react";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { BaseAlert } from "../base-alert";

interface InlineAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * InlineAlert variant.
   */
  variant: NonNullable<Exclude<BaseAlert.RootProps["variant"], "announcement">>;
  /**
   * InlineAlert size.
   * @default "medium"
   */
  size?: "medium" | "small";
}

/**
 * Inline alerts are used to display important messages inline with other content.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/inlinealert)
 * @see 🏷️ {@link InlineAlertProps}
 * @example
 * ```jsx
 *  <InlineAlert variant="error">
 *    Inline Errormessage
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
    const themeContext = useThemeInternal(false);

    return (
      <BodyShort
        ref={forwardedRef}
        role={variant === "success" ? "status" : "alert"}
        className={cn("navds-base-alert__inline", className)}
        data-color={BaseAlert.variantToDataColor(variant)}
        {...restProps}
        size={size}
        as="div"
        data-variant={variant}
        data-size={size}
      >
        <span className={cn("navds-base-alert__inline-icon")}>
          <BaseAlert.VariantIcon variant={variant} fill={false} />
        </span>
        <span data-color={themeContext?.color}>{children}</span>
      </BodyShort>
    );
  },
);

export { InlineAlert };
export type { InlineAlertProps };
