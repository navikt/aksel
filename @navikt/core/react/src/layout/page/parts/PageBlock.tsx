import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../../util/OverridableComponent";

export const widths = ["laptop", "laptop-xl", "desktop", "full"] as const;

export interface PageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Predefined max-width
   * @example laptop: 1280px
   * @example laptop-xl: 1440px
   * @example desktop: 1920px
   * @example full: 100%;
   */
  width: (typeof widths)[number];
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
