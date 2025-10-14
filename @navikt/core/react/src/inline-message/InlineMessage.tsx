import React, { forwardRef } from "react";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  InformationSquareFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { useRenameCSS, useThemeInternal } from "../theme/Theme";
import type { AkselColor } from "../types";
import { BodyShort } from "../typography";
import type { OverridableComponent } from "../util";
import { useI18n } from "../util/i18n/i18n.hooks";

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
 * Inline message are used to display important messages with other content.
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
 * * @example As a link
 * ```jsx
 *  <InlineMessage variant="error" as={Link} href="#">
 *    Inline Errormessage
 *  </InlineMessage>
 * ```
 */
const InlineMessage: OverridableComponent<
  InlineMessageProps,
  HTMLAnchorElement
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
        <span className={cn("navds-inline-message__icon")}>
          <VariantIcon variant={variant} />
        </span>
        <span data-color={themeContext?.color}>{children}</span>
      </BodyShort>
    );
  },
);

const VARIANT_ICONS = {
  info: InformationSquareFillIcon,
  success: CheckmarkCircleFillIcon,
  warning: ExclamationmarkTriangleFillIcon,
  error: XMarkOctagonFillIcon,
} as const;

function VariantIcon({ variant }: { variant: InlineMessageProps["variant"] }) {
  const translate = useI18n("Alert");

  if (!variant) {
    return null;
  }

  const Icon = VARIANT_ICONS[variant];

  return <Icon title={translate(variant)} />;
}

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
