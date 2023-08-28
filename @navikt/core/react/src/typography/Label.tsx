import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../util/OverridableComponent";
import { TypoProps } from "./types";
import { setNativeColor, typoClassNames } from "./util";

export interface LabelProps
  extends Omit<TypoProps, "weight">,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * medium: 18px, small: 16px
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Paragraph text
   */
  children: React.ReactNode;
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
 *     <Label >
 *       Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon
 *     </Label>
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
        truncate,
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
          "navds-label",
          typoClassNames({
            spacing,
            truncate,
            align,
            visuallyHidden,
            color,
          }),
          {
            "navds-label--small": size === "small",
          }
        )}
        {...setNativeColor(color)}
      />
    )
  );

export default Label;
