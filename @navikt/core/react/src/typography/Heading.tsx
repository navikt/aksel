import React, { forwardRef } from "react";
import type { AkselColor } from "../types";
import { cl } from "../util/className";
import { OverridableComponent } from "../util/types";
import { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface HeadingProps
  extends Pick<TypoProps, "spacing" | "visuallyHidden" | "align" | "textColor">,
    React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level.
   * @default "1"
   */
  level?: "1" | "2" | "3" | "4" | "5" | "6";
  /**
   * xlarge: 40px, large: 32px, medium: 24px, small: 20px, xsmall: 18px.
   */
  size: "xlarge" | "large" | "medium" | "small" | "xsmall";
  /**
   * Heading text.
   */
  children: React.ReactNode;
  /**
   * Overrides inherited color.
   * @default "neutral"
   *
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: AkselColor;
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
 * <Heading level="1" size="xlarge">
 *   Hva kan vi hjelpe deg med?
 * </Heading>
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
        textColor,
        ...rest
      },
      ref,
    ) => {
      const HeadingTag = as ?? (`h${level}` as React.ElementType);

      return (
        <HeadingTag
          {...rest}
          ref={ref}
          className={cl(
            className,
            "aksel-heading",
            `aksel-heading--${size}`,
            typoClassNames({
              spacing,
              align,
              visuallyHidden,
              textColor,
            }),
          )}
        />
      );
    },
  );

export default Heading;
