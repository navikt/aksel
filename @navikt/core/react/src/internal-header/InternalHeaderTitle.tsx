import React, { forwardRef } from "react";
import { cl } from "../util/className";
import { OverridableComponent } from "../util/types";

export interface InternalHeaderTitleProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Application title
   */
  children: React.ReactNode;
}

export const InternalHeaderTitle: OverridableComponent<
  InternalHeaderTitleProps,
  HTMLAnchorElement
> = forwardRef(({ as: Component = "a", children, className, ...rest }, ref) => {
  return (
    <Component
      {...rest}
      ref={ref}
      size="xsmall"
      className={cl(
        "aksel-internalheader__title",
        "aksel-body-short",
        className,
      )}
    >
      <span>{children}</span>
    </Component>
  );
});

export default InternalHeaderTitle;
