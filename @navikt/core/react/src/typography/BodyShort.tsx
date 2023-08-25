import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";
import { TypoProps, typoColors } from "./types";
import { typoClassNames } from "./util";

export interface BodyShortProps
  extends TypoProps,
    React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * large: 20px, medium: 18px, small: 16px
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Paragraph text
   */
  children: React.ReactNode;
}

/**
 * Part of a set of components for displaying text with consistent typography.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/typography)
 * @see 🏷️ {@link BodyShortProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 *     <BodyShort level="1" size="xlarge">
 *       Pengestøtte når du er syk
 *     </BodyShort>
 * ```
 */
export const BodyShort: OverridableComponent<
  BodyShortProps,
  HTMLParagraphElement
> = forwardRef(
  (
    {
      className,
      size = "medium",
      as: Component = "p",
      spacing,
      truncate,
      weight = "regular",
      align,
      visuallyHidden,
      color,
      ...rest
    },
    ref
  ) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(
        className,
        "navds-body-short",
        `navds-body-short--${size}`,
        typoClassNames({
          spacing,
          truncate,
          weight,
          align,
          visuallyHidden,
          color,
        })
      )}
      {...(color && !typoColors.includes(color) ? { color } : {})}
    />
  )
);

export default BodyShort;
