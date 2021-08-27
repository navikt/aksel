import React, { forwardRef } from "react";
import cl from "classnames";

export interface ProductHeaderWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wrapper for ProductPage.Heading + ProductPage.Description
   */
  children: React.ReactNode;
}

export type ProductHeaderWrapperType = React.ForwardRefExoticComponent<
  ProductHeaderWrapperProps & React.RefAttributes<HTMLDivElement>
>;

const ProductHeaderWrapper: ProductHeaderWrapperType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-product-header__wrapper", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default ProductHeaderWrapper;
