import React from "react";
import { forwardRef, ForwardRefExoticComponent, HTMLAttributes } from "react";
import { Container, Grid } from "../../grid/src";
import cl from "classnames";
import { default as Section, SectionProps } from "./Section";
import "@navikt/ds-css/layout/index.css";

export interface LayoutWithSubComponents
  extends ForwardRefExoticComponent<LayoutProps> {
  Section: ForwardRefExoticComponent<
    SectionProps & HTMLAttributes<HTMLElement>
  >;
}

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...rest }, ref) => (
    <Container
      ref={ref}
      className={cl("navds-layout-container", className)}
      {...rest}
    >
      <Grid>{children}</Grid>
    </Container>
  )
) as LayoutWithSubComponents;

Layout.Section = Section;
export default Layout;
