import * as React from "react";
import { forwardRef, ForwardRefExoticComponent, HTMLAttributes } from "react";
import cl from "classnames";
import { default as Section, SectionProps } from "./Section";
import "@navikt/ds-css/layout/index.css";

export interface LayoutWithSubComponents
  extends ForwardRefExoticComponent<LayoutProps> {
  Section: ForwardRefExoticComponent<SectionProps>;
}

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl("navds-layout-container", className)}
      {...rest}
    >
      {children}
    </div>
  )
) as LayoutWithSubComponents;

Layout.Section = Section;
export default Layout;
