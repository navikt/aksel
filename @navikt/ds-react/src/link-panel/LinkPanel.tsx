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

interface LinkPanelComponentType
  extends OverridableComponent<LinkPanelProps, HTMLAnchorElement> {
  Title: LinkPanelTitleType;
  Content: LinkPanelContentType;
}

/* React.ForwardRefExoticComponent<
  OverridableComponent<LinkPanelProps, HTMLAnchorElement> & React.RefAttributes<HTMLAnchorElement>
> */

const LinkPanelComponent: OverridableComponent<
  LinkPanelProps,
  HTMLAnchorElement
> = forwardRef(
  ({ children, as = "a", border = true, className, ...rest }, ref) => {
    return (
      <Panel
        as={as}
        border={border}
        ref={ref}
        className={cl("navds-link-panel", className)}
        {...rest}
      >
        {children}
        <Next
          className="navds-link-panel__chevron"
          aria-label="arrow-icon pointing right"
        />
      </Panel>
    );
  }
);

const LinkPanel = LinkPanelComponent as LinkPanelComponentType;
interface LinkPanelTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export type LinkPanelTitleType = OverridableComponent<
  LinkPanelTitleProps,
  HTMLSpanElement
>;

export const LinkPanelTitle: LinkPanelTitleType = forwardRef(
  ({ className, as: Component = "span", ...rest }, ref) => (
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
interface LinkPanelContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type LinkPanelContentType = React.ForwardRefExoticComponent<
  LinkPanelContentProps & React.RefAttributes<HTMLDivElement>
>;

export const LinkPanelContent: LinkPanelContentType = forwardRef(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl("navds-link-panel__content", className)}
      {...rest}
    />
  )
);

LinkPanel.Title = LinkPanelTitle;
LinkPanel.Content = LinkPanelContent;

export default LinkPanel;
