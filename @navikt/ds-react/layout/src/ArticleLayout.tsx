import React, { forwardRef, HTMLAttributes } from "react";
import { Cell, Container, Grid } from "../../grid/src";
import cl from "classnames";
import "@navikt/ds-css/layout/index.css";

export interface ArticleLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  leftContent?: React.Node;
  leftContentProps?: HTMLAttributes<HTMLDivElement>;
  mainContent: React.Node;
  mainContentProps?: HTMLAttributes<HTMLDivElement>;
  rightContent?: React.Node;
  rightContentProps?: HTMLAttributes<HTMLDivElement>;
}

const ArticleLayout = forwardRef<HTMLDivElement, ArticleLayoutProps>(
  (
    {
      children,
      className,
      leftContent,
      leftContentProps,
      mainContent,
      mainContentProps,
      rightContent,
      rightContentProps,
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
          <Cell {...leftContentProps} sm={4} md={8} lg={12} xl={3}>
            {leftContent}
          </Cell>
          <Cell {...mainContentProps} sm={4} md={8} lg={8} xl={6}>
            {mainContent}
          </Cell>
          <Cell {...rightContentProps} sm={4} md={8} lg={4} xl={3}>
            {rightContent}
          </Cell>
        </Grid>
      </Container>
    );
  }
);

export default ArticleLayout;
