import React, { forwardRef } from "react";
import cl from "classnames";
import { Title, TitleProps } from "..";

export interface ProductHeaderHeadingProps extends Omit<TitleProps, "size"> {
  /**
   * ProductHeader heading
   */
  children: React.ReactNode;
  size?: "2xlarge" | "xlarge" | "large" | "medium" | "small";
}

export type ProductHeaderHeadingType = React.ForwardRefExoticComponent<
  ProductHeaderHeadingProps & React.RefAttributes<HTMLDivElement>
>;

const ProductHeaderHeading: ProductHeaderHeadingType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    return (
      <Title
        ref={ref}
        className={cl("navds-product-header__heading", className)}
        level="1"
        size="2xlarge"
        {...rest}
      >
        {children}
      </Title>
    );
  }
);

export default ProductHeaderHeading;
