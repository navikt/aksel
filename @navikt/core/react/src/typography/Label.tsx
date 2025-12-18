import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import type { AkselColor } from "../types";
import { OverridableComponent } from "../util/types";
import { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface LabelProps
  extends Omit<TypoProps, "weight" | "align" | "truncate">,
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
   *
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/darkside/farger-darkside)
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
      const { cn } = useRenameCSS();

      return (
        <Component
          {...rest}
          ref={ref}
          className={cn(
            className,
            "navds-label",
            typoClassNames({
              spacing,
              visuallyHidden,
              textColor,
            }),
            {
              "navds-label--small": size === "small",
            },
          )}
        />
      );
    },
  );

export default Label;
