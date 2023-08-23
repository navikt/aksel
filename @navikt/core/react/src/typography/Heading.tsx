import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";
import { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface HeadingProps
  extends Pick<TypoProps, "spacing" | "visuallyHidden" | "align" | "color">,
    React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level
   * @default "1"
   */
  level?: "1" | "2" | "3" | "4" | "5" | "6";
  /**
   * Changes text-sizing
   */
  size: "xlarge" | "large" | "medium" | "small" | "xsmall";
  /**
   * Heading text
   */
  children: React.ReactNode;
}

/**
 * Part of a set of components for displaying text with consistent typography.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/typography)
 * @see 🏷️ {@link HeadingProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 *     <Heading level="1" size="xlarge">
 *       Pengestøtte når du er syk
 *     </Heading>
 * ```
 */
export const Heading: OverridableComponent<HeadingProps, HTMLHeadingElement> =
  forwardRef(
    (
      {
        level = "1",
        size,
        className,
        as,
        spacing,
        align,
        visuallyHidden,
        color,
        ...rest
      },
      ref
    ) => {
      let HeadingTag = as ?? (`h${level}` as React.ElementType);

      return (
        <HeadingTag
          {...rest}
          ref={ref}
          className={cl(
            className,
            "navds-heading",
            `navds-heading--${size}`,
            typoClassNames({
              spacing,
              align,
              visuallyHidden,
              color,
            })
          )}
        />
      );
    }
  );

export default Heading;
