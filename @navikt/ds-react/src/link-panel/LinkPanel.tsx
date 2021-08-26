import React, { forwardRef } from "react";
import { Panel, OverridableComponent } from "..";
import { Next } from "@navikt/ds-icons";
import cl from "classnames";
import { LinkPanelTitle, LinkPanelTitleType } from "./LinkPanelTitle";
import { LinkPanelContent, LinkPanelContentType } from "./LinkPanelContent";

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

LinkPanel.Title = LinkPanelTitle;
LinkPanel.Content = LinkPanelContent;

export default LinkPanel;
