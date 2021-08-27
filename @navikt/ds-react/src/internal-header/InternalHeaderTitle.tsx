import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { OverridableComponent } from "..";

export interface InternalHeaderTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
}

export type InternalHeaderTitleType = OverridableComponent<
  InternalHeaderTitleProps,
  HTMLHeadingElement
>;

const InternalHeaderTitle: InternalHeaderTitleType = forwardRef(
  ({ as: Component = "h1", children, className, ...rest }, ref) => (
    <Component
      ref={ref}
      className={cl("navds-interal-header__title", "navds-label", className)}
      {...rest}
    >
      {children}
    </Component>
  )
);

export default InternalHeaderTitle;
