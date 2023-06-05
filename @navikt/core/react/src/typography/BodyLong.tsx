import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface BodyLongProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
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
 * @see https://aksel.nav.no/komponenter/core/typography
 * @see {@link BodyLongProps}
 *
 * @example
 * ```jsx
 *     <BodyLong level="1" size="xlarge">
 *       Pengestøtte når du er syk
 *     </BodyLong>
 * ```
 */
export const BodyLong: OverridableComponent<
  BodyLongProps,
  HTMLParagraphElement
> = forwardRef(
  (
    { className, size = "medium", spacing, as: Component = "p", ...rest },
    ref
  ) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(className, "navds-body-long", {
        "navds-body-long--small": size === "small",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default BodyLong;
