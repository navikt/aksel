import React, { forwardRef } from "react";
import { Panel, OverridableComponent } from "..";
import { Next } from "@navikt/ds-icons";
import cl from "classnames";
import { LinkPanelTitle, LinkPanelTitleType } from "./LinkPanelTitle";
import {
  LinkPanelDescription,
  LinkPanelDescriptionType,
} from "./LinkPanelDescription";

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
  Description: LinkPanelDescriptionType;
}

const LinkPanelComponent: OverridableComponent<
  LinkPanelProps,
  HTMLAnchorElement
> = forwardRef(
  ({ children, as = "a", border = true, className, ...rest }, ref) => {
    return (
      <Panel
        {...rest}
        as={as}
        border={border}
        ref={ref}
        className={cl("navds-link-panel", className)}
      >
        <div className="navds-link-panel__content">{children}</div>
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
LinkPanel.Description = LinkPanelDescription;

export default LinkPanel;
