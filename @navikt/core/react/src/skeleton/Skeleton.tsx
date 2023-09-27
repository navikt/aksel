import React, { forwardRef } from "react";
import cl from "clsx";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * @default text
   */
  variant?: "circle" | "rectangle" | "rounded" | "text";
  /**
   * When not inferring height from children, you must specify height
   */
  height?: number | string;
  /**
   * When not inferring width from children, you must specify width
   */
  width?: number | string;
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: "div" | "span";
}

/**
 * Simple skeleton loader
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/skeleton)
 * @see 🏷️ {@link SkeletonProps}
 * @example
 * ```jsx
 * <Skeleton variant="circle" height="5rem" width="5rem" />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      children,
      height,
      width,
      style,
      variant = "text",
      as: As = "div",
      ...rest
    },
    ref
  ) => {
    return (
      <As
        {...rest}
        ref={ref}
        className={cl(
          "navds-skeleton",
          className,
          `navds-skeleton--${variant}`,
          {
            "navds-skeleton--has-children": Boolean(children),
            "navds-skeleton--no-height": !height,
            "navds-skeleton--no-width": !width,
            "navds-skeleton--inline": As === "span",
          }
        )}
        style={{ ...style, width, height }}
        aria-hidden
      >
        {children}
      </As>
    );
  }
);

export default Skeleton;
