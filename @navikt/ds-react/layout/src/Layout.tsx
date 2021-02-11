import React from "react";
import { forwardRef, ForwardRefExoticComponent, HTMLAttributes } from "react";
import { Container, Grid } from "../../grid/src";
import cl from "classnames";
import { default as Section, SectionProps } from "./Section";
import "@navikt/ds-css/layout/index.css";

interface SubComponents {
  Section: React.ForwardRefExoticComponent<
    SectionProps & HTMLAttributes<HTMLElement>
  >;
}

export interface LayoutProps
  extends ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  className?: string;
}

const Layout: React.FC<SubComponents> = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Container
        ref={ref}
        className={cl("navds-layout-container", className)}
        {...rest}
      >
        <Grid>{children}</Grid>
      </Container>
    );
  }
);

Layout.Section = Section;
export default Layout;
