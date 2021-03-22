import React, { useEffect, Children, forwardRef } from "react";
import { ForwardRefExoticComponent, HTMLAttributes } from "react";
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
    const columns = Children.toArray(children).length;
    const classNames = cl(
      "navds-layout__container",
      `navds-layout__container--${columns}-columns`,
      className
    );

    useEffect(() => {
      const layoutBody = document.getElementById("navds-layout-body");
      layoutBody?.classList.add("navds-layout__body--gray");
      document.body.classList.add("navds-layout__body--white");
      return () => {
        layoutBody?.classList.remove("navds-layout__body--gray");
        document.body.classList.remove("navds-layout__container--white");
      };
    }, []);

    return (
      <div ref={ref}>
        <div id={"navds-layout-header"} className={"navds-layout__header"}>
          <ContentContainer>
            <div className={classNames} {...rest}>
              <div className={cl("navds-layout__header-content")}>
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
        <div id={"navds-layout-body"} className={"navds-layout__body"}>
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
Layout.Panel = Panel;
export default Layout;
