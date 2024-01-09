import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";

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
