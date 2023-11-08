import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../../util/OverridableComponent";

export const widths = ["lg", "xl", "2xl"] as const;

export interface PageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Predefined max-width
   * @example lg:  1024px
   * @example xl:  1280px
   * @example 2xl: 1440px
   * @default 100%
   */
  width?: (typeof widths)[number];
  /**
   * Adds a standardised responsive padding-inline
   * @example 3rem on desktop
   * @example 1rem on mobile
   * @default false
   */
  gutters?: boolean;
}

export const PageBlock: OverridableComponent<PageBlockProps, HTMLDivElement> =
  forwardRef(
    ({ as: Component = "div", gutters, className, width, ...rest }, ref) => {
      return (
        <Component
          {...rest}
          className={cl(
            "navds-pageblock",
            `navds-pageblock--${width}`,
            className,
            { "navds-pageblock--gutters": gutters }
          )}
          ref={ref}
        />
      );
    }
  );
