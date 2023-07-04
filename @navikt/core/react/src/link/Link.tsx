import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether the link is suitable for being inlined in text.
   * @default false
   */
  inline?: boolean;
  /**
   * Whether the link should break on all characters. Useful for long links with no "words".
   * @default false
   */
  "break-All"?: boolean;
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
 */
export const Link: OverridableComponent<LinkProps, HTMLAnchorElement> =
  forwardRef(
    (
      {
        as: Component = "a",
        className,
        inline = false,
        "break-all": breakAll = false,
        ...rest
      },
      ref
    ) => (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-link", className, {
          "navds-link--inline": inline,
          "navds-link--break-all": breakAll,
        })}
      />
    )
  );

export default Link;
