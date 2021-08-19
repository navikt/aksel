import cl from "classnames";
import React, { Children, forwardRef, HTMLAttributes, useEffect } from "react";
import { ContentContainer, Title } from "@navikt/ds-react";

const cls = (className, columns) =>
  cl(
    "navds-layout__container",
    `navds-layout__container--${columns}-columns`,
    className
  );

export interface ProductPageLayoutProps extends HTMLAttributes<HTMLElement> {
  title: string;
  children?: React.ReactNode;
}

const ProductPageLayout = forwardRef<HTMLDivElement, ProductPageLayoutProps>(
  ({ children, title, className, ...rest }, ref) => {
    const columns = Children.toArray(children).length;

    useEffect(() => {
      const layoutBody = document.getElementById("navds-layout-body");
      layoutBody?.classList.add(`navds-layout__body--${columns}-columns`);
      document.body.classList.add("navds-layout__body--white");
      return () => {
        layoutBody?.classList.remove(`navds-layout__body--${columns}-columns`);
        document.body.classList.remove("navds-layout__body--white");
      };
    }, [columns]);

    return (
      <div ref={ref}>
        <div id={"navds-layout-header"} className={"navds-layout__header"}>
          <ContentContainer>
            <div className={cls(className, columns)} {...rest}>
              <div className={cl("navds-layout__header-content")}>
                <Title
                  size="2xl"
                  className={cl("navds-layout__header-title")}
                  level={1}
                >
                  {title}
                </Title>
              </div>
            </div>
          </ContentContainer>
        </div>
        <div id={"navds-layout-body"} className={"navds-layout__body"}>
          <ContentContainer>
            <div className={cls(className, columns)} {...rest}>
              {children}
            </div>
          </ContentContainer>
        </div>
      </div>
    );
  }
);

export default ProductPageLayout;
