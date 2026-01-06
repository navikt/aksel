import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import type { AkselColor } from "../types";
import { OverridableComponent } from "../util/types";
import { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface BodyLongProps
  extends TypoProps,
    React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * large: 20px, medium: 18px, small: 16px.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Text.
   */
  children: React.ReactNode;
  /**
   * Overrides inherited color.
   * @default "neutral"
   *
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
 * @see 🏷️ {@link BodyLongProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 * <BodyLong>
 *   Hvis du ikke bor sammen med begge foreldrene dine,
 *   kan du ha rett til barnebidrag fra en eller begge foreldre mens du
 *   fullfører videregående skole eller tilsvarende.
 * </BodyLong>
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
      textColor,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <Component
        {...rest}
        ref={ref}
        className={cn(
          className,
          "navds-body-long",
          `navds-body-long--${size}`,
          typoClassNames({
            spacing,
            truncate,
            weight,
            align,
            visuallyHidden,
            textColor,
          }),
        )}
      />
    );
  },
);

export default BodyLong;
