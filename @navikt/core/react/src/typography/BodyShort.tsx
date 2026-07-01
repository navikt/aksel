import React, { forwardRef } from "react";
import type { AkselColor } from "../types";
import type { OverridableComponent } from "../utils-external";
import { cl } from "../utils/helpers";
import type { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface BodyShortProps
  extends TypoProps, React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * large: 20px, medium: 18px, small: 16px.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Paragraph text.
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
 * @see 🏷️ {@link BodyShortProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 * <BodyShort>
 *   Du må gjøre en filtrering for å se brukere i listen.
 * </BodyShort>
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
      textColor,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(
          className,
          "aksel-body-short",
          `aksel-body-short--${size}`,
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

export default BodyShort;
