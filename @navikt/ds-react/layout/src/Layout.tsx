import React, { forwardRef, HTMLAttributes } from "react";
import { Cell, Container, Grid } from "../../grid/src";
import cl from "classnames";
import "@navikt/ds-css/layout/index.css";

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  columns: 1 | 2 | 3;
  leftContent: React.Node;
  mainContent: React.Node;
  rightContent: React.Node;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      children,
      columns,
      className,
      leftContent,
      mainContent,
      rightContent,
      ...rest
    },
    ref
  ) => {
    return (
      <Container
        ref={ref}
        className={cl("navds-layout-container", className)}
        {...rest}
      >
        <Grid>
          <Cell sm={4} md={8} lg={12} xl={3}>
            {leftContent}
          </Cell>
          <Cell sm={4} md={8} lg={8} xl={6}>
            {mainContent}
          </Cell>
          <Cell sm={4} md={8} lg={4} xl={3}>
            {rightContent}
          </Cell>
        </Grid>
      </Container>
    );
  }
);

export default Layout;
