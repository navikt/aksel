import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import ProductHeaderIllustration, {
  ProductHeaderIllustrationType,
} from "./ProductHeaderIllustration";
import ProductHeaderHeading, {
  ProductHeaderHeadingType,
} from "./ProductHeaderHeading";
import ProductHeaderDescription, {
  ProductHeaderDescriptionType,
} from "./ProductHeaderDescription";
import ProductHeaderWrapper, {
  ProductHeaderWrapperType,
} from "./ProductHeaderWrapper";

export interface ProductHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ProductHeader content
   */
  children: React.ReactNode;
  /**
   * Decides how to align content
   * @default "left"
   */
  variant?: "left" | "center";
  /**
   * Predefined theming for header
   * @default "guide"
   */
  theme?: "situation" | "product" | "guide";
}

interface ProductHeaderComponent
  extends React.ForwardRefExoticComponent<
    ProductHeaderProps & React.RefAttributes<HTMLDivElement>
  > {
  Illustration: ProductHeaderIllustrationType;
  Heading: ProductHeaderHeadingType;
  Description: ProductHeaderDescriptionType;
  Wrapper: ProductHeaderWrapperType;
}

const ProductHeader = forwardRef<HTMLDivElement, ProductHeaderProps>(
  (
    { children, className, theme = "guide", variant = "left", ...rest },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-product-header",
          className,
          `navds-product-header--${theme}`,
          `navds-product-header--${variant}`
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
) as ProductHeaderComponent;

ProductHeader.Illustration = ProductHeaderIllustration;
ProductHeader.Heading = ProductHeaderHeading;
ProductHeader.Description = ProductHeaderDescription;
ProductHeader.Wrapper = ProductHeaderWrapper;

export default ProductHeader;
