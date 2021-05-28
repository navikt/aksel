import React, { forwardRef } from "react";
import { OverridableComponent } from "../util";
import { Panel, Heading } from "../index";
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
    console.log(children, typeof children);
    return (
      <Panel
        component={component}
        border={border}
        ref={ref}
        className={cl("navds-link-panel", className)}
        {...rest}
      >
        {typeof children === "string" ? (
          <LinkPanelHeading>{children}</LinkPanelHeading>
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

interface LinkPanelHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xxl" | "xl" | "large" | "medium" | "small";
  children: React.ReactNode;
}

export const LinkPanelHeading = ({
  level = 2,
  size = "medium",
  ...rest
}: LinkPanelHeadingProps) => (
  <Heading
    level={level}
    size={size}
    className="navds-link-panel-heading navds-heading navds-heading--medium"
    {...rest}
  />
);

export default LinkPanel;
