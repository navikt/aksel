import cl from "clsx";
import React, { forwardRef } from "react";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { type OverridableComponent, useId } from "../../util";
import { useI18n } from "../../util/i18n/i18n.hooks";
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
export const InlineMessage: OverridableComponent<
  InlineMessageProps,
  HTMLDivElement
> = forwardRef(
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
    const themeContext = useThemeInternal();

    const translate = useI18n("global");
    const statusId = useId();
    const contentId = useId();

    return (
      <BodyShort
        ref={forwardedRef}
        className={cn("navds-inline-message", className)}
        data-color={status === "error" ? "danger" : status}
        {...restProps}
        size={size}
        as={Component}
        data-size={size}
      >
        <InlineMessageIcon status={status} />
        {status && (
          <BodyShort id={statusId} aria-hidden visuallyHidden>
            {`${translate(status)}: `}
          </BodyShort>
        )}
        <span
          data-color={themeContext?.color}
          id={contentId}
          aria-labelledby={cl(statusId, contentId)}
        >
          {children}
        </span>
      </BodyShort>
    );
  },
);

export default InlineMessage;
export type { InlineMessageProps };
