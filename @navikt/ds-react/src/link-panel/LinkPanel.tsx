import React, { forwardRef } from "react";
import { OverridableComponent } from "../util";
import { Panel } from "../index";
import { Next } from "@navikt/ds-icons";
import cl from "classnames";

export type LinkPanelType = OverridableComponent<LinkPanelProps>;

export interface LinkPanelProps {
  props: {
    children?: React.ReactNode;
    className?: string;
    noHeading?: boolean;
    border?: boolean;
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
}

const LinkPanel: LinkPanelType = forwardRef(
  ({ children, component = "a", border = true, className, ...rest }, ref) => {
    return (
      <Panel
        component={component}
        border={border}
        ref={ref}
        className={cl("navds-link-panel", className)}
        {...rest}
      >
        {typeof children === "string" ? (
          <LinkPanelTitle>{children}</LinkPanelTitle>
        ) : (
          <span className="navds-link-panel__content">{children}</span>
        )}
        <Next
          className="navds-link-panel__chevron"
          aria-label="arrow-icon pointing right"
        />
      </Panel>
    );
  }
);

interface LinkPanelTitleProps {
  props: {
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLSpanElement>;
  defaultComponent: "span";
}

export const LinkPanelTitle: OverridableComponent<LinkPanelTitleProps> = forwardRef(
  ({ className, component: Component = "span", ...rest }, ref) => (
    <Component
      ref={ref}
      className={cl("navds-link-panel-title", className)}
      {...rest}
    />
  )
);

export default LinkPanel;
