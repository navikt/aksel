import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";
import { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface DetailProps
  extends TypoProps,
    React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * @deprecated Medium === small
   */
  size?: "medium" | "small";
  /**
   * Paragraph text
   */
  children: React.ReactNode;
  /**
   * All caps
   */
  uppercase?: boolean;
}

/**
 * Part of a set of components for displaying text with consistent typography.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/typography)
 * @see 🏷️ {@link DetailProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
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
        underline,
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
          "navds-detail",
          typoClassNames({
            spacing,
            underline,
            truncate,
            weight,
            align,
            visuallyHidden,
            color,
          }),
          {
            "navds-detail--small": size === "small",
            "navds-typo--uppercase": !!uppercase,
          }
        )}
      />
    )
  );

export default Detail;
