import React, { forwardRef } from "react";
import { Panel, OverridableComponent } from "..";
import { Next } from "@navikt/ds-icons";
import cl from "classnames";

export interface LinkPanelProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Panel content
   */
  children?: React.ReactNode;
  /**
   * Toggles border on panel
   */
  border?: boolean;
}

export type LinkPanelType = OverridableComponent<
  LinkPanelProps,
  HTMLAnchorElement
>;

const LinkPanel: LinkPanelType = forwardRef(
  ({ children, as = "a", border = true, className, ...rest }, ref) => {
    return (
      <Panel
        as={as}
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

interface LinkPanelTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const LinkPanelTitle: OverridableComponent<
  LinkPanelTitleProps,
  HTMLSpanElement
> = forwardRef(({ className, as: Component = "span", ...rest }, ref) => (
  <Component
    ref={ref}
    className={cl(
      "navds-link-panel-title",
      "navds-heading",
      "navds-heading--m",
      className
    )}
    {...rest}
  />
));

export default LinkPanel;
