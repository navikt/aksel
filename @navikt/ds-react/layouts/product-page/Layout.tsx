import React, { useEffect } from "react";
import cl from "classnames";
import { ForwardRefExoticComponent, HTMLAttributes } from "react";
import { setParams } from "@navikt/nav-dekoratoren-moduler";
import { Children, forwardRef } from "react";
import { ContentContainer, Heading } from "../../";
import { default as Section, SectionProps } from "./Section";

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
      setParams({
        utilsBackground: "white",
      });
      return () => {
        setParams({
          utilsBackground: undefined,
        });
      };
    }, []);

    return (
      <div ref={ref}>
        <div className={"navds-layout__container--white"}>
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
        </div>
        <ContentContainer>
          <div className={classNames} {...rest}>
            {children}
          </div>
        </ContentContainer>
      </div>
    );
  }
) as LayoutWithSubComponents;

Layout.Section = Section;
export default Layout;
