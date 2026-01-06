import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import type { AkselColor } from "../types";
import { OverridableComponent } from "../util/types";
import { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface DetailProps
  extends TypoProps,
    React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * @deprecated Medium is now the same as small.
   */
  size?: "medium" | "small";
  /**
   * Text.
   */
  children: React.ReactNode;
  /**
   * ALL CAPS.
   */
  uppercase?: boolean;
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
 * @see 🏷️ {@link DetailProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 * <Detail>
 *   Du må gjøre en filtrering for å se brukere i listen.
 * </Detail>
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
      ref,
    ) => {
      const { cn } = useRenameCSS();

      return (
        <Component
          {...rest}
          ref={ref}
          className={cn(
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
            },
          )}
        />
      );
    },
  );

export default Detail;
