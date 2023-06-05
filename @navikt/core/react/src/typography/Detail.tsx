import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface DetailProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * @deprecated Medium === small
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
  /**
   * All caps
   */
  uppercase?: boolean;
}

/**
 * Part of a set of components for displaying text with consistent typography.
 *
 * @see https://aksel.nav.no/komponenter/core/typography
 * @see {@link DetailProps}
 *
 * @example
 * ```jsx
 *     <Detail level="1" size="xlarge">
 *       Pengestøtte når du er syk
 *     </Detail>
 * ```
 */
export const Detail: OverridableComponent<DetailProps, HTMLParagraphElement> =
  forwardRef(
    (
      {
        className,
        size = "medium",
        spacing,
        uppercase,
        as: Component = "p",
        ...rest
      },
      ref
    ) => (
      <Component
        {...rest}
        ref={ref}
        className={cl(className, "navds-detail", {
          "navds-detail--small": size === "small",
          "navds-typo--spacing": !!spacing,
          "navds-typo--uppercase": !!uppercase,
        })}
      />
    )
  );

export default Detail;
