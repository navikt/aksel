import React, { forwardRef } from "react";
import type { AkselStatusColorRole } from "@navikt/ds-tokens/types";
import { AkselColor } from "../types";
import type { OverridableComponent } from "../utils-external";
import { cl } from "../utils/helpers";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Inverts when the underline appears. If this is false,
   * the underline only appears on hover.
   *
   * **NB: Underline can only be removed in menus etc. where it's obvious that it's a link.**
   * @default true
   */
  underline?: boolean;
  /**
   * Renders link with `display: inline` for better wrapping in text.
   * @default false
   */
  inlineText?: boolean;
  /**
   * @deprecated Deprecated in v8. Use `data-color` prop instead.
   */
  variant?: "action" | "neutral" | "subtle";
  /**
   * Link text
   */
  children: React.ReactNode;
  /**
   * Overrides inherited color.
   *
   * We recommend only using `accent` and `neutral`. We have disallowed status-colors.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: Exclude<AkselColor, AkselStatusColorRole>;
}

/**
 * A component that displays a hyperlink.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/link)
 * @see 🏷️ {@link LinkProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 * <Link href="#">lenke til ny side</Link>
 * <Link as={ReactRouter.Link} to="#">lenke til ny side</Link>
 * ```
 * @example
 * ```jsx
 * <BodyLong>
 * ...
 *  <Link href="#" inlineText>lenke til ny side</Link>
 * ...
 * </BodyLong>
 * ```
 */
export const Link: OverridableComponent<LinkProps, HTMLAnchorElement> =
  forwardRef(
    (
      {
        as: Component = "a",
        className,
        underline = true,
        variant,
        inlineText = false,
        "data-color": color,
        ...rest
      },
      ref,
    ) => {
      return (
        <Component
          data-color={color ?? variantToColor(variant)}
          {...rest}
          ref={ref}
          className={cl("aksel-link", className, {
            "aksel-link--remove-underline": !underline,
            "aksel-link--inline-text": inlineText,
          })}
        />
      );
    },
  );

function variantToColor(
  variant?: LinkProps["variant"],
): AkselColor | undefined {
  switch (variant) {
    case "action":
      return "accent";
    case "neutral":
    case "subtle":
      return "neutral";
    default:
      return undefined;
  }
}

export default Link;
