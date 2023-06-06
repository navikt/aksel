import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * medium: 18px, small: 16px
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Paragraph text
   */
  children: React.ReactNode;
  /**
   * Adds margin-bottom
   */
  spacing?: boolean;
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
 *     <Label level="1" size="xlarge">
 *       Pengestøtte når du er syk
 *     </Label>
 * ```
 */
export const Label: OverridableComponent<LabelProps, HTMLLabelElement> =
  forwardRef(
    (
      { className, size = "medium", spacing, as: Component = "label", ...rest },
      ref
    ) => (
      <Component
        {...rest}
        ref={ref}
        className={cl(className, "navds-label", {
          "navds-label--small": size === "small",
          "navds-typo--spacing": !!spacing,
        })}
      />
    )
  );

export default Label;
