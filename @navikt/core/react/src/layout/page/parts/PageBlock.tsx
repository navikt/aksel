import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../../util/OverridableComponent";

export const widths = ["content", "laptop", "laptop-xl", "desktop"] as const;

export interface PageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   *
   */
  width: (typeof widths)[number];
  /**
   *
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
