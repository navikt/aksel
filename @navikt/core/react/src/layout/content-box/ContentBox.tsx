import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../../util";

export interface ContentBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ContentBox: OverridableComponent<ContentBoxProps, HTMLDivElement> =
  forwardRef(({ as: Component = "div", className, ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-contentbox", className)}
      />
    );
  });

export default ContentBox;
