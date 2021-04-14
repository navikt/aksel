import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface ProductPageSectionProps
  extends HTMLAttributes<HTMLDivElement> {
  left?: boolean;
  right?: boolean;
  whiteBackground?: boolean;
  withPadding?: boolean;
  sticky?: boolean;
}

const ProductPageSection = forwardRef<HTMLDivElement, ProductPageSectionProps>(
  (
    {
      left,
      right,
      children,
      whiteBackground = true,
      withPadding = true,
      sticky,
      className,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cl(
        "navds-layout__section",
        left && "navds-layout__section--left",
        right && "navds-layout__section--right",
        !left && !right && "navds-layout__section--main",
        whiteBackground && "navds-layout__section--white",
        withPadding && "navds-layout__section--padding",
        sticky && "navds-layout__section--sticky",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
);

export default ProductPageSection;
