import cl from "clsx";
import React, { forwardRef } from "react";

/* const widthLookup = {
  content: "768px",
  laptop: "1280px",
  "laptop-xl": "1440px",
  desktop: "1920px",
}; */

/**
 * TODO: Legge til støtte for HTMLBodyElement i `as`
 */
export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: "div";
  /**
   * Allows automatic positioning of footer
   */
  footer?: React.ReactNode;
  /**
   * Makes sure to place footer below fold
   */
  footerPosition?: "belowFold";
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  (
    {
      as: Component = "div",
      className,
      style: _style,
      footer,
      children,
      footerPosition,
      ...rest
    },
    ref
  ) => {
    const style: React.CSSProperties = {
      ..._style,
    };

    const belowFold = footerPosition === "belowFold";

    return (
      <Component
        {...rest}
        className={cl("navds-page", "navds-page--fullheight", className)}
        ref={ref}
        style={style}
      >
        <div
          className={cl({
            "navds-page--fullheight": belowFold,
            "navds-page--grow": !belowFold,
          })}
        >
          {children}
        </div>
        {footer}
      </Component>
    );
  }
);
