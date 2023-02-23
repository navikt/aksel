import React, { forwardRef } from "react";
import cl from "clsx";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cl("navds-skeleton", className)} />
    );
  }
);

export default Skeleton;
