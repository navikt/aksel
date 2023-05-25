import React, { forwardRef } from "react";
import cl from "clsx";
import { omit } from "../util";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * @default text
   */
  variant?: "circle" | "rectangle" | "rounded" | "text";
  /**
   * When not infering height from children, you must specify height
   */
  height?: number | string;
  /**
   * When not infering width from children, you must specify width
   */
  width?: number | string;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "text", ...rest }, ref) => {
    return (
      <div
        {...omit(rest, ["width", "height"])}
        ref={ref}
        className={cl(
          "navds-skeleton",
          className,
          getStyles({ ...rest, variant })
        )}
        style={{ width: rest?.width, height: rest?.height, ...rest.style }}
      />
    );
  }
);

function getStyles(props: Partial<SkeletonProps>) {
  return cl({
    "navds-skeleton--has-children": Boolean(props.children),
    "navds-skeleton--text": props.variant === "text",
    "navds-skeleton--circle": props.variant === "circle",
    "navds-skeleton--rectangle": props.variant === "rectangle",
    "navds-skeleton--rounded": props.variant === "rounded",
    "navds-skeleton--no-height": !props.height,
    "navds-skeleton--no-width": !props.width,
  });
}

export default Skeleton;
