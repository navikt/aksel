import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface InternalHeaderTitleProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Application title
   */
  children: React.ReactNode;
}

export type InternalHeaderTitleType = OverridableComponent<
  InternalHeaderTitleProps,
  HTMLAnchorElement
>;

export const InternalHeaderTitle: InternalHeaderTitleType = forwardRef(
  ({ as: Component = "a", children, className, ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      size="xsmall"
      className={cl(
        "navds-internalheader__title",
        "navds-body-short",
        className
      )}
    >
      <span>{children}</span>
    </Component>
  )
);

export default InternalHeaderTitle;
