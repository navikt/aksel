import React, { forwardRef } from "react";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import type { AkselColor } from "../../types";
import { BodyShort } from "../../typography";
import type { OverridableComponent } from "../../util";
import { InlineMessageIcon } from "../icon/InlineMessageIcon";

interface InlineMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * InlineMessage variant.
   */
  variant: "info" | "success" | "warning" | "error";
  /**
   * InlineMessage size.
   * @default "medium"
   */
  size?: "medium" | "small";
}

/**
 * InlineMessage is used to display important messages together with other content.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/inline-message)
 * @see 🏷️ {@link InlineMessageProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 * @example
 * ```jsx
 *  <InlineMessage variant="error">
 *    Inline Errormessage
 *  </InlineMessage>
 * ```
 *
 * @example
 * As a link
 * ```jsx
 *  <InlineMessage variant="error" as={Link} href="#">
 *    Inline Errormessage
 *  </InlineMessage>
 * ```
 */
const InlineMessage: OverridableComponent<
  InlineMessageProps,
  HTMLDivElement
> = forwardRef(
  (
    {
      as: Component = "div",
      children,
      className,
      variant,
      size = "medium",
      ...restProps
    }: InlineMessageProps & { as?: React.ElementType },
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const themeContext = useThemeInternal(false);

    return (
      <BodyShort
        ref={forwardedRef}
        className={cn("navds-inline-message", className)}
        data-color={variantToDataColor(variant)}
        {...restProps}
        size={size}
        as={Component}
        data-variant={variant}
        data-size={size}
      >
        <InlineMessageIcon variant={variant} />
        <span data-color={themeContext?.color}>{children}</span>
      </BodyShort>
    );
  },
);

function variantToDataColor(
  variant: InlineMessageProps["variant"],
): AkselColor | undefined {
  if (variant === "error") {
    return "danger";
  }

  return variant;
}

export { InlineMessage };
export type { InlineMessageProps };
