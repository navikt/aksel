import React, { forwardRef } from "react";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import type { OverridableComponent } from "../../util";
import { InlineMessageIcon } from "../icon/InlineMessageIcon";

interface InlineMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * InlineMessage status.
   */
  status: "info" | "success" | "warning" | "error";
  /**
   * InlineMessage size.
   * @default "medium"
   */
  size?: "medium" | "small";
}

/**
 * InlineMessage is used to highlight short messages next to other content.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/inline-message)
 * @see 🏷️ {@link InlineMessageProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 * @example
 * ```jsx
 *  <InlineMessage status="error">
 *    Inline Errormessage
 *  </InlineMessage>
 * ```
 *
 * @example
 * As a link
 * ```jsx
 *  <InlineMessage status="error" as={Link} href="#">
 *    Inline Errormessage
 *  </InlineMessage>
 * ```
 */
const InlineMessage: OverridableComponent<InlineMessageProps, HTMLDivElement> =
  forwardRef(
    (
      {
        as: Component = "div",
        children,
        className,
        status,
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
          data-color={status === "error" ? "danger" : status}
          {...restProps}
          size={size}
          as={Component}
          data-status={status}
          data-size={size}
        >
          <InlineMessageIcon status={status} />
          <span data-color={themeContext?.color}>{children}</span>
        </BodyShort>
      );
    },
  );

export { InlineMessage };
export type { InlineMessageProps };
