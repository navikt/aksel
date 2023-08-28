import cl from "clsx";
import React, { forwardRef } from "react";
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
 *     <Detail>
 *       Du må gjøre en filtrering for å se brukere i listen.
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
        truncate,
        weight = "regular",
        align,
        visuallyHidden,
        textColor,
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
            truncate,
            weight,
            align,
            visuallyHidden,
            textColor,
            uppercase,
          }),
          {
            "navds-detail--small": size === "small",
          }
        )}
      />
    )
  );

export default Detail;
