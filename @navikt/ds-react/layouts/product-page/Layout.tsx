import React, { useEffect, Children, forwardRef } from "react";
import { ForwardRefExoticComponent, HTMLAttributes } from "react";
import { ContentContainer, Heading } from "../../";
import { default as Section, SectionProps } from "./Section";
import cl from "classnames";

export interface LayoutWithSubComponents
  extends ForwardRefExoticComponent<LayoutProps> {
  Section: ForwardRefExoticComponent<SectionProps>;
}

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  title: string;
  children?: React.ReactNode;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, title, className, ...rest }, ref) => {
    const columns = Children.count(children);
    const classNames = cl(
      "navds-layout__container",
      `navds-layout__container--${columns}-columns`,
      className
    );

    useEffect(() => {
      const layoutBody = document.getElementById("navds-layout__body");
      document.body.classList.add("navds-layout__body--white");
      layoutBody?.classList.add("navds-layout__body--gray");
      return () => {
        document.body.classList.remove("navds-layout__container--white");
        layoutBody?.classList.remove("navds-layout__body--gray");
      };
    }, []);

    return (
      <div ref={ref}>
        <ContentContainer>
          <div className={classNames} {...rest}>
            <div className={cl("navds-layout__header")}>
              <Heading
                size={"xxl"}
                className={cl("navds-layout__header-title")}
                level={1}
              >
                {title}
              </Heading>
            </div>
          </div>
        </ContentContainer>
        <div id={"navds-layout__body"}>
          <ContentContainer>
            <div className={classNames} {...rest}>
              {children}
            </div>
          </ContentContainer>
        </div>
      </div>
    );
  }
) as LayoutWithSubComponents;

Layout.Section = Section;
export default Layout;
