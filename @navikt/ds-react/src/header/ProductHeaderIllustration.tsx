import React, { forwardRef } from "react";
import cl from "classnames";

export interface ProductHeaderIllustrationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Pictogram placed in header
   */
  children: React.ReactNode;
}

export type ProductHeaderIllustrationType = React.ForwardRefExoticComponent<
  ProductHeaderIllustrationProps & React.RefAttributes<HTMLDivElement>
>;

const ProductHeaderIllustration: ProductHeaderIllustrationType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-product-header__illustration", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default ProductHeaderIllustration;
