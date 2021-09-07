import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface ContentContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ContentContainer content
   */
  children: React.ReactNode;
}

const ContentContainer = forwardRef<HTMLDivElement, ContentContainerProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl("navds-content-container", className)}
      {...rest}
    />
  )
);

export default ContentContainer;
