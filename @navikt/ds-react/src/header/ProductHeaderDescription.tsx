import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, BodyShortProps } from "../typography";

export interface ProductHeaderDescriptionProps extends BodyShortProps {
  /**
   * Modal.Content content
   */
  children: React.ReactNode;
}

export type ProductHeaderDescriptionType = React.ForwardRefExoticComponent<
  ProductHeaderDescriptionProps & React.RefAttributes<HTMLDivElement>
>;

const ProductHeaderDescription: ProductHeaderDescriptionType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    return (
      <BodyShort
        ref={ref}
        className={cl("navds-product-header__description", className)}
        size="small"
        {...rest}
      >
        {children}
      </BodyShort>
    );
  }
);

export default ProductHeaderDescription;
