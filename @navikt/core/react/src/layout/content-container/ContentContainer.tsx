import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";

export interface ContentContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ContentContainer content
   */
  children: React.ReactNode;
}

export const ContentContainer = forwardRef<
  HTMLDivElement,
  ContentContainerProps
>(({ className, ...rest }, ref) => (
  <div
    ref={ref}
    className={cl("navds-content-container", className)}
    {...rest}
  />
));

export default ContentContainer;
