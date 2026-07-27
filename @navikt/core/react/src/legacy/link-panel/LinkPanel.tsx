import React, { forwardRef } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import type { OverridableComponent } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { Panel } from "../panel";
import {
  LinkPanelDescription,
  type LinkPanelDescriptionProps,
} from "./LinkPanelDescription";
import { LinkPanelTitle, type LinkPanelTitleProps } from "./LinkPanelTitle";

export interface LinkPanelProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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

interface LinkPanelComponentType extends OverridableComponent<
  LinkPanelProps,
  HTMLAnchorElement
> {
  /**
   * @see 🏷️ {@link LinkPanelTitleProps}
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
    return (
      <Panel
        {...rest}
        as={as}
        border={border}
        ref={ref}
        className={cl("aksel-link-panel", className)}
      >
        <div className="aksel-link-panel__content">{children}</div>
        <ChevronRightIcon className="aksel-link-panel__chevron" aria-hidden />
      </Panel>
    );
  },
);

const LinkPanel = LinkPanelComponent as LinkPanelComponentType;

LinkPanel.Title = LinkPanelTitle;
LinkPanel.Description = LinkPanelDescription;

export default LinkPanel;
