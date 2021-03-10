import React, { useEffect, Children, forwardRef } from "react";
import { ForwardRefExoticComponent, HTMLAttributes } from "react";
import { setParams as setDecoratorParams } from "@navikt/nav-dekoratoren-moduler";
import { default as Section, SectionProps } from "./Section";
import { default as Panel, PanelProps } from "./Panel";
import { ContentContainer, Heading } from "../../";
import cl from "classnames";

export interface LayoutWithSubComponents
  extends ForwardRefExoticComponent<LayoutProps> {
  Section: ForwardRefExoticComponent<SectionProps>;
  Panel: ForwardRefExoticComponent<PanelProps>;
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
      setDecoratorParams({
        utilsBackground: "white",
      });
      return () => {
        setDecoratorParams({
          utilsBackground: "transparent",
        });
      };
    }, []);

    return (
      <div ref={ref}>
        <div id={"layout-header"} className={"navds-layout__header"}>
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
Layout.Panel = Panel;
export default Layout;
