import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";

export interface ProductCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const ProductCard: OverridableComponent<
  ProductCardProps,
  HTMLAnchorElement
> = forwardRef(({ as: Component = "a", className, ...rest }, ref) => (
  <Component
    {...rest}
    ref={ref}
    className={cl("navdsno-product-card", className)}
  />
));

export default ProductCard;
