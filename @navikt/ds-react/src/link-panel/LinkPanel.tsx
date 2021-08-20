import React, { forwardRef } from "react";
import { OverridableComponent } from "../util";
import { OverriddenComponent } from "../util";
import { Panel } from "../index";
import { Next } from "@navikt/ds-icons";
import cl from "classnames";

export interface LinkPanelProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
  border?: boolean;
  override?: boolean;
}

const Content = ({ children }) => (
  <>
    {typeof children === "string" ? (
      <LinkPanelTitle>{children}</LinkPanelTitle>
    ) : (
      <span className="navds-link-panel__content">{children}</span>
    )}
    <Next
      className="navds-link-panel__chevron"
      aria-label="arrow-icon pointing right"
    />
  </>
);

const LinkPanel = forwardRef<HTMLAnchorElement, LinkPanelProps>(
  ({ children, border = true, className, override = false, ...rest }, ref) => {
    const props = {
      ...rest,
      border,
      ref,
      className: cl("navds-link-panel", className),
    };

    if (override) {
      const child = React.Children.only(children);
      if (React.isValidElement(child)) {
        return React.cloneElement(
          child,
          props,
          <Content>{child.props.children}</Content>
        );
      } else {
        console.error(
          "LinkPanel with override=true received invalid react element as child."
        );
        return null;
      }
    } else {
      return (
        <Panel border={border} override>
          <a {...rest} ref={ref} className={cl("navds-link-panel", className)}>
            <Content>{children}</Content>
          </a>
        </Panel>
      );
    }
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
      className={cl(
        "navds-link-panel-title",
        "navds-title",
        "navds-title--m",
        className
      )}
      {...rest}
    />
  )
);

export default LinkPanel;
