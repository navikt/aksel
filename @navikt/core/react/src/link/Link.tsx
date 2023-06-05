import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text
   */
  children: React.ReactNode;
}

/**
 * A component that displays a hyperlink.
 *
 * @see https://aksel.nav.no/komponenter/core/link
 * @see {@link LinkProps}
 *
 * @example
 * ```jsx
 * <Link href="#">lenke til ny side</Link>
 * ```
 */
export const Link: OverridableComponent<LinkProps, HTMLAnchorElement> =
  forwardRef(({ as: Component = "a", className, ...rest }, ref) => (
    <Component {...rest} ref={ref} className={cl("navds-link", className)} />
  ));

export default Link;
