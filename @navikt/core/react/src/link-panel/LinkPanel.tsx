import React, { forwardRef } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Panel } from "../panel";
import { useRenameCSS } from "../theme/Theme";
import { OverridableComponent } from "../util/types";
import {
  LinkPanelDescription,
  LinkPanelDescriptionProps,
} from "./LinkPanelDescription";
import { LinkPanelTitle, LinkPanelTitleProps } from "./LinkPanelTitle";

export interface LinkPanelProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Panel content
   */
  children?: React.ReactNode;
  /**
   * Adds border to panel if true
   * @default true
   */
  border?: boolean;
}

interface LinkPanelComponentType
  extends OverridableComponent<LinkPanelProps, HTMLAnchorElement> {
  /**
   * @see 🏷️ {@link LinkPanelDescriptionProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Title: OverridableComponent<LinkPanelTitleProps, HTMLDivElement>;
  /**
   * @see 🏷️ {@link LinkPanelDescriptionProps}
   */
  Description: React.ForwardRefExoticComponent<
    LinkPanelDescriptionProps & React.RefAttributes<HTMLDivElement>
  >;
}

/**
 * @deprecated Use `LinkCard` instead. Migrations should be straightforward as the API is similar.
 * @see [📝 LinkCard documentation](https://aksel.nav.no/komponenter/core/linkcard)
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/legacy/linkpanel)
 * @see 🏷️ {@link LinkPanelProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 */
export const LinkPanelComponent: OverridableComponent<
  LinkPanelProps,
  HTMLAnchorElement
> = forwardRef(
  ({ children, as = "a", border = true, className, ...rest }, ref) => {
    const { cn } = useRenameCSS();

    return (
      <Panel
        {...rest}
        as={as}
        border={border}
        ref={ref}
        className={cn("navds-link-panel", className)}
      >
        <div className={cn("navds-link-panel__content")}>{children}</div>
        <ChevronRightIcon
          className={cn("navds-link-panel__chevron")}
          aria-hidden
        />
      </Panel>
    );
  },
);

const LinkPanel = LinkPanelComponent as LinkPanelComponentType;

LinkPanel.Title = LinkPanelTitle;
LinkPanel.Description = LinkPanelDescription;

export default LinkPanel;
