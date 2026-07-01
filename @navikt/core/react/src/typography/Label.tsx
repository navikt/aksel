import React, { forwardRef } from "react";
import type { AkselColor } from "../types";
import type { OverridableComponent } from "../utils-external";
import { cl } from "../utils/helpers";
import type { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface LabelProps
  extends
    Omit<TypoProps, "weight" | "align" | "truncate">,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * medium: 18px, small: 16px.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Label text.
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
 * @see 🏷️ {@link LabelProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 * <Label>
 *   Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon
 * </Label>
 * ```
 */
export const Label: OverridableComponent<LabelProps, HTMLLabelElement> =
  forwardRef(
    (
      {
        className,
        size = "medium",
        as: Component = "label",
        spacing,
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
            "aksel-label",
            typoClassNames({
              spacing,
              visuallyHidden,
              textColor,
            }),
            {
              "aksel-label--small": size === "small",
            },
          )}
        />
      );
    },
  );

export default Label;
