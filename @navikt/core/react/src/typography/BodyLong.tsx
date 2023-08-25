import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";
import { TypoProps, typoColors } from "./types";
import { typoClassNames } from "./util";

export interface BodyLongProps
  extends TypoProps,
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> {
  /**
   * large: 20px, medium: 18px, small: 16px
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Text
   */
  children: React.ReactNode;
}

/**
 * Part of a set of components for displaying text with consistent typography.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/typography)
 * @see 🏷️ {@link BodyLongProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 *     <BodyLong>
 *       Hvis du ikke bor sammen med begge foreldrene dine,
 *       kan du ha rett til barnebidrag fra en eller begge foreldre mens du
 *       fullfører videregående skole eller tilsvarende.
 *     </BodyLong>
 * ```
 */
export const BodyLong: OverridableComponent<
  BodyLongProps,
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
        "navds-body-long",
        `navds-body-long--${size}`,
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

export default BodyLong;
