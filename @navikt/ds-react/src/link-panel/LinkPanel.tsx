import React, { forwardRef } from "react";
import { OverridableComponent } from "../util";
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
  (
    {
      children,
      component: Component = "a",
      border = true,
      noHeading = false,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cl("navds-link-panel", className, {
          "navds-link-panel--border": border,
        })}
        {...rest}
      >
        <span
          className={cl("navds-link-panel__content", {
            "navds-link-panel__heading": !noHeading,
          })}
        >
          {children}
        </span>
        <Next
          className="navds-link-panel__chevron"
          aria-label="arrow-icon pointing right"
        />
      </Component>
    );
  }
);

export default LinkPanel;
