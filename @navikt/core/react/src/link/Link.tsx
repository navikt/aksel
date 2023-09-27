import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Inverts when the underline appears. If this is false,
   * the underline does not appear by default, but does appear when the link is hovered.
   * This makes it more suitable for use when inlined in text.
   * @default true
   */
  underline?: boolean;
  /**
   * Renders link with `display: inline` for better wrapping in text.
   * @default false
   */
  inlineText?: boolean;
  /**
   * Variant of the component to use.
   * @default "action"
   */
  variant?: "action" | "neutral" | "subtle";
  /**
   * Link text
   */
  children: React.ReactNode;
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
        variant = "action",
        inlineText = false,
        ...rest
      },
      ref
    ) => (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-link", className, `navds-link--${variant}`, {
          "navds-link--remove-underline": !underline,
          "navds-link--inline-text": inlineText,
        })}
      />
    )
  );

export default Link;
