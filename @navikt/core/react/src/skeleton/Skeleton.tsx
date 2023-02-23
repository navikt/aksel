import React, { forwardRef } from "react";
import cl from "clsx";
import { omit } from "../util";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  variant?: "circle" | "rectangle" | "rounded" | "text";
  height?: number | string;
  width?: number | string;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ className, variant = "text", ...rest }, ref) => {
    return (
      <span
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
